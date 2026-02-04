import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import multer from "multer";
import upload from "../middleware/uploadMiddleware.js";
import { getUsers,getMe,getUserById,updateUser,deleteUser } from "../controllers/userController.js";
import { addUser } from "../controllers/authController.js";
import { addTask } from "../controllers/taskController.js";
const router = express.Router();
router.use(authMiddleware);


router.get("/", getUsers);

router.get("/me", getMe);


router.get('/:id',getUserById);

router.put('/:id',upload.single("profil"), updateUser);


router.delete('/:id',deleteUser);

router.post('/:id/task',addTask)



router.put('/:id', addUser);




export default router;