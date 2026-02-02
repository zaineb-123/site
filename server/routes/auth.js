import express from "express";
import { register,login,refreshToken, addUser } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("refresh",refreshToken);
router.post("/add",upload.single("profil"),addUser)





export default router;