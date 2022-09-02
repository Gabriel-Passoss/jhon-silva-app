import { createContext, useState, ReactNode, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../services/firebase';

// type User = {
//   name: string,
//   email: string,
//   roles: string[]
// }

type SignInCredentials = {
  name: string,
  email: string,
  password: string,
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: any
}

type AuthProviderProps = {
  children: ReactNode
}

export function signOut() {
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential)
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}