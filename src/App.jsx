import React, { Suspense, lazy, useEffect, startTransition } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useLenis } from "./hooks/useLenis";
import { usePortfolioStore } from "./store/usePortfolioStore";

const App = () => {
  useLenis();          // 🌊 Initialise Lenis smooth scroll for the whole page
  
  const {
    renderAbout,
    renderProjects,
    renderExperiences,
    renderContact,
    renderAllImmediately,
    renderAllStaggered
  } = usePortfolioStore();

  useEffect(() => {
    // If user loaded page already scrolled down, render everything immediately
    if (window.scrollY > 10) {
      renderAllImmediately();
      return;
    }

    // Idle-load sections sequentially after Hero animations have completed (around 2.2s)
    const idleTimer = setTimeout(() => {
      startTransition(() => {
        renderAllStaggered(0, 300);
      });
    }, 2200);

    // Force staggered render of everything if the user scrolls before the idle timers fire.
    const handleScroll = () => {
      clearTimeout(idleTimer);
      // Use startTransition (Concurrent Mode) so the heavy React render doesn't block the scroll thread
      startTransition(() => {
        renderAllStaggered(0, 80);
      });
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [renderAllImmediately, renderAllStaggered]);

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      {renderAbout && <About />}
      {renderProjects && <Projects />}
      {renderExperiences && <Experiences />}
      {renderContact && (
        <>
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
