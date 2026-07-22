import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Hero from "../sections/Hero";

export const HeroStackWrapper = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down subtly (1 -> 0.98) for depth, opacity stays high (1 -> 0.95)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {/* Pinned sticky Hero container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 flex items-center justify-center pointer-events-auto">
        <motion.div
          style={{ scale, opacity }}
          className="w-full h-full overflow-hidden bg-black origin-center transform-gpu will-change-transform"
        >
          <Hero />
        </motion.div>
      </div>
    </div>
  );
};
