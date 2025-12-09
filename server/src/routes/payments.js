import { Router } from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/paymentsController.js";

const router = Router();

router.post("/payments/initialize", initializePayment);
router.get("/payments/verify/:reference", verifyPayment);

export default router;
