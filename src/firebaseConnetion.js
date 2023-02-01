import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Alterar suas infos
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }



//https://firebase.google.com/docs/firestore/manage-data/structure-data