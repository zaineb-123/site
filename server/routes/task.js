import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addTask, editTask, deleteTask, updateStatus, getTasks,getMyTasks,getAllTasks } from "../controllers/taskController.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true }); 
router.use(authMiddleware);

router.get("/", getTasks);                    
router.post("/", addTask);              
router.put("/:taskId", editTask); 
router.get("/:taskId", async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.task.find(t => t._id.toString() === taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      _id: task._id.toString(),
      task: task.task,
      startDate: task.startDate ? task.startDate.toISOString().slice(0, 10) : "",
      endDate: task.endDate ? task.endDate.toISOString().slice(0, 10) : "",
      status: task.status
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:taskId", deleteTask);        
router.put("/:taskId/status", updateStatus); 
router.get("/tasks/all", getAllTasks); 
router.get("/all", getAllTasks);



export default router;