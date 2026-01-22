import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define user structure (like a blueprint)
const userSchema = new mongoose.Schema({
  profil:{type:String,required:false},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },  // user or admin
});

// Hash password before saving (auto-runs before save)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);  // Add "salt" for extra security
  this.password = await bcrypt.hash(this.password, salt); // Convert to unreadable hash
}); 

// Method to check if password matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password); // Compare hashed passwords
};

// Create User model from schema
const User = mongoose.model("User", userSchema);
export default User; 