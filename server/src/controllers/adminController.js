import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple fixed admin credentials (you can change these or move to .env)
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
