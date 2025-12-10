// src/components/sections/Schedule.jsx
import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { scheduleData } from "../../components/data/content.js";

export const Schedule = () => {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef(null);

  const visibleItems = showAll ? scheduleData : scheduleData.slice(0, 3);

  // Enable horizontal wheel scrolling on desktop
  const onWheelScroll = (e) => {
    if (window.innerWidth >= 1024) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  return (
    <section
      id="schedule"
      className="
        py-24 
        bg-[linear-gradient(135deg,#0A0F1F,#1A1F38,#8C471E)] 
        text-gold
        bg-[length:200%_200%] animate-[luxuryShift_12s_ease_infinite]
        relative overflow-hidden
      "
    >
      {/* Subtle background texture (still allowed, non-animated) */}
      <div className="absolute inset-0 bg-[url('/patterns/cultural-pattern.png')] opacity-10 mix-blend-overlay"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#F9D984] drop-shadow-xl">
            SCHEDULE
          </h2>
          <p className="text-[#f8e7c4]/90 mt-3 text-lg font-light tracking-wide">
            A curated timeline for a perfect cultural experience
          </p>
        </div>

        {/* DESKTOP HORIZONTAL SCROLL */}
        <div
          ref={scrollRef}
          onWheel={onWheelScroll}
          className="
            hidden lg:flex
            gap-10 pb-4 
            overflow-x-auto 
            scrollbar-thin scrollbar-thumb-[#c9a86a] scrollbar-track-transparent
            snap-x snap-mandatory
          "
        >
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className="
                min-w-[320px] max-w-[320px] 
                snap-center
                p-8 rounded-2xl 
                bg-[#0d1326]/60 backdrop-blur-xl 
                border-2 border-[#C9A86A]
                shadow-[0_0_20px_rgba(255,215,140,0.2)]
                hover:shadow-[0_0_35px_rgba(255,215,140,0.35)]
                transition-all duration-500
              "
            >
              <p className="text-xl font-semibold text-[#F9D984] mb-2">
                {item.time}
              </p>
              <h3 className="text-2xl font-serif text-white font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-[#e9dcb8]/90 leading-relaxed text-[15px]">
                {item.desc}
              </p>
              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#F9D984] to-transparent"></div>
            </div>
          ))}
        </div>

        {/* MOBILE GRID */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-10">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="
                p-8 rounded-2xl 
                bg-[#0d1326]/60 backdrop-blur-xl 
                border-2 border-[#C9A86A]
                shadow-[0_0_20px_rgba(255,215,140,0.2)]
                transition-all duration-500
              "
            >
              <p className="text-xl font-semibold text-[#F9D984] mb-2">
                {item.time}
              </p>
              <h3 className="text-2xl font-serif text-white font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-[#e9dcb8]/90 leading-relaxed text-[15px]">
                {item.desc}
              </p>
              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#F9D984] to-transparent"></div>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-10 flex justify-center lg:hidden">
          <button
            className="
              flex items-center gap-2 
              px-6 py-3 rounded-full 
              bg-[#C9A86A] text-black font-semibold 
              shadow-lg hover:bg-[#e6c27d] transition-all
            "
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View Full Schedule"}
            {showAll ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes luxuryShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};
