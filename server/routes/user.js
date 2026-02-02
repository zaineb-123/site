import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import multer from "multer";
import upload from "../middleware/uploadMiddleware.js";
import { getUsers,getMe,getUserById,updateUser,deleteUser } from "../controllers/userController.js";

const router = express.Router();
router.use(authMiddleware);


router.get("/", getUsers);

router.get("/me", getMe);


router.get('/:id',getUserById);

router.put('/:id',upload.single("profil"), updateUser);


router.delete('/:id',deleteUser);


export default router;