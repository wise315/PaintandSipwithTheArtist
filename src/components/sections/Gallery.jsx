// src/components/sections/Gallery.jsx

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";

import Photo1 from "../../assets/WA0128.jpg";
import Photo2 from "../../assets/WA0135.jpg";
import Photo3 from "../../assets/WA0141.jpg";
import Photo4 from "../../assets/WA0142.jpg";
import Photo5 from "../../assets/WA0145.jpg";
import Photo6 from "../../assets/WA0146.jpg";
import eventVideo from "../../assets/VID.mp4";

const slideshowImages = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
const SLIDESHOW_INTERVAL_MS = 5000;

export const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Touch swipe tracking
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, SLIDESHOW_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + slideshowImages.length) % slideshowImages.length
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % slideshowImages.length
    );
  };

  // --- Touch Gesture Functions ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) goToNext(); // swipe left
      else goToPrev(); // swipe right
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="py-24 bg-[linear-gradient(135deg,#FEE440,#FF6B6B,#4ECDC4,#1A535C)] bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite]"
      id="gallery"
    >
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12 drop-shadow-lg">
          Previous Editions
        </h2>

        {/* --- Slideshow with Swipe Support --- */}
        <div
          className="relative w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden mb-16 border-4 border-white/30 backdrop-blur-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={slideshowImages[currentImageIndex]}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="w-full h-[500px] object-cover transition-opacity duration-700 ease-in-out"
          />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/50 transition"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/50 transition"
          >
            <ChevronRight size={32} />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="text-white hover:text-[#1D3557] transition"
              >
                {index === currentImageIndex ? (
                  <CircleDot size={20} />
                ) : (
                  <Circle size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16 w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden relative border-4 border-white/30 backdrop-blur-lg">
          <video
            className="w-full h-full object-cover"
            src={eventVideo}
            poster={slideshowImages[0]}
            controls
            autoPlay
            loop
            muted
            playsInline
          />

          <p className="absolute bottom-4 left-4 text-white font-semibold z-10 drop-shadow-lg">
            Watch the 2024 Highlights
          </p>
        </div>
      </div>
    </section>
  );
};
