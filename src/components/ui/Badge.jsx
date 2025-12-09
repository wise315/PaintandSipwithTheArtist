// src/components/ui/Badge.jsx

import React from "react";

export const Badge = ({ children, className }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none text-white bg-[#1D3557] ${className}`}
  >
    {children}
  </span>
);
