const mongoose= require("mongoose");

const  reviewSchema = new mongoose.Schema({
  email:{type:String,required:true},
  recipeId:{type:String,required:true},
  review:{type:String,required:true},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reviews", reviewSchema);