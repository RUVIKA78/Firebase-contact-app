// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_VWbmE7kStxPSlqbzF8MhdnZj7XOe4GE",
  authDomain: "vite-contact-7db2a.firebaseapp.com",
  projectId: "vite-contact-7db2a",
  storageBucket: "vite-contact-7db2a.appspot.com",
  messagingSenderId: "988864547466",
  appId: "1:988864547466:web:37a5a8a9698b24e6f2fb73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database =getFirestore(app)