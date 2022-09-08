import { createContext, ReactNode, useEffect, useState } from "react"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc, addDoc, collection, getDocs, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { v4 as uuid } from 'uuid'

import { database, storage, db } from '../services/firebase';

type AuthProviderProps = {
  children: ReactNode
}

type ProductsContextData = {
  handleCreateProduct(credentials: Product): Promise<void>,
  sendOrder(credentials: ProductOrder): Promise<void>
  isLoading: boolean,
  modalVisible: boolean,
  setIsLoading: any,
  setModalVisible: any,
  products: any
  orders: any
}

type Product = {
  name: string,
  price: string,
  image: string
}

type ProductOrder = {
  product: string,
  price: string,
  image: string,
  amount: number,
  barber: string
}

export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: AuthProviderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const productsCollectionRef = collection(db, "products")
  const ordersCollectionRef = collection(db, "orders")

  useEffect(() => {
    const productsData = onSnapshot(productsCollectionRef, (querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        products.push(doc.data())
      })
      setProducts(products)
    })
    const ordersData = onSnapshot(ordersCollectionRef, (querySnapshot) => {
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push(doc.data())
      })
      setOrders(orders)
    });
    return () => {productsData(), ordersData()}
  }, [])

  async function handleCreateProduct({ name, price, image }: Product) {
    const storageRef = ref(storage, name)
    const uploadImage = async (image) => {
      const response = await fetch(image)
      const blob = await response.blob()
      await uploadBytes(storageRef, blob).then(async () => {
        await getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            id: uuid(),
            name,
            price,
            imageURL: url
          });
        })
      })
    }
    uploadImage(image)
    setIsLoading(false)
  }

  async function sendOrder({product, price, image, amount, barber}) {
    
    await addDoc(collection(db, "orders"), {
      product,
      barber,
      price,
      image,
      amount,
      date: new Date()
    })
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, products, orders, handleCreateProduct, sendOrder }}>
      {children}
    </ProductsContext.Provider>
  )
}