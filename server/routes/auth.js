import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password,role } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  // Create and save new user
  user = new User({ username, email, password,role });
  await user.save(); 

  // Create JWT token (like a digital keycard)
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Send token back to user
  res.json({ token ,email,password,role});
});


router.post("/login", async (req, res) => {
  const { email, password,role } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // Create and send token
  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token ,
    email,
    password,
    role:user.role
  });
});

export default router;

