import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  if (!state?.table) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">No table selected.</p>
          <button
            onClick={() => navigate("/tables")}
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const table = state.table;

  const handleCopy = () => {
    navigator.clipboard.writeText("6001489520");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Payment Instructions
        </h1>

        {/* SELECTED TABLE */}
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-semibold">{table.name}</h2>
          <p className="text-lg mt-1">
            Amount:{" "}
            <span className="font-bold">
              ₦{table.priceNGN.toLocaleString()}
            </span>
          </p>
        </div>

        {/* BANK INFO */}
        <div className="p-5 bg-[#1D3557] text-white rounded-xl space-y-3 shadow-md">
          <h3 className="text-lg font-semibold">Transfer Payment To:</h3>

          <div className="text-base">
            <p>
              <strong>Account Number:</strong> 6001489520
            </p>
            <p>
              <strong>Account Name:</strong> Emmanuel Moses Ode
            </p>
            <p>
              <strong>Bank:</strong> Moniepoint
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="mt-3 w-full flex justify-center items-center gap-2 bg-[#F1FAEE] text-black py-2 rounded-lg font-semibold"
          >
            {copied ? (
              <>
                <CheckCircle size={18} /> Copied!
              </>
            ) : (
              <>
                <Copy size={18} /> Copy Account Number
              </>
            )}
          </button>
        </div>

        {/* WHATSAPP GROUP */}
        <div className="text-center space-y-4">
          <p className="text-gray-700">
            After making payment, click the button below to join the WhatsApp
            group and submit your payment receipt for confirmation.
          </p>

          <a
            href="https://chat.whatsapp.com/INIVwgdqo7oENtydq84ZCF?mode=hqrt1"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition"
          >
            Join WhatsApp Group
          </a>
        </div>

        <p className="text-center text-sm text-gray-500">
          Your reservation is not complete until payment is verified.
        </p>
      </div>
    </div>
  );
}
