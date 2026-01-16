import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// authMiddleware verifies token before allowing access
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");  // Get all users, exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
  // req.user.id comes from authMiddleware after verifying token
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;