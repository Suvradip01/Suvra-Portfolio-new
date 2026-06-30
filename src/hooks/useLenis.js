import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

// Detect touch/mobile once at module level
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const useLenis = () => {
  useEffect(() => {
    // On touch/mobile devices, native scroll is already smooth and has better
    // performance characteristics (momentum, rubber-band). Lenis on mobile
    // intercepts the scroll and replaces native scroll with JS interpolation,
    // causing stuttering especially on mid-range phones.
    if (isTouchDevice) return;

    const lenis = new Lenis({
      lerp: 0.1,              // Slightly snappier than 0.08 — still premium but less lag
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
      autoRaf: true,           // Lenis manages its own RAF — high refresh rate aware
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
        lenis.scrollTo(el, { offset: 0, duration: 1.4 });
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

