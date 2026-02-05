import User from "../models/User.js";


export const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { departement, task, startDate, endDate, status } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.task && user.task.task) {
      return res.status(400).json({ message: "Task already exists. Use edit." });
    }

    user.task = { departement, task, startDate, endDate, status };
    await user.save();

    const userObj = user.toObject();
    if (userObj.task) {
      userObj.task.startDate = userObj.task.startDate
        ? userObj.task.startDate.toISOString().slice(0, 10)
        : "";
      userObj.task.endDate = userObj.task.endDate
        ? userObj.task.endDate.toISOString().slice(0, 10)
        : "";
    }

    res.status(201).json(userObj);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { departement, task, startDate, endDate } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.task || !user.task.task) {
      return res.status(400).json({ message: "No existing task to edit" });
    }

    user.task = { departement, task, startDate, endDate, status };
    await user.save();

    const userObj = user.toObject();
    if (userObj.task) {
      userObj.task.startDate = userObj.task.startDate
        ? userObj.task.startDate.toISOString().slice(0, 10)
        : "";
      userObj.task.endDate = userObj.task.endDate
        ? userObj.task.endDate.toISOString().slice(0, 10)
        : "";
    }

    res.status(200).json(userObj);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res)=> {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.task = undefined; 
    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.task) {
      return res.status(400).json({ message: "No task found" });
    }

    user.task.status = status;
    await user.save();

    res.status(200).json({
      message: "Status updated",
      status: user.task.status,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
