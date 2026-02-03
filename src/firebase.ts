import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARedbyDdJfdqdTQGqfOv4JMGX0AmIxSfQ",
  authDomain: "ecommerce-web-app-4bf7a.firebaseapp.com",
  projectId: "ecommerce-web-app-4bf7a",
  storageBucket: "ecommerce-web-app-4bf7a.firebasestorage.app",
  messagingSenderId: "263997941905",
  appId: "1:263997941905:web:15f63c942d5f716e8e7730",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
