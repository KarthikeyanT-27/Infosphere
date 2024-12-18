const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, }, 
    name:{type:String,required:true},
    district: { type: String },
    mobilenumber:{type:String,required:true},
    empid:{type:String},
    designation:{type:String,required:true},
});

const User = mongoose.model("User", userSchema);

module.exports=User;