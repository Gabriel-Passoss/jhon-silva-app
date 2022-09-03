import { createContext, useState, ReactNode, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
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

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: any
}

type AuthProviderProps = {
  children: ReactNode
}

function writeUserData({ email, uid, name, service }: User) {
  set(ref(database, 'users/' + uid), {
    username: name,
    email: email,
    service: service
  })
}

export function signOut() {
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState()
  const isAuthenticated = !!user

  async function signIn({ name, email, password, service }: SignInCredentials) {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const { user } = userCredential
      const { email, uid } = user

      writeUserData({email, uid, name, service})
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}