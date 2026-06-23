import { useState } from "react";
import Review from "./Review.jsx";
import LikeButton from "./LikeButton.jsx";

export default function Recipe({recipes}) {
    return(
      <div className="container py-4">
      <div className="row">
        {recipes.map((r) => (
          <div key={r._id} className="col-lg-4 col-md-6 col"> 
            {/* col-12 on xs (phone) => full width; col-md-6 on md+ => half width */}
            <div className="card h-100 shadow-sm">
              {/* image */}
              <div style={{ overflow: "hidden", height: 220 }}>
                 <h5 className="card-title mb-1"><b>Title: </b>{r.title}</h5>
                <img
                 src={r.imgSrc
  ? `${import.meta.env.VITE_API_URL}${r.imgSrc}`
  : "/placeholder.png"}
                className="card-img-top img-fluid"
                  alt={r.title}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>                    
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1"><b>Posted by: </b>{r.author}</h5>
                <p className="card-text" style={{ flexGrow: 1 }}><b>Ingredients: </b>
                  {r.ingredients?.slice(0, 80)}{r.ingredients?.length > 80 ? "..." : ""}
                </p>                
                <p className="card-text" style={{ flexGrow: 1 }}><b>Instructions: </b>
                  {r.instructions?.slice(0, 80)}{r.instructions?.length > 80 ? "..." : ""}
                </p>
                 <p className="card-text" style={{ flexGrow: 1 }}><b>Time for Prepration: </b>
                 {r.preptime}
                 <b>Time for Prepration: </b>
                 {r.preptime}
                </p>
                <p className="card-text text-muted small mb-2"><b> • Cuisine Type: </b>
                   {r.cuisineType}
                </p>
              <br/>
                  <LikeButton likes={r.likes} recipeId={r._id} />
              <br/>
                <div className="container mt-3">
                <Review recipeId={r._id}/> 
                </div>           
              </div>
            </div>
          </div>
        ))}
      </div>
          <br />
    <br />
    </div>
    )
}