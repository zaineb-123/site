import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";



const router = express.Router();
const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, 'uploads/');
  },
  filename:(req, file, cb)=> {
    cb(null,Date.now()+"-"+file.originalname);
  },
});

const upload = multer({ storage: storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
      cb(null,true);
    }else{
      cb(new Error("only images allowed"))
    }
  },
 });

router.post("/register",upload.single("profil"), async (req, res) => {
  const { username, email, password,role } = req.body;
  const profil=req.file?req.file.path:null;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  // Create and save new user
  user = new User({ username, email, password,role ,profil});
  await user.save(); 

  // Create JWT token (like a digital keycard)
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  //const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:"7h"});
  //refreshToken.push(refreshToken); 
  //res.cookie('refreshtoken',refreshToken,{httpOnly:true, secure:false,sameSite:strict})
   

  // Send token back to user
  res.json({ token,email,password,role,profil});
});


router.post("/login", async (req, res) => {
  const { email, password,role } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // Create and send token
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  //const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:"7h"});
  //refreshToken.push(refreshToken); 
  //res.cookie('refreshtoken',refreshToken,{httpOnly:true, secure:false,sameSite:strict})

  res.json({ token,
    email,
    password,
    role:user.role
  });
});




export default router;

