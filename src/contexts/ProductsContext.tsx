import { createContext, ReactNode, useState } from "react"
import { v4 as uuid } from 'uuid'
import { ref, child, get, set } from "firebase/database";
import { database } from '../services/firebase';

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
  picture: string
}


export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: AuthProviderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateProduct({name, price, picture}: Product) {
    await set(ref(database, 'products/' + uuid()), {
      name,
      price,
      picture
    } )
    setIsLoading(false)
  }

  return (
    <ProductsContext.Provider value={{ isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}