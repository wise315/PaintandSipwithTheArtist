import axios from "axios";
import Signup from "../models/Signup.js"; // optional: if you want to link payments to signup docs
import Payment from "../models/Payment.js"; // create Payment model (below)
import nodemailer from "nodemailer";

console.log({
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
});
// Initialize a transaction
export const initializePayment = async (req, res) => {
  try {
    const { amount, email, metadata = {} } = req.body;
    if (!amount || !email)
      return res.status(400).json({ message: "Missing amount or email" });

    // paystack expects amount in kobo (multiply by 100)
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100,
        email,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save initial payment record (optional)
    const initData = response.data.data;
    const payment = await Payment.create({
      reference: initData.reference,
      amount,
      email,
      status: "initialized",
      metadata,
    });

    // return init data + public key so frontend can open inline
    return res.json({
      success: true,
      ...response.data.data,
      paystackPublicKey: PAYSTACK_PUBLIC,
    });
  } catch (err) {
    console.error("initializePayment error", err.response?.data || err.message);
    return res.status(500).json({ message: "Initialization failed" });
  }
};

// Verify transaction
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    const data = response.data.data;

    if (data.status !== "success") {
      // update payment record
      await Payment.findOneAndUpdate(
        { reference },
        { status: data.status, gateway_response: data.gateway_response }
      );
      return res
        .status(400)
        .json({ success: false, message: "Payment not successful", data });
    }

    // Payment success — update or create payment record
    const payment = await Payment.findOneAndUpdate(
      { reference },
      {
        status: "success",
        paid_at: data.paid_at,
        gateway_response: data.gateway_response,
        authorization: data.authorization,
      },
      { upsert: true, new: true }
    );

    // Send email confirmation
    // configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = `
      <h2>Payment Confirmation — Art Meets Culture</h2>
      <p>Thank you — we received a payment for <strong>₦${payment.amount.toLocaleString()}</strong></p>
      <p>Reference: ${reference}</p>
      <p>Table: ${payment.metadata?.tableName || "N/A"}</p>
      <p>Email: ${payment.email}</p>
      <p>Date: ${new Date(payment.paid_at || Date.now()).toLocaleString()}</p>
    `;

    await transporter.sendMail({
      from: `"Art Meets Culture" <${process.env.MAIL_USER}>`,
      to: payment.email,
      subject: "Payment Confirmation — Art Meets Culture",
      html,
    });

    // also notify admin
    await transporter.sendMail({
      from: `"Art Meets Culture" <${process.env.MAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Payment — ${payment.email}`,
      html,
    });

    return res.json({ success: true, data });
  } catch (err) {
    console.error("verifyPayment error", err.response?.data || err.message);
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
};
