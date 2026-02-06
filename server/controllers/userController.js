import User from "../models/User.js";


//getUsers
export const getUsers= async (req, res) => {
 
    const users = await User.find().select("-password");
    res.json(users);
  
};

// get user
export const getMe =  async (req, res) => {
  
 try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password -refreshToken");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

//update
export const updateUser = async (req, res) => {
  try {
    const { username, email, role, departement } = req.body;

    const updateData = { username, email, role, departement };

    if (req.file) {
      updateData.profil = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Update failed", error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, deletedUser });
};






