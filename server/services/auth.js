import User from'../models/user.model.js'
import bcrypt from'bcrypt'
import jwt from'jsonwebtoken';
const login =async (req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.status(404).json({success:false,error:"user not found"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
             res.status(404).json({success:false,error:"password incorrect"})
        }

        const token=jwt.sign({_id:user._id,role:user.role},
            process.env.JWT_KEY,{expiresIn:"100d"}
        )
        res.status(200).json({sucess:true,token,user:{_id:user._id,name:user.name,role:user.role},});
    } catch (error) {
        console.log(error.message)
    }

}
export{login}