import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyBmjlAyuIxRQk-wi5u6ey2Zu-9y3c9Rjek",
  authDomain: "ruta-app-a6117.firebaseapp.com",
  projectId: "ruta-app-a6117",
  storageBucket: "ruta-app-a6117.appspot.com",
  messagingSenderId: "515376685392",
  appId: "1:515376685392:web:f5f6021b2d9578696a0c55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);