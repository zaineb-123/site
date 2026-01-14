import User from "../models/user.model.js"
import connecToDatabase from "../config/db.js"


const userRegister = async()=>{
    
    try {
       await connecToDatabase();
       const newUser= new User({
        prenom: "zaineb",
        nom:"zaineb",
        email:"admin@gmail.com",
        role:"admin",
        password:"admin"
       }) 
        await newUser.save();
        console.log("succes");
    } catch (error) {
        console.log(error)
    }
}
userRegister();
