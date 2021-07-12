import React,{useEffect,useState} from 'react';
import './App.css';

import Recipe from './Recipe';

function App() {
  const APP_ID = "5579616b";
  const APP_KEY = "a7ef481b2b2829431f56894459da677e	";

  const [recipes, setRecipes] = useState ([]);
  const [search, setSearch] = useState ('');
  const [query, setQuery] = useState ('');



  useEffect (()=>{
    getRecipe();
  },[query]);

  const getRecipe = async () => {
      const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    
    console.log(search)
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form' >
        <input className='search-bar' type="text" value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipe'>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
