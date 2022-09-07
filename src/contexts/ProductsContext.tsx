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
  isLoading: boolean,
  isLoadingData: boolean,
  modalVisible: boolean,
  setIsLoading: any,
  setModalVisible: any,
  products: any
}

type Product = {
  name: string,
  price: string,
  image: string
}

export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: AuthProviderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)

  const productsCollectionRef = collection(db, "products")

  useEffect(() => {
    setIsLoadingData(true)

    const subscribe = onSnapshot(productsCollectionRef, (querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        products.push(doc.data())
      })
      setProducts(products)
    });

    setIsLoading(false)
    return () => subscribe()
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

  async function getProductsData() {
    
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct, products, isLoadingData }}>
      {children}
    </ProductsContext.Provider>
  )
}