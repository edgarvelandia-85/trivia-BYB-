import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb4xlxIML5oRK7ifYr4phVgmVD7_CALoA",
  authDomain: "aqui-se-vino-a-pensar.firebaseapp.com",
  projectId: "aqui-se-vino-a-pensar",
  storageBucket: "aqui-se-vino-a-pensar.firebasestorage.app",
  messagingSenderId: "283438956720",
  appId: "1:283438956720:web:991b96379bd69a3399fb75"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
