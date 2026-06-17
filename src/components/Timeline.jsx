import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// High-tech terminal sounds or visual triggers
const waypointMeta = [
  {
    code: "NODE_01",
    tag: "INTERNSHIP",
    status: "ARCHIVED",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  {
    code: "NODE_02",
    tag: "EDUCATION",
    status: "ACTIVE_TRACK",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    code: "NODE_03",
    tag: "CREDENTIALS",
    status: "VERIFIED",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
  },
];

// Cyberpunk URL link parsing
const parseContent = (text, activeColor) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            borderColor: activeColor,
            boxShadow: `0 0 10px ${activeColor}20`,
            color: activeColor,
          }}
          className="inline-flex items-center gap-1.5 ml-2 px-3 py-0.5 text-[10px] uppercase font-black rounded-md border bg-black/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-1.5 w-1.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: activeColor }}></span>
          </span>
          Access Link
        </a>
      );
    }
    return part ? <span key={i} className="text-neutral-300 font-mono">{part}</span> : null;
  });
};

export const Timeline = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const activeMeta = waypointMeta[activeIndex % waypointMeta.length];
  const [decryptionProgress, setDecryptionProgress] = useState(0);

  // Simulate typewriter / data decryption count on change
  useEffect(() => {
    setDecryptionProgress(0);
    const interval = setInterval(() => {
      setDecryptionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="c-space section-spacing relative">
      {/* HUD Frame Box */}
      <div className="max-w-6xl mx-auto relative rounded-3xl border border-white/10 bg-black/75 backdrop-blur-xl p-6 md:p-10 overflow-hidden shadow-2xl">
        
        {/* Futuristic corner crosshairs */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 pointer-events-none" />

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        
        {/* Dynamic scanner line sweeps across the console */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" style={{ top: "30%" }} />

        {/* Header Terminal Info Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-8 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeMeta.color }} />
              <h2 className="text-[10px] tracking-[0.3em] font-black uppercase text-neutral-400 font-mono">
                COGNITIVE ARCHIVES // SECURE SYSTEM_V.03
              </h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-outfit uppercase tracking-tight">
              Experience &amp; Education
            </h3>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-neutral-400 bg-neutral-900/60 border border-white/5 rounded-lg px-4 py-2">
            <div>
              SYS_LOC: <span className="text-white font-bold">NODE_{activeIndex + 1}</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              DECRYPT: <span className="font-bold" style={{ color: activeMeta.color }}>{Math.min(100, decryptionProgress)}%</span>
            </div>
          </div>
        </div>

        {/* Console Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          
          {/* LEFT: Waypoint Navigation Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="text-[11px] tracking-wider font-bold text-neutral-500 uppercase font-mono mb-2 flex items-center justify-between">
              <span>SELECT SYSTEM MODULE:</span>
              <span>[TRACKS: {data.length}]</span>
            </div>

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
                    {/* Glowing side connector */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlowConnector"
                        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-r"
                        style={{
                          backgroundColor: meta.color,
                          boxShadow: `0 0 15px ${meta.color}, 0 0 5px ${meta.color}`,
                        }}
                      />
                    )}

                    <div
                      className={`ml-2 p-4 rounded-xl border transition-all duration-500 bg-neutral-950/60 relative overflow-hidden
                        ${isActive ? "border-white/20 shadow-lg" : "border-white/5 opacity-60 hover:opacity-100 hover:border-white/10"}`}
                      style={{
                        boxShadow: isActive ? `inset 0 0 12px ${meta.color}15` : "none",
                      }}
                    >
                      {/* Background scanning wave on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                      <div className="flex justify-between items-start mb-2">
                        <span
                          className="text-[9px] tracking-widest font-black uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 font-mono"
                          style={{ color: meta.color }}
                        >
                          {meta.code} // {meta.tag}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono font-semibold">
                          {item.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-[#00ffff] transition-colors font-mono">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 font-mono font-medium truncate">
                        {item.job}
                      </p>

                      {/* Status lock marker */}
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                        <span>STATUS: <span style={{ color: isActive ? meta.color : "#6b7280" }}>{meta.status}</span></span>
                        {isActive ? (
                          <span style={{ color: meta.color }}>[ ONLINE ]</span>
                        ) : (
                          <span>[ STANDBY ]</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: High-Tech HUD Details Terminal */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col h-full rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md p-6 relative overflow-hidden"
                style={{
                  boxShadow: `inset 0 0 20px ${activeMeta.glow}`,
                }}
              >
                {/* SVG Concentric Orbit Radar Indicator */}
                <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]" style={{ color: activeMeta.color }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10,5" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Sub-header logs indicator */}
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-400 mb-6 pb-2 border-b border-white/5">
                  <span>// OUTPUT DECRYPTOR FEED</span>
                  <span style={{ color: activeMeta.color }}>ESTABLISHED</span>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight font-outfit uppercase">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm font-semibold mt-1 font-mono" style={{ color: activeMeta.color }}>
                      {activeItem.job}
                    </p>
                  </div>

                  {/* Accomplishment listing */}
                  <div className="space-y-3 mt-6">
                    {activeItem.contents.map((content, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 + 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.05] transition-all duration-300 group"
                      >
                        {/* Terminal key identifier e.g. [01] */}
                        <span
                          className="font-mono text-[9px] font-black px-1.5 py-0.5 rounded border border-white/10"
                          style={{
                            color: activeMeta.color,
                            backgroundColor: `${activeMeta.color}10`,
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="text-xs md:text-sm leading-relaxed text-neutral-300 w-full">
                          {parseContent(content, activeMeta.color)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Interactive HUD status panel footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeMeta.color }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeMeta.color }}></span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      SECURE CONNECTION STATUS: STABLE
                    </span>
                  </div>
                  
                  <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                    SECTOR_X02 // {activeMeta.code}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};