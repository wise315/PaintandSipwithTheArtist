// src/components/sections/Schedule.jsx

import React from "react";
import { Clock } from "lucide-react";
import { scheduleData } from "../data/content.js";

export const Schedule = () => {
  return (
    <section
      className="py-24 bg-[linear-gradient(135deg,#FEE440,#FF6B6B,#4ECDC4,#1A535C)] bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite]"
      id="schedule"
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Event Schedule
          </h2>
          <p className="text-white/90 mt-3 text-lg">
            A curated timeline for a perfect evening
          </p>
        </div>

        {/* Timeline grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className="
                bg-white/20 backdrop-blur-xl rounded-2xl p-6 
                shadow-lg border border-white/30 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                animate-fadeIn opacity-0 [animation-delay:200ms]
              "
            >
              {/* Time */}
              <div className="flex items-center gap-3 mb-4">
                <Clock size={22} className="text-white animate-pulse" />
                <span className="text-white font-semibold text-lg">
                  {item.time}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#1D3557] mb-2 drop-shadow-sm">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/90 leading-relaxed">{item.desc}</p>

              {/* Timeline bar */}
              <div className="mt-6 w-full h-1 bg-white/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1D3557] animate-slide"
                  style={{ animationDelay: `${index * 0.3}s` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes slide {
          0% { width: 0; }
          100% { width: 100%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide {
          animation: slide 2s ease forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
};
