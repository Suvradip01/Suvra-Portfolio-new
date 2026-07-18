import React, { startTransition, useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useLenis } from "./hooks/useLenis";
import { usePortfolioStore } from "./store/usePortfolioStore";

// ⚡ Perf: Stagger gap between section mounts (ms).
// 350ms gives the browser a full frame budget to layout+paint each section
// before the next one starts mounting — eliminates the "mount storm" during first scroll.
const STAGGER_GAP = 350;

const App = () => {
  useLenis();          // 🌊 Initialise Lenis smooth scroll for the whole page

  const {
    renderAbout,
    renderProjects,
    renderExperiences,
    renderContact,
    renderAllImmediately,
    setRenderAbout,
    setRenderProjects,
    setRenderExperiences,
    setRenderContact,
  } = usePortfolioStore();

  useEffect(() => {
    // If user loaded page already scrolled down, render everything immediately
    if (window.scrollY > 10) {
      renderAllImmediately();
      return;
    }

    // Timers to hold all the staggered mounts so we can cancel them on cleanup
    const timers = [];

    // ⚡ Perf: Each section gets its OWN startTransition so React Concurrent Mode
    // can yield to user input (scroll, touch) between each mount.
    // Raw setTimeout inside the store bypassed this — now properly controlled here.
    const scheduleStaggered = (delayStart = 0) => {
      timers.push(setTimeout(() => {
        startTransition(() => setRenderAbout(true));
      }, delayStart));

      timers.push(setTimeout(() => {
        startTransition(() => setRenderProjects(true));
      }, delayStart + STAGGER_GAP));

      timers.push(setTimeout(() => {
        startTransition(() => setRenderExperiences(true));
      }, delayStart + STAGGER_GAP * 2));

      timers.push(setTimeout(() => {
        startTransition(() => setRenderContact(true));
      }, delayStart + STAGGER_GAP * 3));
    };

    // Idle-load sections sequentially after Hero animations have completed (around 2.2s)
    const idleTimer = setTimeout(() => {
      scheduleStaggered(0);
    }, 2200);
    timers.push(idleTimer);

    // Force staggered render of everything if the user scrolls before the idle timers fire.
    const handleScroll = () => {
      // Cancel the idle-load timer and all pending stagger timers
      timers.forEach(clearTimeout);
      timers.length = 0;
      // Use a shorter delay when triggered by scroll — still staggered but faster start
      scheduleStaggered(0);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [renderAllImmediately, setRenderAbout, setRenderProjects, setRenderExperiences, setRenderContact]);

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

