const mongoose= require("mongoose");

const  reviewSchema = new mongoose.Schema({
  email:{type:String,required:true},
  recipeId:{type:String,required:true},
  review:{type:String,required:true},
  date: { type: Date, default: Date.now },
  likes:{type:Number,default:0},
  dislikes:{type:Number,default:0},
});

module.exports = mongoose.model("Reviews", reviewSchema);