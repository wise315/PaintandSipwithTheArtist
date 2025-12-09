// src/components/layout/Footer.jsx

import React from "react";
import { MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Logo from "../../assets/Siplogo.jpg"; // <-- YOUR LOGO HERE

export const Footer = () => {
  return (
    <footer className="bg-[#1D3557] text-white py-16" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* LOGO + TEXT */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={Logo}
                alt="Brand Logo"
                className="w-14 h-14 object-cover rounded-full shadow-lg"
              />
              <h2 className="text-2xl font-bold tracking-wide">Paint & Sip</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Where art meets lifestyle. Join our community of creatives and
              wine lovers.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <p className="text-gray-300 flex items-center gap-2 mb-2">
              <MapPin size={16} /> Delatinos Concepts, 17 BCA Road, Umuahia Abia
              State
            </p>
            <p className="text-gray-300">paintandsipwiththeartist.com</p>
          </div>

          {/* SOCIAL MEDIA */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Follow Us</h4>

            <div className="flex gap-4">
              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#E63946] transition-all cursor-pointer hover:scale-110"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#E63946] transition-all cursor-pointer hover:scale-110"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Art Meets Culture. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
