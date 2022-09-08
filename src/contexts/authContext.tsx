import { createContext, useState, ReactNode, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, signOut, browserLocalPersistence, inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getDocs, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { ref, child, get, set } from "firebase/database";
import { database } from '../services/firebase';

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
  isLoading: boolean,
  setIsLoading: any,
  error: string,
  user: {
    email: string,
    service: string,
    username: string,
    photo?: string
  }
}

type AuthProviderProps = {
  children: ReactNode
}

const dbRef = ref(database)
const auth = getAuth()

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await get(child(dbRef, `users/${user.uid}`)).then(async (snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val())
            
          } else {
            console.log("Sem dados disponíveis")
          }
        })
      }
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
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      get(child(dbRef, `users/${user.user.uid}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val())
        } else {
          console.log("Sem dados disponíveis")
        }
      })
      setIsLoading(true)
    }).catch((error) => {
      if (error.code === "auth/wrong-password") {
        setError("Senha incorreta, tente novamente")
      } else if (error.code === "auth/too-many-requests") {
        setError("Muitas tentativas, aguarde 15 segundos")
      } else if (error.code === "auth/missing-email") {
        setError("Email não inserido")
      } else if (error.code === "auth/internal-error") {
        setError("Email/senha não encontrado")
      } else if (error.code === "auth/user-not-found") {
        setError("Usuário não encontrado")
      } else {
        setError("Erro desconhecido")
      }
      setIsLoading(false)
      console.log(error.code)
    })
  }

  //Deslogar da conta
  async function handleSignOutUser() {
    await signOut(auth).then(() => {
      setError(null)
      setIsLoading(false)
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ handleSignIn, handleLogIn, handleSignOutUser, user, isAuthenticated, isLoading, setIsLoading, error }}>
      {children}
    </AuthContext.Provider>
  )

}