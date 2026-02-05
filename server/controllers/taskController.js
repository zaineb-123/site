import User from "../models/User.js";

export const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { departement, task, startDate, endDate, status } = req.body;

    console.log("Received data:", req.body); 

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

  
    user.task.push({ departement, task, startDate, endDate, status });
    await user.save();


    const newTask = user.task[user.task.length - 1];


    const formattedTask = {
      _id: newTask._id,
      departement: newTask.departement,
      task: newTask.task,
      startDate: newTask.startDate ? newTask.startDate.toISOString().slice(0, 10) : "",
      endDate: newTask.endDate ? newTask.endDate.toISOString().slice(0, 10) : "",
      status: newTask.status
    };

    res.status(201).json({ 
      message: "Task added successfully",
      task: formattedTask 
    });
  } catch (error) {
    console.error("Add task error:", error);
    res.status(400).json({ error: error.message });
  }
};
export const editTask = async (req, res) => {
  try {
    const { id, taskId } = req.params; // taskId from URL
    const { departement, task, startDate, endDate, status } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const taskIndex = user.task.findIndex(t => t._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    user.task[taskIndex] = {
      ...user.task[taskIndex].toObject(),
      departement,
      task,
      startDate,
      endDate,
      status
    };
    await user.save();

    const userObj = user.toObject();
    if (userObj.task && userObj.task.length > 0) {
      userObj.task = userObj.task.map(t => ({
        ...t,
        startDate: t.startDate ? t.startDate.toISOString().slice(0, 10) : "",
        endDate: t.endDate ? t.endDate.toISOString().slice(0, 10) : ""
      }));
    }

    res.status(200).json(userObj);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id, taskId } = req.params; // taskId from URL

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const taskIndex = user.task.findIndex(t => t._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    user.task.splice(taskIndex, 1);
    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id, taskId } = req.params; // taskId from URL
    const { status } = req.body;

    if (![1, 2, 3].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 1, 2, or 3" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const taskIndex = user.task.findIndex(t => t._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    user.task[taskIndex].status = status;
    await user.save();

    res.status(200).json({
      message: "Status updated",
      task: user.task[taskIndex]
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = user.task.map(t => ({
      _id: t._id.toString(), // important !
      departement: t.departement,
      task: t.task,
      startDate: t.startDate ? t.startDate.toISOString().slice(0, 10) : "",
      endDate: t.endDate ? t.endDate.toISOString().slice(0, 10) : "",
      status: t.status
    }));

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};




export const getMyTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = user.task.map(t => ({
      _id: t._id.toString(),
      departement: t.departement,
      task: t.task,
      startDate: t.startDate ? t.startDate.toISOString().slice(0, 10) : "",
      endDate: t.endDate ? t.endDate.toISOString().slice(0, 10) : "",
      status: t.status
    }));

    res.status(200).json({
      userId: user._id.toString(), // ✅ AJOUT IMPORTANT
      tasks
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
