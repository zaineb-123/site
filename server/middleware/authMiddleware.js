import jwt from "jsonwebtoken";

  // Get token from header (Authorization: Bearer <token>)
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
 // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Add user info to request object
    req.user = decoded.user;
// Move to next function/route
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;