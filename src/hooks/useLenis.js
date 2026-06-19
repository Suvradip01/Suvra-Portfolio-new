import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with premium smooth lerp configuration
    const lenis = new Lenis({
      lerp: 0.08,              // Linear interpolation (lower = smoother glide, 0.08 is perfect for premium feel)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: true,           // Let Lenis natively run its optimized RAF loop for high refresh rates (120Hz/144Hz)
    });

    lenisInstance = lenis;

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

// Utilities to disable/enable scrolling
export const stopScroll = () => {
  if (lenisInstance) lenisInstance.stop();
};

export const startScroll = () => {
  if (lenisInstance) lenisInstance.start();
};

