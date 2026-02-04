import Task from "../models/Task.js";
import User from "../models/User.js";

export const addTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const { departement, task, startDate, endDate, status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.task = { departement, task, startDate, endDate, status };
    await user.save();

    const userObj = user.toObject(); // convert mongoose doc to plain object

    // format dates for frontend
    if (userObj.task) {
      userObj.task.startDate = userObj.task.startDate
        ? userObj.task.startDate.toISOString().slice(0, 10)
        : "";
      userObj.task.endDate = userObj.task.endDate
        ? userObj.task.endDate.toISOString().slice(0, 10)
        : "";
    }

    res.status(201).json(userObj); // <-- send formatted object
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



