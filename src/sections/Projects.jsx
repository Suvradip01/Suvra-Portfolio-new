import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ParallaxProjectCard from "../components/ParallaxProjectCard";
import { myProjects } from "../constants";

// ─────────────────────────────────────────────────────────────────────────────
// Each card gets a sticky offset so it "sits" slightly lower than the previous
// creating the physical stacking illusion from the design reference.
// ─────────────────────────────────────────────────────────────────────────────
const CARD_STICKY_TOP_BASE = 80; // px from top for first card
const CARD_STICKY_STEP = 18;     // each next card peeks this many px below the last

// The scroll-distance consumed per card before the NEXT card starts stacking in.
// Making this taller gives a slower, cinematic pace.
const SCROLL_PER_CARD = 500; // px of scroll travel per card

const StickyCard = ({ project, index, total }) => {
  const ref = useRef(null);

  // Track how far within the section we've scrolled
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale + opacity for the "squish / fade" as the next card stacks over it
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.96, 1, index === total - 1 ? 1 : 0.96, index === total - 1 ? 1 : 0.93]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [0.6, 1, 1, index === total - 1 ? 1 : 0.85]
  );

  const stickyTop = CARD_STICKY_TOP_BASE + index * CARD_STICKY_STEP;

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: 10 + index,
        marginBottom: index === total - 1 ? 0 : "2px",
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.7,
          ease: [0.215, 0.61, 0.355, 1],
          delay: 0.05,
        }}
      >
        <ParallaxProjectCard {...project} index={index} />
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Projects section — sticky stacked parallax cards
// ─────────────────────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 px-4 md:px-8"
    >
      {/* ── Heading ── */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex items-center gap-4 mb-3"
        >
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-4xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300"
        >
          Selected{" "}
          <span className="text-4xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Projects
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ originX: 0 }}
          className="mt-4 h-px w-full bg-gradient-to-r from-violet-600/60 via-neutral-700/40 to-transparent"
        />
      </div>

      {/* ── Stacked Cards Container ── */}
      {/* Tall enough so each card gets its full scroll travel */}
      <div
        className="max-w-7xl mx-auto relative"
        style={{
          // Height = enough space for cards to stack:
          // (n-1 cards × scroll_per_card) + one card height (approx 400px) + breathing room
          minHeight: `${(myProjects.length - 1) * SCROLL_PER_CARD + 560}px`,
        }}
      >
        {myProjects.map((project, index) => (
          <StickyCard
            key={project.id}
            project={project}
            index={index}
            total={myProjects.length}
          />
        ))}
      </div>

      {/* Bottom breathing room */}
      <div className="h-32" />
    </section>
  );
};

export default Projects;
