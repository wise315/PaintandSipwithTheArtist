// src/components/ui/Card.jsx

import React from "react";

export const Card = ({ className, children }) => (
  <div
    className={`rounded-xl border bg-white text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight text-[#1D3557] ${className}`}
  >
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const CardFooter = ({ className, children }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);
