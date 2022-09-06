import { createContext, ReactNode, useEffect, useState } from "react"
import { ref as dbRef, child, get, set, getDatabase } from "firebase/database";
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
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
    getProductsData()
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
    setIsLoadingData(true)

    const data = await getDocs(productsCollectionRef);
    setProducts((data.docs.map((doc) => ({...doc.data()}))))

    setIsLoading(false)
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct, products, isLoadingData }}>
      {children}
    </ProductsContext.Provider>
  )
}