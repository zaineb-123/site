import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { getUsers, getMe, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { addUser } from "../controllers/authController.js";
import { getMyTasks } from "../controllers/taskController.js";



const router = express.Router();

// protection
router.use(authMiddleware);

// User CRUD
router.get("/me/tasks", getMyTasks);
router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:id", getUserById);
router.put("/:id", upload.single("profil"), updateUser);
router.delete("/:id", deleteUser);
router.post("/", addUser);



export default router;
