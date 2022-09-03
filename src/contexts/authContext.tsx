import { createContext, useState, ReactNode, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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
  signIn(credentials: SignInCredentials): Promise<void>,
  login(credentials: LoginCredentials): Promise<void>,
  signOutUser(): any
  isAuthenticated: boolean
  user: {}
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

export function signOutUser() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({})
  const isAuthenticated = !!user

  async function signIn({ name, email, password, service }: SignInCredentials) {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const { user } = userCredential
      setUser(user)
      const { email, uid } = user

      writeUserData({email, uid, name, service})
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }

  async function login({ email, password }: LoginCredentials) {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const { user } = userCredential
      setUser(user)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, login, signOutUser, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}