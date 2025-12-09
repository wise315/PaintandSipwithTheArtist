// src/components/sections/Hero.jsx

import React from "react";
import { Button } from "../ui/Button.jsx";
import { Badge } from "../ui/Badge.jsx";
import { useCountdown } from "../hooks/useCountdown.js";
import { Link } from "react-router-dom";

export const Hero = () => {
  const targetDate = new Date("December 13, 2025 19:00:00").getTime();
  const timeLeft = useCountdown(targetDate);

  const isEventOver =
    timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds <= 0;

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1920&auto=format&fit=crop"
          alt="Art Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <Badge className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-sm border-0">
          {isEventOver
            ? "Event Concluded!"
            : "Upcoming Event • Delations Concepts"}
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Art Meets Culture
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
          A premium sip & paint experience for the modern creative.
        </p>

        {/* EXISTING BUTTON routes to select a table and make payments */}
        <Link to="/tables">
          <Button
            variant="default"
            size="lg"
            className="mb-4"
            disabled={isEventOver}
          >
            {isEventOver ? "Tickets Sold Out" : "To Buy a Table – Click Here"}
          </Button>
        </Link>

        {/* NEW BUTTON → LINKS TO /signup */}
        <Link to="/signup">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
          >
            Sign Up to Get Free Tickets
          </Button>
        </Link>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8 text-white mt-10">
          {isEventOver ? (
            <p className="text-2xl font-semibold text-[#E63946] bg-white/10 p-4 rounded-xl backdrop-blur-md">
              Thank you for attending! See you next year.
            </p>
          ) : (
            Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-2xl md:text-3xl font-bold backdrop-blur-md">
                  {String(value).padStart(2, "0")}
                </div>
                <span className="text-xs uppercase mt-2 tracking-wider opacity-80">
                  {unit}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
