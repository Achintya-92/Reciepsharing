import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Review({recipeId}) {
const[reviews,setReviews]=useState([]);
useEffect(()=>{
  fetch(`http://localhost:5000/api/recipe/retrieve/review/${recipeId}`).then(res=>res.json()).then(data=>setReviews(data)).catch(err=>console.error(err));
},[recipeId]);

 
 return (
    <div className="my-3">
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
        <div
          className="dropdown-menu p-3"
          aria-labelledby={`reviewDropdown-${recipeId}`}
          style={{ minWidth: "300px" }}
        >

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
