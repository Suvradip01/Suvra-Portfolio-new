import React, { Suspense, lazy, useState, useEffect } from "react";
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
  
  const [renderAbout, setRenderAbout] = useState(false);
  const [renderProjects, setRenderProjects] = useState(false);
  const [renderExperiences, setRenderExperiences] = useState(false);
  const [renderContact, setRenderContact] = useState(false);

  useEffect(() => {
    // If user loaded page already scrolled down, render everything immediately
    if (window.scrollY > 10) {
      setRenderAbout(true);
      setRenderProjects(true);
      setRenderExperiences(true);
      setRenderContact(true);
      return;
    }

    // Stagger loading of sections to spread CPU compilation/mounting cost
    const timer1 = setTimeout(() => setRenderAbout(true), 600);
    const timer2 = setTimeout(() => setRenderProjects(true), 1000);
    const timer3 = setTimeout(() => setRenderExperiences(true), 1400);
    const timer4 = setTimeout(() => setRenderContact(true), 1800);

    const handleScroll = () => {
      setRenderAbout(true);
      setRenderProjects(true);
      setRenderExperiences(true);
      setRenderContact(true);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        {renderAbout && <About />}
        {renderProjects && <Projects />}
        {renderExperiences && <Experiences />}
        {renderContact && (
          <>
            <Contact />
            <Footer />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default App;
