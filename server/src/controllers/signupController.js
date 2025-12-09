import Signup from "../models/Signup.js";

export const createSignup = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const signup = new Signup({ name, phone, email });
    await signup.save();

    res.json({ success: true, signup });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSignups = async (req, res) => {
  try {
    const data = await Signup.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Get signups error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
