import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    prenom:{type:String,required:true},
    nom:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String, enum:["admin","user"],required:true},
    password:{type:String},
    image:{type:String},
    createAT:{
        type:Date,
        immutable:true,
        default:()=>Date.now()},

});
const User= mongoose.model("User",UserSchema);
export default User