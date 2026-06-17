import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const waypointMeta = [
  {
    tag: "INTERNSHIP",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    tag: "EDUCATION",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    tag: "CREDENTIALS",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.15)",
  },
];

// Clean URL parsing that separates text labels from links
const parseContent = (text, activeColor) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (!urlRegex.test(text)) {
    return <span className="text-neutral-300 font-sans text-sm">{text}</span>;
  }

  const parts = text.split(urlRegex);
  const label = parts[0].trim();
  const url = text.match(urlRegex)[0];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
      <span className="text-neutral-300 font-sans text-sm">{label}</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          borderColor: activeColor,
          color: activeColor,
        }}
        className="inline-flex items-center self-start sm:self-center gap-1.5 px-3.5 py-1 text-[11px] font-bold uppercase rounded-full border bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        View Link
      </a>
    </div>
  );
};

export const Timeline = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const activeMeta = waypointMeta[activeIndex % waypointMeta.length];

  return (
    <div className="c-space section-spacing relative">
      {/* Console Frame */}
      <div className="max-w-6xl mx-auto relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 md:p-8 overflow-hidden shadow-2xl">
        
        {/* Subtle Decorative Corners */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/20 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/20 pointer-events-none" />

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-8 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeMeta.color }} />
              <span className="text-[10px] tracking-[0.25em] font-extrabold uppercase text-neutral-400 font-sans">
                Professional Journey
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-outfit uppercase tracking-tight">
              Experience &amp; Education
            </h2>
          </div>
        </div>

        {/* Console Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10 items-stretch">
          
          {/* LEFT: Waypoint Navigation Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="space-y-4 relative">
              {data.map((item, idx) => {
                const meta = waypointMeta[idx % waypointMeta.length];
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="w-full text-left focus:outline-none relative group"
                  >
                    {/* Glowing active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicatorBar"
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r"
                        style={{
                          backgroundColor: meta.color,
                          boxShadow: `0 0 10px ${meta.color}`,
                        }}
                      />
                    )}

                    <div
                      className={`ml-2.5 p-4 rounded-xl border transition-all duration-300 bg-neutral-900/40 relative overflow-hidden
                        ${isActive ? "border-white/20 bg-neutral-900/80 shadow-lg" : "border-white/5 opacity-60 hover:opacity-100 hover:border-white/10"}`}
                      style={{
                        boxShadow: isActive ? `inset 0 0 12px ${meta.color}10` : "none",
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-[9px] tracking-wider font-extrabold uppercase px-2 py-0.5 rounded border border-white/5 bg-white/5"
                          style={{ color: meta.color }}
                        >
                          {meta.tag}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-sans font-semibold">
                          {item.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 font-sans font-medium truncate">
                        {item.job}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: HUD Details Terminal */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col min-h-[380px] lg:h-[400px] rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-md p-6 relative overflow-hidden"
                style={{
                  boxShadow: `inset 0 0 20px ${activeMeta.glow}`,
                }}
              >
                {/* SVG Concentric Orbit Radar Indicator */}
                <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_30s_linear_infinite]" style={{ color: activeMeta.color }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10,5" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="flex-1 overflow-y-auto pr-1">
                  <div className="mb-5">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight font-outfit uppercase">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm font-semibold mt-1 font-sans" style={{ color: activeMeta.color }}>
                      {activeItem.job}
                    </p>
                  </div>

                  {/* Accomplishment listing */}
                  <div className="space-y-3">
                    {activeItem.contents.map((content, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 + 0.05 }}
                        className="flex items-start gap-3 p-3.5 rounded-lg border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{
                            backgroundColor: activeMeta.color,
                            boxShadow: `0 0 8px ${activeMeta.color}`,
                          }}
                        />
                        <div className="text-xs md:text-sm leading-relaxed text-neutral-300 w-full font-sans">
                          {parseContent(content, activeMeta.color)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};