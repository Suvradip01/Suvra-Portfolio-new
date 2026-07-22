import React, { useEffect } from "react";
import Navbar from "./sections/Navbar";
import { HeroStackWrapper } from "./components/HeroStackWrapper";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { TransitionBridge } from "./components/TransitionBridge";
import { useLenis } from "./hooks/useLenis";
import { usePortfolioStore } from "./store/usePortfolioStore";

const App = () => {
  useLenis();          // 🌊 Initialise Lenis smooth scroll for desktop

  const { renderAllImmediately } = usePortfolioStore();

  useEffect(() => {
    renderAllImmediately();
  }, [renderAllImmediately]);

  return (
    <>
      <Navbar />

      {/* ── PARALLAX STACKED CARD: HERO ➔ ABOUT ── */}
      <div className="relative w-full">
        {/* 1. Sticky Hero section pinned underneath (h-[200vh] track) */}
        <HeroStackWrapper />

        {/* 2. About section card moving UPWARD from bottom of viewport over Hero */}
        <div className="relative z-10 -mt-[100vh] bg-[#000000] rounded-t-[32px] md:rounded-t-[48px] border-t border-white/15 shadow-[0_-35px_90px_rgba(0,0,0,0.98)] transform-gpu">
          <div className="container mx-auto max-w-7xl">
            <About />
          </div>
        </div>
      </div>

      {/* ── NORMAL SCROLLING RESUMES FOR ALL SUBSEQUENT SECTIONS ── */}
      <div className="container mx-auto max-w-7xl relative z-10 bg-[#000000]">
        <Projects />
      </div>

      <TransitionBridge />

      <div className="container mx-auto max-w-7xl">
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;

