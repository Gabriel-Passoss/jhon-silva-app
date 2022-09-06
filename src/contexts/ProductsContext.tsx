import { createContext, ReactNode, useState } from "react"
import { ref as dbRef, child, get, set } from "firebase/database";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid'

import { database } from '../services/firebase';
import { storage } from '../services/firebase'

type AuthProviderProps = {
  children: ReactNode
}

type ProductsContextData = {
  handleCreateProduct(credentials: Product): Promise<void>,
  isLoading: boolean,
  modalVisible: boolean,
  setIsLoading: any,
  setModalVisible: any
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
  const [imageURL, setImageURL] = useState("")

  async function handleCreateProduct({name, price, image}: Product) {
    const storageRef = ref(storage, name)
    await uploadString(storageRef, image).then(() => {
      getDownloadURL(storageRef).then((url) => {
        setImageURL(url)
      })
    })

    await set(dbRef(database, 'products/' + uuid()), {
      name,
      price,
      imageURL
    } )
    setIsLoading(false)
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}