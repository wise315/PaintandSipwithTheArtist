import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import signupRoutes from "./routes/signupRoutes.js";
import paymentsRoutes from "./routes/payments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());

// Routes
app.use("/api", signupRoutes);
app.use("/api", paymentsRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
