import { createContext, useState, ReactNode, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from '../services/firebase';

type User = {
  name: string,
  email: string | null,
  service: string,
  uid: string | null,
}

type SignInCredentials = {
  name: string,
  email: string,
  password: string,
  service: string,
}

type LoginCredentials = {
  email: string,
  password: string,
}

type AuthContextData = {
  handleSignIn(credentials: SignInCredentials): Promise<void>,
  handleLogIn(credentials: LoginCredentials): Promise<void>,
  handleSignOutUser(): any,
  isAuthenticated: boolean,
  user: {},
  error: string,
}

type AuthProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [ error, setError ] = useState("")
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
  }, [])

  //Cadastrar dados no banco de dados
  async function writeUserData({ email, uid, name, service }: User) {
    await set(ref(database, 'users/' + uid), {
      username: name,
      email: email,
      service: service
    })
  }

  //Criar conta
  async function handleSignIn({ name, email, password, service }: SignInCredentials) {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const { user } = userCredential
      setUser(user)
      const { email, uid } = user

      writeUserData({ email, uid, name, service })
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }

  //Logar na conta
  async function handleLogIn({ email, password }: LoginCredentials) {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("Entrou aqui")
    }).catch((error) => {
      setError(error.code)
      const errorCode = error.code
      console.log(errorCode)
    })
  }

  //Deslogar da conta
  async function handleSignOutUser() {
    await signOut(auth).then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ handleSignIn, handleLogIn, handleSignOutUser, isAuthenticated, user, error }}>
      {children}
    </AuthContext.Provider>
  )
}