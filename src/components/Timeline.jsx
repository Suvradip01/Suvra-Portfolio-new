import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

// ─── Accent per card ──────────────────────────────────────────────────────────
const accents = [
  {
    label: "Internship",
    color: "#a855f7",           // purple
    border: "rgba(168, 85, 247, 0.3)",
    glow: "rgba(168, 85, 247, 0.15)",
    text: "#c084fc",
    dot: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.1)",
    gradient: "from-purple-600/20 via-transparent to-transparent",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
      </svg>
    ),
  },
  {
    label: "Education",
    color: "#a855f7",           // purple
    border: "rgba(168, 85, 247, 0.3)",
    glow: "rgba(168, 85, 247, 0.15)",
    text: "#c084fc",
    dot: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.1)",
    gradient: "from-purple-600/20 via-transparent to-transparent",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
      </svg>
    ),
  },
  {
    label: "Certification",
    color: "#a855f7",           // purple
    border: "rgba(168, 85, 247, 0.3)",
    glow: "rgba(168, 85, 247, 0.15)",
    text: "#c084fc",
    dot: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.1)",
    gradient: "from-purple-600/20 via-transparent to-transparent",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
  },
];

// ─── Parse URLs in content points ──────────────────────────────────────────
const parseContent = (text, accentColor) => {
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
            borderColor: `rgba(168,85,247,0.35)`, 
            color: '#c084fc',
            boxShadow: `0 0 10px rgba(168,85,247,0.1)`
          }}
          className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-1 text-[11px] font-bold rounded-full
            border bg-white/5 hover:bg-white/10 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View
        </a>
      );
    }
    return part ? <span key={i} className="text-neutral-300">{part}</span> : null;
  });
};

