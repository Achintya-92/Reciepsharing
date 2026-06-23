import { Link, useParams,useNavigate } from "react-router-dom";

function UserDetails() {
  const{userId}=useParams();
  const navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Brand */}
      <Link className="navbar-brand" to="/">   <h2>Your Account</h2></Link>

      {/* Toggler for mobile */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNavDropdown" 
        aria-controls="navbarNavDropdown" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <button onClick={() =>navigate(`/`)} className="nav-item">Home</button>

            <button onClick={() =>navigate(`/userAccount/${userId}`)} className="nav-item">Your Recipe</button>
        
            <button onClick={() =>navigate(`/addRecipe/${userId}`)}className="nav-item">Add Recipe</button>
      
           <button onClick={() =>navigate(`/editUser/${userId}`)}>Your Account</button>
        </ul>
      </div>
    </nav>
  );
}

export default UserDetails;
