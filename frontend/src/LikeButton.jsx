import { useState } from "react";
import Recipe from "./Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function LikeButton({likes,recipeId}) {
  // React state to track whether the button is liked
   const [isLiked, setIsLiked] = useState(false);
      const [likedCount, setLikedCount] = useState(likes);

     async function Like() {
         setIsLiked(!isLiked);

        if(isLiked){
            try{
              const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe/like/${recipeId}`, {
            method:  "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({like: likes + 1})
          });
           
          const data = await response.json();
          if (!response.ok) {
            throw new Error("Failed to like recipe");
          }
        }
            catch(err){
              console.error("Frontend error:", err.message);
            }

// likes = likes + 1 mat karo.
// Props immutable hote hain].
         setisLiked(true);
         setLikedCount(prev => prev + 1);
        }
      }
      
let styles ={
div:{border:"2px solid blue",
    width:"400px",
  borderRadius:"30px"},
p2:{ 
  cursor: "pointer", 
 fontSize: "24px",
  marginLeft:"350px",
   marginTop:"-55px",
  position:"relative"
 },
 p1:{ 
  cursor: "pointer", 
 fontSize: "24px",
  marginLeft:"-230px",
  position:"relative"
 }
}
  return (
       <p onClick={Like} style={styles.p2}>
    <pre>  {likedCount}  {isLiked ? "❤️" : "🤍"}  </pre>  
      </p>
  );
}
