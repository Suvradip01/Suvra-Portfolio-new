import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with smooth, bouncy settings
    const lenis = new Lenis({
      duration: 1.4,           // scroll animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing for smooth+bouncy feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
      autoRaf: false,          // we drive the RAF loop manually
    });

    lenisInstance = lenis;

    // RAF loop
    let animFrame;
    const raf = (time) => {
      lenis.raf(time);
      animFrame = requestAnimationFrame(raf);
    };
    animFrame = requestAnimationFrame(raf);

    // Make lenis scroll targets work for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0, duration: 1.6 });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

// Utility to scroll to element from outside this hook
export const scrollTo = (target, options) => {
  if (lenisInstance) lenisInstance.scrollTo(target, options);
};
