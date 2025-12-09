// src/components/ui/Button.jsx

import React from "react";

export const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-[#E63946] text-white hover:bg-[#d0323e] shadow-lg",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-[#1D3557] border-[#1D3557]",
    secondary: "bg-[#1D3557] text-white hover:bg-[#152742]",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-14 rounded-full px-8 text-lg",
    // Optional: Add a full-width size for contexts like mobile menus
    full: "h-12 w-full px-4 py-2 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
            {children}   {" "}
    </button>
  );
};
