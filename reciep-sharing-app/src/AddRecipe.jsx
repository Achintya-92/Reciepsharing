import { useState } from "react";// ✅ for redirect
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddRecipe() {
  const{userId} = useParams();
    const [imgSrc, setImgSrc] = useState(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructins] = useState("");
  const [preptime, setPreptime] = useState("");
  const [cuisineType, setCuisineType] = useState("");
   const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();
    formData.append("imgSrc", imgSrc);   // file
    formData.append("userId", userId);
    formData.append("author", author);
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("preptime", preptime);
    formData.append("cuisineType", cuisineType);
    formData.append("date", date);

      const response = await fetch("http://localhost:5000/api/recipe/add", {
        method: "POST",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
        body:formData
  });
        const data =await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add blog");
    }
    alert("✅ Recipe added successfully!");
    window.location.href = `/userAccount/${userId}`;
  } catch (err) {
    console.error("Frontend error:", err.message);
    alert("❌ " + err.message);   
  }
};

  return (
    <div className="container mt-4">
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="imgSrc"
          id="imgSrc"
          placeholder="Enter your Recipe Image"
          accept="image/*"
          onChange={(e) => setImgSrc(e.target.files[0])} 
          className="form-control mb-2"
        />
                <input
          type="text"
          name="author"
          id="author"
          placeholder="Enter your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-2"
        />

        <textarea
          name="ingredients"
          id="desc"
          placeholder="Describe your Blog..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="form-control mb-2"
        ></textarea>

        <input
          type="text"
          value={instructions}
          onChange={(e) => setInstructins(e.target.value)}
          placeholder="Add Step by step Instructions.."
          className="form-control mb-2"
        />
                <input
          type="time"
          name="preptime"
          value={preptime}
          onChange={(e) => setPreptime(e.target.value)}
          placeholder="Enter Prepration time Recipe will take"
          className="form-control mb-2"
        />

        <input
          type="text"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          placeholder="Enter cuisineType"
          className="form-control mb-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date of posting"
          className="form-control mb-2"
        />
        <button type = "submit" className="btn btn-primary">
          Add Recipe
        </button>
      </form>
    </div>
  );
}