// ─── Inside Card Showcase (The dynamic detail deck) ──────────────────────────
const InnerDetailCard = ({ activeItem, activeAccent }) => {
  return (
    <div
      style={{
        border: `1px solid ${activeAccent.border}`,
        background: "rgba(10, 10, 10, 0.45)",
        backdropFilter: "blur(12px)",
        boxShadow: `inset 0 1px 0 ${activeAccent.border}`,
      }}
      className="relative rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden w-full min-h-[280px]"
    >
      {/* Decorative high-tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        <div>
          {/* Header Details */}
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <span 
              className="text-[10px] tracking-[0.25em] font-black uppercase px-3 py-1.5 rounded-lg border"
              style={{
                borderColor: activeAccent.border,
                background: activeAccent.badgeBg,
                color: activeAccent.text
              }}
            >
              {activeAccent.label}
            </span>
            <span className="text-xs font-semibold text-neutral-400">
              {activeItem.date}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold text-white mt-5 tracking-tight leading-tight">
            {activeItem.title}
          </h3>
          <p className="text-sm font-semibold text-neutral-400 mt-2">
            {activeItem.job}
          </p>
        </div>

        {/* Decorative glowing dynamic bar at bottom */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
            Overview
          </span>
          <span 
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: activeAccent.color, 
              boxShadow: `0 0 10px ${activeAccent.color}` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Timeline = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const activeAccent = accents[activeIndex % accents.length];

  return (
    <div className="c-space section-spacing relative">
      {/* ── Outer Section Container Card (Unified Console Card) ── */}
      <div 
        style={{
          border: `1px solid ${activeAccent.border}`,
          background: "rgba(10, 10, 10, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 20px 60px ${activeAccent.glow}, inset 0 1px 0 ${activeAccent.border}`,
          transition: "border-color 0.8s ease, box-shadow 0.8s ease"
        }}
        className="relative rounded-3xl p-5 md:p-8 lg:p-8 overflow-hidden max-w-6xl mx-auto"
      >
        {/* Ambient background glow inside the console card */}
        <div 
          className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeAccent.color} 0%, transparent 70%)`
          }}
        />

        {/* Decorative dynamic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

        {/* Glowing side status lines */}
        <div className="absolute top-0 left-0 w-2 h-full opacity-65 pointer-events-none">
          <div 
            className="w-full h-24 transition-all duration-800"
            style={{ 
              background: `linear-gradient(to bottom, ${activeAccent.color}, transparent)`,
              transform: `translateY(${activeIndex * 100}px)`
            }}
          />
        </div>

        {/* ── Title & Navigation inside the Console Card ── */}
        <div className="relative z-10 flex flex-row items-center justify-between gap-6 mb-6 pb-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
              Experience &amp; Education
            </h2>
          </div>

          {/* ── Console Buttons (Prev/Next navigation at top) ── */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + data.length) % data.length)}
              style={{ borderColor: activeAccent.border }}
              className="w-9 h-9 rounded-full border bg-neutral-950/80 hover:bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <div className="flex gap-1.5">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? "w-5" : "w-1.5"}`}
                  style={{
                    backgroundColor: idx === activeIndex ? activeAccent.color : "rgba(255,255,255,0.15)",
                    boxShadow: idx === activeIndex ? `0 0 8px ${activeAccent.color}` : "none",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % data.length)}
              style={{ borderColor: activeAccent.border }}
              className="w-9 h-9 rounded-full border bg-neutral-950/80 hover:bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Interactive Progress Nodes (Top Track Inside Card) ── */}
        <div className="relative max-w-2xl mx-auto mb-8 px-2 z-10">
          {/* Track Line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-neutral-800/80 z-0">
            {/* Active moving fill line */}
            <motion.div 
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, #a855f7, #ffffff, #a855f7)` }}
              animate={{ 
                width: `${(activeIndex / (data.length - 1)) * 100}%` 
              }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
          </div>

          {/* Nodes Grid */}
          <div className="relative flex justify-between z-10">
            {data.map((item, idx) => {
              const acc = accents[idx % accents.length];
              const isActive = idx === activeIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col items-center focus:outline-none group relative"
                >
                  {/* Node Orb */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 
                      ${isActive ? "scale-110" : "scale-95 opacity-60 hover:opacity-100 hover:scale-100"}`}
                    style={{
                      borderColor: isActive ? acc.color : "rgba(255,255,255,0.15)",
                      background: isActive ? `rgba(168,85,247,0.1)` : "rgba(10, 10, 10, 0.9)",
                      color: isActive ? acc.color : "#94a3b8",
                      boxShadow: isActive ? `0 0 25px ${acc.glow}, inset 0 0 10px ${acc.glow}` : "none",
                    }}
                  >
                    {acc.icon}
                  </motion.div>

                  {/* Floating active neon indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-2.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: acc.color, boxShadow: `0 0 8px ${acc.color}` }}
                    />
                  )}

                  {/* Mini label info */}
                  <span 
                    className={`hidden md:block absolute top-16 text-[10px] font-extrabold tracking-widest uppercase transition-colors duration-300 whitespace-nowrap
                      ${isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}
                  >
                    {acc.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Console Showcase Grid Inside Card ── */}
        <div className="relative z-10 w-full lg:h-[370px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start h-full"
            >
              {/* Left Column: Category detail card */}
              <div className="lg:col-span-5 flex items-center h-full">
                <InnerDetailCard activeItem={activeItem} activeAccent={activeAccent} />
              </div>

              {/* Right Column: Detailed accomplishment logs */}
              <div className="lg:col-span-7 flex flex-col justify-start space-y-2.5 h-full overflow-y-auto pr-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase bg-neutral-900/80 border border-neutral-800 px-3 py-1 rounded-md">
                    Key Highlights
                  </span>
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>

                <div className="space-y-2.5">
                  {activeItem.contents.map((content, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 + 0.15 }}
                      style={{
                        borderLeft: `3px solid rgba(168, 85, 247, 0.3)`
                      }}
                      className="p-3 bg-white/[0.015] border border-white/[0.03] rounded-r-xl rounded-l-sm hover:bg-white/[0.03] hover:border-white/[0.06] transition-all duration-300 flex items-start gap-4"
                    >
                      {/* Glowing index dot */}
                      <div 
                        className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
                        style={{ 
                          background: '#a855f7', 
                          boxShadow: `0 0 8px rgba(168, 85, 247, 0.5)` 
                        }}
                      />
                      <div className="text-neutral-300 text-[14px] md:text-[15px] leading-relaxed font-medium w-full">
                        {parseContent(content, '#a855f7')}
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
  );
};