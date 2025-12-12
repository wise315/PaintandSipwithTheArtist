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

// --- SUGGESTED CODE START: Enhanced CORS Configuration ---
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5000", // Add other common dev ports
];

app.use(
  cors({
    // Allow requests from the specific origin (or fallback to allowing all if FRONTEND_ORIGIN isn't set)
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // For production robustness (e.g., if a preview branch is used), you might simplify this to:
        // callback(null, true);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
    credentials: true, // IMPORTANT: Allows cookies, headers, and authorization
    optionsSuccessStatus: 204,
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
