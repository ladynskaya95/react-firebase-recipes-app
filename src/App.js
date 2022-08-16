import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "./firebase.config"

function App() {
  const [ recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
  });
  const [popupActive, setPopupActive] = useState(false);

  const collectionRef = collection(db, "recipes")

  useEffect(() => {
    onSnapshot(collectionRef, snapshot => {
      console.log(snapshot)
    })
  }, [])

  return (
    <div className="App">
      <h1>My recipes</h1>
    </div>
  );
}

export default App;
