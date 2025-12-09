import mongoose, { model } from "mongoose";

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, require: true },
  email: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Signup", signupSchema);
