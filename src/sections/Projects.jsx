import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ParallaxProjectCard from "../components/ParallaxProjectCard";
import { myProjects } from "../constants";

// ─────────────────────────────────────────────────────────────────────────────
// ⚡ PERF FIX: Removed per-card useScroll. Previously each StickyCard had its
// own useScroll + 2 useTransform chains — with 5 cards that was 10 simultaneous
// scroll watchers all firing on every tick. Now we use ONE section-level watcher
// and derive each card's values from a single shared scrollYProgress.
// ─────────────────────────────────────────────────────────────────────────────

const CARD_STICKY_TOP_BASE = 80;
const CARD_STICKY_STEP = 18;
const SCROLL_PER_CARD = 500;

// Build per-card transform keyframes from section-level progress [0..1]
function getCardTransforms(scrollYProgress, index, total) {
  const n = total;
  // Each card occupies 1/n of the scroll range.
  // It enters from 0, peaks at index/n, and exits toward 1.
  const segStart = index / n;
  const segPeak = (index + 0.35) / n;
  const segEnd = (index + 0.65) / n;
  const segOut = (index + 1) / n;

  const isLast = index === total - 1;

  const scale = useTransform(
    scrollYProgress,
    [segStart, segPeak, segEnd, Math.min(segOut, 1)],
    [0.96, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.93]
  );

  const opacity = useTransform(
    scrollYProgress,
    [segStart, segPeak * 0.6, segEnd, Math.min(segOut, 1)],
    [0.6, 1, 1, isLast ? 1 : 0.85]
  );

  return { scale, opacity };
}

// ─────────────────────────────────────────────────────────────────────────────
// StickyCard — receives shared scrollYProgress instead of creating its own
// ─────────────────────────────────────────────────────────────────────────────
const StickyCard = ({ project, index, total, scrollYProgress }) => {
  const { scale, opacity } = getCardTransforms(scrollYProgress, index, total);
  const stickyTop = CARD_STICKY_TOP_BASE + index * CARD_STICKY_STEP;

  return (
    <div
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
// Projects section — one scroll watcher drives all cards
// ─────────────────────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);

  // ⚡ Single shared scroll progress — replaces 5 individual useScroll calls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 px-4 md:px-8"
      style={{ contain: "layout style" }}
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
      <div
        className="max-w-7xl mx-auto relative"
        style={{
          minHeight: `${(myProjects.length - 1) * SCROLL_PER_CARD + 560}px`,
        }}
      >
        {myProjects.map((project, index) => (
          <StickyCard
            key={project.id}
            project={project}
            index={index}
            total={myProjects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom breathing room */}
      <div className="h-32" />
    </section>
  );
};

export default Projects;
