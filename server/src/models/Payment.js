import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reference: { type: String, unique: true },
  amount: Number, // in Naira
  email: String,
  status: String,
  metadata: mongoose.Schema.Types.Mixed,
  paid_at: Date,
  gateway_response: String,
  authorization: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
