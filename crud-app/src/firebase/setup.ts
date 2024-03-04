import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvnxJGnrBxgPVALJDfl9riJJFR6hyX-tU",
  authDomain: "crud-8c8f8.firebaseapp.com",
  projectId: "crud-8c8f8",
  storageBucket: "crud-8c8f8.appspot.com",
  messagingSenderId: "550238585445",
  appId: "1:550238585445:web:0c6f7a1d8f72a5ed6efc8c",
  measurementId: "G-6MX135T6BY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
