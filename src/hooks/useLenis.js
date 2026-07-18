import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

// Detect touch/mobile once at module level
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const useLenis = () => {
  useEffect(() => {
    // On touch/mobile devices, native scroll is already smooth — skip Lenis
    if (isTouchDevice) return;

    const lenis = new Lenis({
      lerp: 0.08,            // ⚡ Perf fix: was 0.04 (75 settle-frames). 0.08 = ~35 frames — half the compositor thrash, still silky
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.3,  // ⚡ Perf fix: was 1.7 — lower prevents over-travel on fast swipes that compounded stutter
      infinite: false,
      autoRaf: true,         // Native RAF loop is optimized for high refresh rates
    });

    lenisInstance = lenis;

    // ─── CUSTOM RUBBER-BAND EDGE BOUNCE ─────────────────────────────────────
    // Animates the main container with a GPU transform when scrolling past top/bottom limits
    const container = document.getElementById("root") || document.body;
    let bounceY = 0;
    let isBouncing = false;

    const triggerBounce = () => {
      if (isBouncing) return;
      isBouncing = true;

      const update = () => {
        // Smoothly decay/lerp the bounce offset back to 0
        bounceY *= 0.82; 

        if (Math.abs(bounceY) < 0.2) {
          bounceY = 0;
          container.style.transform = "";
          isBouncing = false;
        } else {
          // Apply GPU translate3d with a subtle scale compression for elastic feel
          const scale = 1 + Math.abs(bounceY) * 0.00003;
          container.style.transform = `translate3d(0, ${bounceY}px, 0) scale(${scale})`;
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const handleWheel = (e) => {
      const scroll = lenis.scroll;
      const limit = lenis.limit;

      if (scroll <= 0 && e.deltaY < 0) {
        // At the top, scrolling up
        bounceY = Math.min(60, bounceY - e.deltaY * 0.12);
        triggerBounce();
      } else if (scroll >= limit && e.deltaY > 0) {
        // At the bottom, scrolling down
        bounceY = Math.max(-60, bounceY - e.deltaY * 0.12);
        triggerBounce();
      }
    };

    let touchStart = 0;
    const handleTouchStart = (e) => {
      if (e.touches[0]) {
        touchStart = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStart - touchY;
      touchStart = touchY;

      const scroll = lenis.scroll;
      const limit = lenis.limit;

      if (scroll <= 0 && deltaY < 0) {
        bounceY = Math.min(60, bounceY - deltaY * 0.25);
        triggerBounce();
      } else if (scroll >= limit && deltaY > 0) {
        bounceY = Math.max(-60, bounceY - deltaY * 0.25);
        triggerBounce();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Add/remove 'is-scrolling' class on body so CSS can pause non-critical animations
    let scrollEndTimer = null;
    let isCurrentlyScrolling = false;
    lenis.on("scroll", () => {
      if (!isCurrentlyScrolling) {
        document.body.classList.add("is-scrolling");
        isCurrentlyScrolling = true;
      }
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
        isCurrentlyScrolling = false;
      }, 150);
    });

    // Lenis anchor link handling
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
      clearTimeout(scrollEndTimer);
      document.body.classList.remove("is-scrolling");
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisInstance = null;
      container.style.transform = "";
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
