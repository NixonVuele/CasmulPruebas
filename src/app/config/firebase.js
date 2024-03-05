import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyBa92X9vJAbL5vexjet2qOXFSZE9htPsg0",
    authDomain: "casmul.firebaseapp.com",
    projectId: "casmul",
    storageBucket: "casmul.appspot.com",
    messagingSenderId: "875821091540",
    appId: "1:875821091540:web:394d3f2949427912c68941"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);