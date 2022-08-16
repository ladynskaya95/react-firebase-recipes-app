import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsEmVBhgg0l0r8DdsoCSJlwZJiOHwggoQ",
  authDomain: "react-recipe-14df4.firebaseapp.com",
  projectId: "react-recipe-14df4",
  storageBucket: "react-recipe-14df4.appspot.com",
  messagingSenderId: "442997034528",
  appId: "1:442997034528:web:07627f05dfb1123efc7645",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
