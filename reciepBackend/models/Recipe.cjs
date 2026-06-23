const mongoose= require("mongoose");
const recipeSchema = new mongoose.Schema({
  imgSrc:{type:String,trim:true},
  userId:{type:String,required:true},
  author:{type:String,required:true, trim:true},
  title:{type:String,required:true, trim:true},
   ingredients:{type:String,required:true},
   instructions:{type:String,required:true},
  preptime:{type:String,required:true},
  cuisineType:{type:String, enum:["Indian","Italian","Chinese","Mexican","Other"],default:"Other"},
  date: { type: String, default: Date.now },
  likes:{type:Number,default:0},
});

module.exports = mongoose.model("Recipe", recipeSchema);
