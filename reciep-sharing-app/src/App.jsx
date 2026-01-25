import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from './Home';
import UserDetails from "./UserDetails"
import UserAccount from './UserAccount.jsx';
import UpdateRecipe from './UpdateRecipe';
import Review from './Review.jsx';
import "./App.css"
import AddRecipe from './AddRecipe';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/userDetails/:userId' element={<UserDetails/>}/>
        <Route path='/addRecipe/:userId' element={<AddRecipe/>}/>
        <Route path='/userAccount/:userId' element={<UserAccount/>}/>
        <Route path='/update/:recipeId/:userId'  element={<UpdateRecipe/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
