import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const SectionStackWrapper = ({ children, trackHeight = "200vh", zIndex = 0 }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Master Template Animation: Scale 1 -> 0.98, Opacity 1 -> 0.95
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} style={{ height: trackHeight }} className="relative w-full">
      <div
        style={{ zIndex }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-auto"
      >
        <motion.div
          style={{ scale, opacity }}
          className="w-full h-full overflow-hidden bg-black origin-center transform-gpu will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
