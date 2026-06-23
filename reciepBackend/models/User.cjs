const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
username : {type:String, required: true,trim:true},
email:{type:String, required:true, unique:true, unique:true, lowercase:true},
password:{type:String, required:true}
},{timestamps: true});

// Jab bhi:  await user.save() ya await User.create()
// Part 1: Pre Save Middleware: "save" event se pehle run hota hai.
userSchema.pre("save", async function (next) {

    // Check karta hai password change hua hai ya nahi(agar nhi toh false aur:- return next():-seedha save kar dega:- Password dobara hash nahi hoga.).
    if(!this.isModified("password")) return next();

    //Salt kya hota hai? :- Hashing se pehle random string generate hoti hai.
    const salt = await bcrypt.genSalt(10);

    // Bcrypt internally: psw + Salt -> ko use karke hash banata hai, 10 = salt rounds :- bcrypt.genSalt(10)  :- MVP ke liye standard hai;
    this.password = await bcrypt.hash(this.password,salt);


    next(); //-> Mongoose ko bolta hai:
// Mera kaam khatam
// Ab save operation continue karo
});

userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);


// User enters:
// 123456

// ↓
// pre("save")

// ↓
// Generate Salt

// ↓
// Hash Password

// ↓
// Replace Password

// ↓
// Save User