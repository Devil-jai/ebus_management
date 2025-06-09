// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO4yy5AzPcYOXmbuZOuGGezuE-JIcVMP8",
  authDomain: "ebus-management-3f4ab.firebaseapp.com",
  projectId: "ebus-management-3f4ab",
  storageBucket: "ebus-management-3f4ab.firebasestorage.app",
  messagingSenderId: "844071806342",
  appId: "1:844071806342:web:daf597abda21a5607a3807"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)