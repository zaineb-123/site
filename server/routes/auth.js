import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";
import axios from 'axios';



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

router.post("/register", async (req, res) => {
  const { username, email, password,role } = req.body;
  const profil=req.file?req.file.path:null;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  // Create and save new user
  user = new User({ username, email, password,role});
  await user.save(); 

  // Create JWT token (like a digital keycard)
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
  res.cookie('refreshToken',refreshToken,{httpOnly:true, secure:false, sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000})
  user.refreshToken = refreshToken;
  await user.save();


  // Send token back to user
  res.json({ token,email:user.email,password,role:user.role,profil});
});

router.post("/add",upload.single("profil"), async (req, res) => {
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
  const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
  res.cookie('refreshToken',refreshToken,{httpOnly:true, secure:false, sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000})
  user.refreshToken = refreshToken;
  await user.save();

  // Send token back to user
  res.json({ token,email,password,role,profil});
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // Create and send token
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7h" });
  const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
  res.cookie('refreshToken',refreshToken,{httpOnly:true, secure:false, sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000})
  user.refreshToken = refreshToken;
  await user.save();

  res.json({ token,
    email:user.email,
    password,
    role:user.role,
    refreshToken
  });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ msg: "No refresh token provided" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user and verify refresh token matches
    const user = await User.findById(decoded.user.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // Generate new access token
    const payload = { user: { id: user.id, role: user.role } };
    const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: newToken,
       user: { id: user.id, role: user.role, email: user.email }
     });
    } catch (error) {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
});

const axiosInstance = axios.create({
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response)=>response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get('/api/auth/refresh', { withCredentials: true });
               const newToken = res.data.token;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    
  
  
    return Promise.reject(error);
}
);







export default router;

