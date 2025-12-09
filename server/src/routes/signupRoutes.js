import { Router } from "express";
import { createSignup, getSignups } from "../controllers/signupController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { adminLogin } from "../controllers/adminController.js";

const router = Router();

// Public route
router.post("/signup", createSignup);

// Admin login (matches your frontend)
router.post("/admin/login", adminLogin);

// Protected admin-only data
router.get("/signups", adminAuth, getSignups);

export default router;
