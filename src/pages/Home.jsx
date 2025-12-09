import React from "react";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Schedule } from "../components/sections/Schedule";
import { Gallery } from "../components/sections/Gallery";
import { Store } from "../components/sections/Store";
import { Footer } from "../components/layout/Footer";

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Schedule />
      <Gallery />
      <Store />
      <Footer />
    </>
  );
};
