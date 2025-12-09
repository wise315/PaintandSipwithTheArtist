// src/pages/Success.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">🎉 You're Signed Up!</h1>

      <p className="text-xl text-gray-300 max-w-lg mb-6">
        Thank you for signing up to get free tickets! We will contact you
        shortly with more information.
      </p>

      <Link
        to="/"
        className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};
