import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addTask, editTask, deleteTask, updateStatus } from "../controllers/taskController.js";

const router = express.Router({ mergeParams: true }); 
router.use(authMiddleware);


router.post("/", addTask);     
router.put("/", editTask);      
router.delete("/", deleteTask); 
router.put("/status", updateStatus);

export default router;
