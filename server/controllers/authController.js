import jwt from"jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken,generateRefreshToken,verifyRefreshToken } from "../utils/tokenUtils.js";

//register
export const register= async (req, res) => {
  const { username, email, password,role } = req.body;
  const profil=req.file?req.file.path:null;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  // Create and save new user
  user = new User({ username, email, password,role});
  await user.save(); 

  // Create JWT token (like a digital keycard)
  const token=generateAccessToken(user._id,user.role);
  const refreshToken=generateRefreshToken(user._id,user.role)
  res.cookie('refreshToken',refreshToken,{httpOnly:true, secure:false, sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000})
  user.refreshToken = refreshToken;
  await user.save();


  // Send token back to user
  res.json({ token,email:user.email,password,role:user.role,profil});
};

//login
export const login= async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // Create and send token
  const token=generateAccessToken(user._id,user.role);
  const refreshToken=generateRefreshToken(user._id,user.role)
  res.cookie('refreshToken',refreshToken,{httpOnly:true, secure:false, sameSite: 'strict',maxAge: 7 * 24 * 60 * 60 * 1000})
  user.refreshToken = refreshToken;
  await user.save();

  res.json({ token,
    email:user.email,
    password,
    role:user.role,
    refreshToken
  });
};
//refresh
export const refreshToken= async (req, res,next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ msg: "No refresh token provided" });

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return res.status(403).json({ msg: "Invalid refresh token" });

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ msg: "Invalid refresh token" });

    const newToken = generateAccessToken(user._id, user.role);
    res.json({ token: newToken, user: { id: user._id, role: user.role, email: user.email } });
  } catch (error) {
    next(error);
  }
};



//add

export const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const profil = req.file ? req.file.path : null;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  user = new User({ username, email, password, role, profil });
  await user.save();

  const token = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ token, email, password, role, profil });
};
