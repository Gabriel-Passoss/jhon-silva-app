import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native'

// Optionally import the services that you want to use
import { getAuth, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCI9NyV9bDYz2LIWeLFtso1JM-PSw6K3Yg",
  authDomain: "jhon-silva-ca6e5.firebaseapp.com",
  projectId: "jhon-silva-ca6e5",
  storageBucket: "jhon-silva-ca6e5.appspot.com",
  messagingSenderId: "308205015661",
  appId: "1:308205015661:web:c427cf9b7a1e204fbe2564",
  measurementId: "G-L9WZ78XYJX"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
const database = getDatabase(app)
const storage = getStorage(app);

export { auth, database, storage }