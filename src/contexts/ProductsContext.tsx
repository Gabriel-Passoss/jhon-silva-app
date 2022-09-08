import { createContext, ReactNode, useEffect, useState } from "react"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp,  } from "firebase/firestore";
import { v4 as uuid } from 'uuid'

import { storage, firestore } from '../services/firebase';

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
  barber: string,
}

export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: AuthProviderProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<ProductOrder[]>([])

  const productsCollectionRef = collection(firestore, "products")
  
  const ordersCollectionRef = collection(firestore, "orders")
  const ordersQuery = query(ordersCollectionRef, orderBy("date", "desc"))

  useEffect(() => {
    const productsData = onSnapshot(productsCollectionRef, (querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        products.push(doc.data())
      })
      setProducts(products)
    })
    const ordersData = onSnapshot(ordersQuery, (querySnapshot) => {
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
          addDoc(collection(firestore, "products"), {
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
    await addDoc(collection(firestore, "orders"), {
      product,
      barber,
      price,
      image,
      amount,
      date: serverTimestamp()
    })
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, products, orders, handleCreateProduct, sendOrder }}>
      {children}
    </ProductsContext.Provider>
  )
}