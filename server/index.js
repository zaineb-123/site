import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from"./routes/auth.js";
import userRoutes from"./routes/user.js";
import bodyParser from 'body-parser';


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Create Express application
const app = express();

// Middleware (functions that run on every request)
app.use(express.json());  // Parses JSON data from requests
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] , credentials:true}));  // Allows frontend to connect

// Routes (URL endpoints)
app.use("/api/auth", authRoutes);    // All auth routes start with /api/auth
app.use("/api/users", userRoutes);   // All user routes start with /api/users

app.use("/uploads",express.static("uploads"));

// Start server on port 5000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

