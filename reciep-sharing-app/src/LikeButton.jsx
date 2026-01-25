import { useState } from "react";

export default function LikeButton() {
  // React state to track whether the button is liked
  const [isLiked, setIsLiked] = useState(false);

  // Toggle function
  function changeColor() {
    setIsLiked(!isLiked);
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
    <div>
       <p onClick={changeColor} style={styles.p2}>
        {isLiked ? (<i className="fa-solid fa-heart"></i>) : (<i className="fa-regular fa-heart"></i>)}
      </p>
    </div>
  );
}
