// src/components/sections/About.jsx

import React from "react";
import { Check } from "lucide-react";

export const About = () => {
  return (
    <section
      className="py-24 bg-[linear-gradient(135deg,#FEE440,#FF6B6B,#4ECDC4,#1A535C)] bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite]"
      id="about"
    >
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Unleash Your Inner Artist
        </h2>
        <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed">
          Join us for an evening where creativity flows as freely as your
          imagination. Whether you're a seasoned painter or holding a brush for
          the first time, Art Meets Culture is designed to help you unwind,
          connect, and create.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 hover:bg-white/40 transition duration-300 cursor-pointer shadow-lg">
            <Check size={20} className="text-[#1D3557] animate-bounce" />
            <span className="font-semibold text-[#1D3557]">
              Get To Interact With New People
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 hover:bg-white/40 transition duration-300 cursor-pointer shadow-lg">
            <Check size={20} className="text-[#1D3557] animate-bounce" />
            <span className="font-semibold text-[#1D3557]">
              Experience Culture With a Difference
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 hover:bg-white/40 transition duration-300 cursor-pointer shadow-lg">
            <Check size={20} className="text-[#1D3557] animate-bounce" />
            <span className="font-semibold text-[#1D3557]">
              Fun & Relaxing Environment
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 hover:bg-white/40 transition duration-300 cursor-pointer shadow-lg">
            <Check size={20} className="text-[#1D3557] animate-bounce" />
            <span className="font-semibold text-[#1D3557]">
              Create Lasting Memories
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
