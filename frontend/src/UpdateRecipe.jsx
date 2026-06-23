import { useState,useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom";
export default function UpdateRecipe(){
     const {recipeId,userId}= useParams();
    const [formData, setFormData] = useState({
    title: "",
    imgSrc:null,
    ingredients: "",
    instructions: "",
    preptime: "",
    cuisineType: "",
    existingImg:null
  });

const navigate=useNavigate();

useEffect(()=>{
    const fetchRecipe = async () => {
    try 
    { const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/retrieve/${recipeId}`)
      const data = await res.json();
     setFormData({
          title: data.title,
          imgSrc: null,
          ingredients: data.ingredients,
          instructions: data.instructions,
          preptime: data.preptime,
          cuisineType: data.cuisineType,
        });
}
catch(err){
  console.error(err);
}
}
fetchRecipe();
},
[recipeId]);

 const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imgSrc") {
      setFormData((prev) => ({ ...prev, imgSrc: files[0] })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value })); 
    }
  };

const handleSubmit= async(e)=>{
  e.preventDefault();
  try{
     const updateData = new FormData();
      updateData.append("title", formData.title);
      updateData.append("ingredients", formData.ingredients);
      updateData.append("instructions", formData.instructions);
      updateData.append("preptime", formData.preptime);
      updateData.append("cuisineType", formData.cuisineType);

      if (formData.imgSrc) {
        updateData.append("imgSrc", formData.imgSrc); 
      }
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/update/${recipeId}`,{
      method:"put",
      body:updateData
    });
    const newdata= await res.json();
    console.log(newdata);
    navigate(`/userAccount/${userId}`)
  }catch(err){
    console.error("Update error!");
  }
};
      
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
                <input
          type="file"
          name="imgSrc"
          id="imgSrc"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
            onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="ingredients"
          id="desc"
           value={formData.ingredients}
            onChange={handleChange}
          className="form-control mb-2"
        ></textarea>

        <input
          name="instructions"
          type="text"
          value={formData.instructions}
            onChange={handleChange}
        
          className="form-control mb-2"
        />
         <input
          type="time"
          name="preptime"
          value={formData.preptime}
           onChange={handleChange}
         
          className="form-control mb-2"
        />

        <input
          type="text"
          name="cuisineType"
          value={formData.cuisineType}
           onChange={handleChange}

          className="form-control mb-2"
        />
        
        <button type="submit" className="btn btn-primary">
          update Recipe
        </button>
      </form>
      </div>
  )
}