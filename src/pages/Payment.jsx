import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- FIX 1: Define the API URL using the Vercel ENV variable ---
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// -----------------------------------------------------------------

/*
This component:
- reads the selected table from location.state.table
- asks backend to initialize payment (POST /api/payments/initialize)
- opens Paystack inline using the returned reference & public key
- on success calls backend /api/payments/verify/:reference to verify and send email
*/

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const table = state?.table;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!table) navigate("/tables");
  }, [table, navigate]);

  const loadPaystackScript = () =>
    new Promise((resolve, reject) => {
      const existing = document.getElementById("paystack-js");
      if (existing) return resolve();
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.id = "paystack-js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Paystack script"));
      document.body.appendChild(script);
    });

  const handlePay = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    setLoading(true);
    try {
      // call backend to initialize
      const initRes = await fetch(
        // --- FIX 2: Use the dynamic API_URL constant ---
        `${API_URL}/api/payments/initialize`, // -----------------------------------------------
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: table.priceNGN, // in Naira
            email,
            metadata: { tableId: table.id, tableName: table.name },
          }),
        }
      );
      const initData = await initRes.json();
      if (!initRes.ok)
        throw new Error(initData.message || "Initialization failed");

      const { authorization_url, reference, access_code } = initData; // we'll use reference // open Paystack inline
      const paystackPublicKey = initData.paystackPublicKey; // backend returns this from env

      if (!window.PaystackPop) {
        // load script
        await loadPaystackScript();
      }

      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email,
        amount: table.priceNGN * 100, // paystack expects kobo
        currency: "NGN",
        ref: reference,
        onClose: function () {
          setLoading(false);
          alert("Payment window closed");
        },
        callback: async function (response) {
          // response.reference
          // verify on backend
          try {
            const verifyRes = await fetch(
              // --- FIX 3: Use the dynamic API_URL constant ---
              `${API_URL}/api/payments/verify/${response.reference}` // -----------------------------------------------
            );
            const verifyJson = await verifyRes.json();
            if (verifyRes.ok && verifyJson.success) {
              // success — redirect to success page (or show confirmation)
              navigate("/success");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification error");
          } finally {
            setLoading(false);
          }
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment init failed");
      setLoading(false);
    }
  };

  if (!table) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
           {" "}
      <div className="max-w-lg w-full bg-white rounded-xl p-6 shadow">
                <h2 className="text-2xl font-semibold mb-3">Confirm Payment</h2>
               {" "}
        <p className="text-gray-600 mb-4">
                    Table: <strong>{table.name}</strong> — ₦          {" "}
          {table.priceNGN.toLocaleString()}       {" "}
        </p>
               {" "}
        <form onSubmit={handlePay} className="space-y-4">
                   {" "}
          <label className="block text-sm text-gray-600">
                        Email for confirmation          {" "}
          </label>
                   {" "}
          <input
            className="w-full border p-3 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                   {" "}
          <button
            className="w-full py-3 rounded bg-[#1D3557] text-white font-semibold disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
                       {" "}
            {loading
              ? "Processing..."
              : `Pay ₦${table.priceNGN.toLocaleString()}`}
                     {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
} // <--- Added the missing closing brace here!
