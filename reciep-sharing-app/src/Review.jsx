import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Review({recipeId}) {
  console.log(recipeId);
const[reviews,setReviews]=useState([]);
const[review,setReview]=useState("");
const[email,setEmail]=useState("");

useEffect(()=>{
  fetch(`http://localhost:5000/api/recipe/retrieve/review/${recipeId}`).then(res=>res.json()).then(data=>setReviews(data)).catch(err=>console.error(err));
},[recipeId]);

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
   const newReview = {
      email: email, 
      recipeId: recipeId,     
      review: review  
    };

      const response=await fetch(`http://localhost:5000/api/recipe/review/${recipeId}`,{
  method:"POST",
  headers: { "Content-Type": "application/json" },
  body:JSON.stringify(newReview),
   });

    const data=await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to add blog");
    }
    alert("✅ Review added successfully!");
      setReview("");
      setEmail("");
      setReviews((prev) => [...prev, { review, email }]);
  } catch (err) {
    console.error("Frontend error:", err.message);
    alert("❌ " + err.message);   
  }
 }
  return (
    <div className="my-3">
      {/* 🔽 Simple Bootstrap Dropdown toggle */}
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id={`reviewDropdown-${recipeId}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          💬 Reviews
        </button>

        {/* Dropdown menu containing review form + list */}
        <div
          className="dropdown-menu p-3"
          aria-labelledby={`reviewDropdown-${recipeId}`}
          style={{ minWidth: "300px" }}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="form-control mb-2"
              name="review"
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
            <button className="btn btn-primary w-100" type="submit">
              Submit Review
            </button>
          </form>
          <hr />

          <h6 className="fw-bold">Recent Reviews:</h6>
          {reviews.length > 0 ? (
            <ul className="list-group">
              {reviews.map((r) => (
                <li key={r._id} className="list-group-item">
                  <strong>{r.email}</strong>: {r.review}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
