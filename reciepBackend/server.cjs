const express =require("express");
const mongoose =require("mongoose");
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const multer= require("multer");
const app = express();
const path = require("path");
const auth= require("./auth.cjs");
const Recipe = require("./models/Recipe.cjs");
const User = require("./models/User.cjs");
const Reviews = require('./models/Reviews.cjs');
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

main().then((res)=>{console.log("connected succesfully!");}).catch(err =>console.log("some error occuring to make connection with db!"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/RecioeSharing");
}

app.post("/signup", async (req, res) => {
   console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password );
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ error: "User not found!" });

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const userId=existingUser._id;
    res.json({ token,userId});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".png");
  }
});

const upload = multer({storage:storage});

app.post("/api/recipe/add",auth,upload.single("imgSrc"),async(req,res)=>{
   try{
     const newRecipe = new Recipe({
      imgSrc: req.file ? `/uploads/${req.file.filename}` : "", 
      userId: req.body.userId,
      author: req.body.author,
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      preptime: req.body.preptime,
      cuisineType: req.body.cuisineType,
      date: req.body.date
    });
    const savedrecipe=await newRecipe.save();
    res.status(201).json(savedrecipe);
   }
   catch(error){
    console.log(error);

    res.status(400).json({err:error.message});
   }
});

app.get("/api/recipe/home/retrieve", async(req, res) => { 
       try{
    const recipes= await Recipe.find();
    // console.log(recipes);
    res.json(recipes);
   }
   catch(err){
    res.status(400).json({error:err.message});
   }
 });
app.get("/api/recipe/retrieve/:recipeId", async(req, res) => {  
   try{
    const recipe= await Recipe.findById(req.params.recipeId);
    res.json(recipe);
   }
   catch(err){
    res.status(400).json({error:err.message});
   }
});

app.get("/api/recipe/author/:userId", async(req, res) => {
   try{
    const recipes= await Recipe.find({userId:req.params.userId});
    console.log(recipes);
    res.json(recipes);
   }
   catch(err){
    res.status(400).json({error:err.message});
   }
});

app.put('/api/recipe/like/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    recipe.likes += 1;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/recipe/update/:recipeId', upload.single('imgSrc'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      preptime: req.body.preptime,
      cuisineType: req.body.cuisineType
    };
    if (req.file) {
       updateData.imgSrc = `/uploads/${req.file.filename}`;
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, updateData, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/api/recipe/update/:recipeId', upload.single('imgSrc'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      preptime: req.body.preptime,
      cuisineType: req.body.cuisineType
    };
    if (req.file) {
       updateData.imgSrc = `/uploads/${req.file.filename}`;
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, updateData, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/recipe/delete/:recipeId",async(req,res)=>{
       try{
        
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!deletedRecipe){
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully!" });
       }
       catch(err){
        res.status(400).json({error:err.message});
       }
});

  app.post("/api/recipe/review/:recipeId",async(req,res)=>{
    const {email,recipeId,review}=req.body;
    try{
      const newReviews= new Reviews({email:email,recipeId:recipeId,review:review});
      const savedreviews=await newReviews.save();
      res.status(201).json(savedreviews);
      }catch(err){
        res.status(400).json({error:err.message})
    }
  })

app.get("/api/recipe/retrieve/review/:recipeId",async(req,res)=>{
  try{
  const reviews=await Reviews.find({recipeId:req.params.recipeId});
  res.json(reviews);
  }catch(err){
    res.sendStatus(400).json({error:err.message});
  }
})

const port = process.env.PORT||5000;
app.listen(port,()=>{
  console.log("server running at http://localhost:5000");
})

