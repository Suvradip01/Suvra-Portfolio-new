import React, { Suspense, lazy } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
import { useLenis } from "./hooks/useLenis";

const App = () => {
  useLenis();          // 🌊 Initialise Lenis smooth scroll for the whole page

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects/>
        <Experiences />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
