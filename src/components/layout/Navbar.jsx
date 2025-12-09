// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { navLinks } from "../data/content.js";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // shrink after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? "h-16" : "h-20"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between transition-all duration-300">
        {/* LOGO */}
        <img
          src="/thelogo.png"
          alt="Paint & Sip Logo"
          className={`cursor-pointer drop-shadow-lg transition-all duration-300 ${
            isScrolled ? "h-12" : "h-20"
          }`}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-[#E63946] transition-colors"
            >
              {link.name}
            </a>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="ml-4"
            onClick={() => {
              const token = localStorage.getItem("adminToken");
              window.location.href = token ? "/admin" : "/admin/login";
            }}
          >
            Admin Dashboard
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg border-b shadow-xl p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <Button
            className="w-full"
            onClick={() => {
              const token = localStorage.getItem("adminToken");
              window.location.href = token ? "/admin" : "/admin/login";
              setIsMenuOpen(false);
            }}
          >
            Admin Dashboard
          </Button>
        </div>
      )}
    </nav>
  );
};
