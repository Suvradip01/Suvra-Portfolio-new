import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import { TransitionBridge } from "./TransitionBridge";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export const StackedCardsLayout = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".stack-panel");

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return; // Last section doesn't get covered by another card

        const nextPanel = panels[i + 1];

        // Create Scrub ScrollTrigger pinned timeline for section i -> section i+1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            scrub: 0.8,
            pin: true,
            pinSpacing: false, // Prevents white gap so incoming card slides directly over pinned outgoing card!
            invalidateOnRefresh: true,
          },
        });

        // 1. Outgoing panel scales down subtly for 3D depth
        tl.to(
          panel,
          {
            scale: 0.97,
            opacity: 0.95,
            ease: "none",
          },
          0
        );

        // 2. Incoming panel translates from translateY(100%) to translateY(0) directly over outgoing panel
        tl.fromTo(
          nextPanel,
          { yPercent: 100 },
          { yPercent: 0, ease: "none" },
          0
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger on resize / orientation change
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert(); // Clean up all GSAP ScrollTrigger animations to prevent memory leaks
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black">
      {/* ── CARD 1: HERO ── */}
      <div className="stack-panel relative z-[1] w-full min-h-screen bg-black overflow-hidden transform-gpu will-change-transform">
        <Hero />
      </div>

      {/* ── CARD 2: ABOUT ── */}
      <div className="stack-panel relative z-[10] w-full min-h-screen bg-black rounded-t-[32px] md:rounded-t-[48px] border-t border-white/15 shadow-[0_-35px_90px_rgba(0,0,0,0.98)] overflow-hidden transform-gpu will-change-transform">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <About />
        </div>
      </div>

      {/* ── CARD 3: PROJECTS ── */}
      <div className="stack-panel relative z-[20] w-full min-h-screen bg-black rounded-t-[32px] md:rounded-t-[48px] border-t border-white/15 shadow-[0_-35px_90px_rgba(0,0,0,0.98)] overflow-hidden transform-gpu will-change-transform">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          <Projects />
        </div>
      </div>

      {/* ── CARD 4: EDUCATION / TRANSITION BRIDGE ── */}
      <div className="stack-panel relative z-[30] w-full min-h-screen bg-black rounded-t-[32px] md:rounded-t-[48px] border-t border-white/15 shadow-[0_-35px_90px_rgba(0,0,0,0.98)] overflow-hidden transform-gpu will-change-transform">
        <TransitionBridge />
      </div>

      {/* ── CARD 5: CONTACT & FOOTER ── */}
      <div className="stack-panel relative z-[40] w-full min-h-screen bg-black rounded-t-[32px] md:rounded-t-[48px] border-t border-white/15 shadow-[0_-35px_90px_rgba(0,0,0,0.98)] overflow-hidden transform-gpu will-change-transform">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
};
