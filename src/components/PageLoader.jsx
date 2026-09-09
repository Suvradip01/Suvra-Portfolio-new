import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { stopScroll, startScroll } from "../hooks/useLenis";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  const revealSite = useCallback(() => {
    gsap.to(".loader-panel", {
      y: "100%",
      duration: 0.65,
      stagger: 0.055,
      ease: "power3.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        startScroll();
        gsap.to(".menu-btn", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
        gsap.to(".hero-line-inner", {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });
  }, []);

  const revealCover = useCallback(() => {
    gsap.to(".loader-panel", {
      y: "0%",
      duration: 0.55,
      stagger: 0.055,
      ease: "power3.inOut",
      onComplete: () => {
        const bg = document.getElementById("loader-bg");
        if (bg) bg.style.display = "none";
        revealSite();
      },
    });
  }, [revealSite]);

  useEffect(() => {
    // Prevent scroll during load
    document.body.style.overflow = "hidden";
    stopScroll();

    const duration = 2500;
    const interval = 50;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += (interval / duration) * 100;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(revealCover, 300);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [revealCover]);

  return (
    <div
      id="loader"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >
      {/* Dark background with progress counter */}
      <div id="loader-bg" className="absolute inset-0 z-10 bg-black">
        {/* Giant percentage counter */}
        <div
          className="absolute bottom-4 right-8 text-[7.5rem] md:text-[10rem] lg:text-[12rem] font-black tracking-[-0.06em] leading-none text-white select-none"
          style={{
            fontFamily: "'Arial Black', 'Impact', 'Trebuchet MS', sans-serif",
            fontWeight: 900,
            WebkitTextStroke: "3px #ffffff",
          }}
        >
          {Math.floor(progress)}%
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
          <div
            className="h-full bg-white/60 transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sliding panels that wipe away to reveal the site */}
      <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="loader-panel relative h-full w-full bg-slate-100 translate-y-[100%]"
          />
        ))}
      </div>
    </div>
  );
}
