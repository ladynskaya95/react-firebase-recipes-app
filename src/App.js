import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";

import { db } from "./firebase.config"

import "./App.css"

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
      setRecipes(snapshot.docs.map(doc=> {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleView = id => {
    const recipesClone = [...recipes]

    recipesClone.forEach(recipe => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing
      } 
    })
    setRecipes(recipesClone)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.ingredients || !form.steps) {
      alert("please, fill out all fields");
      return 
    }
    addDoc(collectionRef, form)
    setForm({ title: "", description: "", ingredients: [], steps: [] });
    setPopupActive(false)
  }

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];
    ingredientsClone[i] = e.target.value;
    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
  }

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];
      stepsClone[i] = e.target.value;
      setForm({
        ...form,
        steps: stepsClone,
    });
  };

  const handleIngredientCount = () => {
      setForm({
        ...form,
        ingredients: [...form.ingredients, ""]
      });
  }

 const handleStepCount = () => {
   setForm({
     ...form,
     steps: [...form.steps, ""],
   });
 };

 const removeRecipe = id => {
  deleteDoc(doc(db, "recipes", id))
 }

  return (
    <div className="App">
      <h1>My recipes</h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>
      <div className="recipes">
        {recipes.map((recipe, i) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
            {recipe.viewing && (
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>

                <h4>Steps</h4>
                <ol>
                  {recipe.steps.map((step, i) => (
                    <li key={i}> {step}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="buttons">
              <button onClick={() => handleView(recipe.id)}>
                View {recipe.viewing ? "less" : "more"}
              </button>
              <button className="remove"
              onClick={() => removeRecipe(recipe.id)}
              >Remove recipe</button>
            </div>
          </div>
        ))}
      </div>

      {popupActive && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add a new recipe</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                ></input>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {form.ingredients.map((ingredient, i) => (
                  <input
                    type="text"
                    key={i}
                    value={ingredient}
                    onChange={(e) => handleIngredient(e, i)}
                  />
                ))}
                <button type="button" onClick={handleIngredientCount}>
                  Add ingredient
                </button>
              </div>

              <div className="form-group">
                <label>Steps</label>
                {form.steps.map((step, i) => (
                  <textarea
                    type="text"
                    key={i}
                    value={step}
                    onChange={(e) => handleStep(e, i)}
                  />
                ))}
                <button type="button" onClick={handleStepCount}>
                  Add step
                </button>
              </div>

              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button"
                onClick={() => setPopupActive(false)}
                >Close</button>
              </div>
            </form>
            {/* {JSON.stringify(form)} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
