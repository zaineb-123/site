import mongoose from "mongoose";

const connectDB = async () => {
  try {
// Connect using URI from .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);  // Stop server if DB connection fails
  }
};

export default connectDB;