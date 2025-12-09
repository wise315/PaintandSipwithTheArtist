// src/components/sections/Store.jsx

import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { products } from "../data/content.js";
import { motion } from "framer-motion";

export const Store = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Default visible products
  const loadMoreRef = useRef(null);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 3); // Load 3 more
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <section
      className="py-24 bg-[linear-gradient(135deg,#FEE440,#FF6B6B,#4ECDC4,#1A535C)] bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite]"
      id="store"
    >
      {/* Inline CSS for gradient animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D3557] drop-shadow-sm">
            Shop Merch
          </h2>
          <a
            href="#"
            className="text-[#1D3557] font-semibold hover:underline flex items-center gap-1"
          >
            View All <ShoppingCart size={16} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {visibleProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-md border border-white/20 relative">
                <motion.div
                  className="h-52 overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-3 right-3 bg-[#E63946] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#c02834] text-sm"
                  >
                    Quick Add
                  </motion.button>
                </motion.div>

                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#1D3557]">
                    {product.name}
                  </CardTitle>
                </CardHeader>

                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#E63946] drop-shadow">
                    {product.price}
                  </span>

                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button size="sm" className="relative group">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                      <span className="absolute inset-0 rounded-lg border border-[#E63946] opacity-0 group-hover:opacity-100 animate-ping"></span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={loadMoreRef} className="mt-10 h-10 text-center"></div>

        {/* Load More Button (optional alternative) */}
        {visibleCount < products.length && (
          <div className="text-center mt-10">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-3 rounded-xl bg-[#1D3557] text-white hover:bg-[#16324a] shadow-lg"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
