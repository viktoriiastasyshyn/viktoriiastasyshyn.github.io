import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTocQuw3F04uQjZpJHwnRu1i6vNmg-jyg",
  authDomain: "lab4-ab00e.firebaseapp.com",
  projectId: "lab4-ab00e",
  storageBucket: "lab4-ab00e.firebasestorage.app",
  messagingSenderId: "104118119025",
  appId: "1:104118119025:web:fd6fc320a355bd641e49d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 