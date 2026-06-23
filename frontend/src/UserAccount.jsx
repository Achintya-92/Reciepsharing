import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import UserSideReview from "./UserSideReview"
import { useNavigate , useParams} from "react-router-dom";
import LikeButton from "./LikeButton";
export default function UserAccount(){
  const{userId} = useParams();
  const[recipes,setRecipes]=useState([]);
  const navigete=useNavigate();
  
useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/author/${userId}`).then(res=>res.json()).then(data=>setRecipes(data)).catch(err=>console.error(err));
  },[userId]);

  function handleDelete(recipeId){
    try {
       fetch(`${import.meta.env.VITE_API_URL}/api/recipe/delete/${recipeId}`, {
        method: "DELETE",
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
<div className="bg-light">
  <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <UserDetails />
  </div>
      <h2>Recipe You Uploaded</h2>
    <div className="container py-4">
      <div className="row">
        { recipes.map(recipe=>(
          <div key={recipe._id} className="col-lg-4 col-md-6 col-sm-12"> 
            {/* col-12 on xs (phone) => full width; col-md-6 on md+ => half width */}
            <div className="card h-100 shadow-sm">
              <h3><b>Recipe Author: </b>{recipe.author}</h3>
               <hr />
              <div style={{ overflow: "hidden", height: 220 }}>
              <img
              src={`${import.meta.env.VITE_API_URL}${recipe.imgSrc}`} 
              alt={recipe.title} 
              className="card-img-top img-fluid"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
              <div className="card-body d-flex flex-column">
              <h5><b>Title: </b>{recipe.title}</h5>
              <p><b>Ingredients Required: </b>{recipe.ingredients}</p>
              <p><b>Instructions:</b> {recipe.instructions}</p>
              <h6><b>Time Required:</b> {recipe.preptime}</h6>
              <h5><b>Cusine Type:</b> {recipe.cuisineType}</h5>

              <h6>Date: {recipe.date ? new Date(recipe.date).toLocaleDateString() : "N/A"}</h6>
              <br/>
              <LikeButton likes={recipe.likes} recipeId={recipe._id} />
              <br/>
              <UserSideReview recipeId={recipe._id} />
              <button style={{ backgroundColor: "red"}} onClick={()=> handleDelete(recipe._id)}>Delete</button>
               &nbsp;  &nbsp;  &nbsp;
               <button style={ {backgroundColor: "lightblue"}} onClick={()=>navigete(`/update/${recipe._id}/${userId}`)}>Update</button> 
              </div>
           </div>
        </div>
           ))};
       </div>
          <br />
    <br />
  </div>
</div>
  );
}
