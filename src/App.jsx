import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";

import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useLenis } from "./hooks/useLenis";

const App = () => {
  useLenis();          // 🌊 Initialise Lenis smooth scroll for the whole page

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <About />

      <Projects/>
      <Experiences />

      <Contact />
      <Footer />
    </div>
  );
};

export default App;
