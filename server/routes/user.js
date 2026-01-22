import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import multer from "multer";


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

// authMiddleware verifies token before allowing access
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");  // Get all users, exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
  // req.user.id comes from authMiddleware after verifying token
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.get('/:id',authMiddleware,async(req,res)=>{
  try{
    const{id}=req.params
    const user= await User.findById({_id:id})
    res.json(user);
  }catch(err){
    res.status(500).json({msg:"serveur error",error:err.message})
  }
});

router.put('/:id',authMiddleware,upload.single ("profil"),async(req,res)=>{
  try {
    const{id}=req.params;
    const{username,email,role}=req.body;
    const updateData={username,email,role};
    if(req.file){
      updateData.profil=req.file.path;
    }
    const updateUser=await User.findByIdAndUpdate(id,updateData,{new:true

    });
    return res.status(200).json({success:true,updateUser})
    
  } catch (error) {
    res.status(500).json({msg:"serveur error",error:error.message})
  }

});


router.delete('/:id',authMiddleware,async(req,res)=>{
  try {
    const{id}=req.params;
    const deleteUser=await User.findByIdAndDelete({_id:id})
    return res.status(200).json({success:true,deleteUser})
    
  } catch (error) {
    console.error(error)
    res.status(500).json({msg:"serveur error",error:error.message})
  }

});

export default router;