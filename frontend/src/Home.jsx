import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Sidebar from './Sidebar.jsx';
import Recipe from "./Recipe.jsx";

export default function Home(){
  const [recipes,setRecipes]=useState([]);
  
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/home/retrieve`)
    .then(res=>res.json())
    .then(data=>setRecipes(data))
    .catch(err=>console.error(err));
    console.log(recipes);
  },[]);
return(
        <div className="bg-light">
        <div style={{ position:"fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <Sidebar />
      </div>
      <br />
      <br />
<h1>Let's make Food</h1>
<h4>Learn different Recipe of Foods and Also Share Your Recipe.</h4>
      <Recipe recipes={recipes} />
    </div>
  );
}   