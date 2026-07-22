import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// Orbit words and dots
// ─────────────────────────────────────────────────────────────────────────────
const ORBIT_WORDS = [
  { word: "ANALYZE", angle: -68 },
  { word: "DESIGN", angle: -21 },
  { word: "BUILD", angle: 21 },
  { word: "DELIVER", angle: 68 },
];

const ARC_DOTS = [
  { angle: -43.5 },
  { angle: 0 },
  { angle: 43.5 },
];

const OrbitItem = ({ word, angle, isDot }) => {
  if (isDot) {
    return (
      <div style={{ position: "absolute", left: 0, top: 0, transform: `rotate(${angle}deg)` }}>
        <div style={{
          position: "absolute", left: 0, bottom: "65vh",
          transform: "translate(-50%, 50%)", width: "8px", height: "8px",
          borderRadius: "50%", background: "white",
        }} />
      </div>
    );
  }

  const chars = word.split("");
  const totalChars = chars.length;
  const CHAR_STEP = 4.2;

  return (
    <div style={{ position: "absolute", left: 0, top: 0, transform: `rotate(${angle}deg)` }}>
      {chars.map((char, i) => {
        const charAngle = (i - (totalChars - 1) / 2) * CHAR_STEP;
        return (
          <div key={i} style={{ position: "absolute", left: 0, top: 0, transform: `rotate(${charAngle}deg)` }}>
            <span style={{
              position: "absolute", left: 0, bottom: "65vh",
              transform: "translate(-50%, 50%)",
              /* Mobile: min 1.6rem so words are legible on phones; desktop uses 3.2vw+ */
              fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", fontWeight: 900,
              fontFamily: "'Outfit', 'Inter', sans-serif", color: "#ffffff",
              textTransform: "uppercase", letterSpacing: "0.04em",
              userSelect: "none", whiteSpace: "pre", lineHeight: 1, display: "inline-block",
            }}>
              {char}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Exact replica of Live Project button (pcard-btn-shell → pcard-btn-inner)
// Uses the same animated spinning conic-gradient border from index.css
// ─────────────────────────────────────────────────────────────────────────────
const LiveButton = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ pointerEvents: "auto", zIndex: 9999, position: "relative", textDecoration: "none" }}
    onClick={(e) => e.stopPropagation()}
  >
    <div
      className="pcard-btn-shell"
      style={{ "--ca": "#f97316", "--cb": "#eab308", marginLeft: 0, alignSelf: "flex-start" }}
    >
      <div className="pcard-btn-ring" />
      <span className="pcard-btn-inner">
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="pcard-btn-arrow"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </div>
  </a>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main TransitionBridge Component
// ─────────────────────────────────────────────────────────────────────────────
export const TransitionBridge = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });

  // ── Black arc layer ──────────────────────────────────────────────────────────
  const blackOp = useTransform(smooth, [0.38, 0.48], [1, 0]);
  const arcY = useTransform(smooth, [0.38, 0.52], ["0vh", "-80vh"]);
  const wheelRotation = useTransform(smooth, [0.0, 0.38], [140, 0]);

  // ── SVG Line ────────────────────────────────────────────────────────────────
  const pathLen = useTransform(smooth, [0.38, 0.50], [0, 1]);
  const dotOp = useTransform(smooth, [0.48, 0.52], [0, 1]);

  // ── White Box: Opens → Full → Shrinks back identically to first appearance (and stays) ──
  const boxOp = useTransform(smooth, [0.48, 0.53, 0.96, 1.0], [0, 1, 1, 1]);
  const boxClip = useTransform(
    smooth,
    [0.53, 0.63, 0.88, 0.98],
    [
      "inset(30vh 25vw 30vh 25vw round 16px)",
      "inset(0vh 0vw 0vh 0vw round 0px)",
      "inset(0vh 0vw 0vh 0vw round 0px)",
      "inset(30vh 25vw 30vh 25vw round 16px)",
    ]
  );

  // Quote fades in on open, fades out as box expands, fades back in as box shrinks
  const quoteOp = useTransform(smooth, [0.53, 0.59, 0.90, 0.96], [1, 0, 0, 1]);

  // Content fades in after full expansion, fades out before shrinking
  const contentOp = useTransform(smooth, [0.63, 0.68, 0.84, 0.88], [0, 1, 1, 0]);
  const contentY = useTransform(smooth, [0.63, 0.68, 0.84, 0.88], [20, 0, 0, -20]);

  return (
    <div
      id="education"
      ref={containerRef}
      style={{ height: "600vh", position: "relative", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#000000" }}>

        {/* ── LAYER A: Black background + white line ── */}
        <div className="absolute inset-0 bg-[#000000] pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <motion.path
              d="M 50 -100 C 50 150, 120 280, 200 350 C 230 375, 240 395, 250 400"
              stroke="#ffffff" strokeWidth="4" strokeLinecap="round"
              style={{ pathLength: pathLen }}
            />
            <motion.circle cx="250" cy="400" r="8" fill="#ffffff" style={{ opacity: dotOp }} />
          </svg>
        </div>

        {/* ── LAYER B: Expanding / Closing White Box ── */}
        <motion.div
          className="absolute inset-0 bg-white overflow-hidden"
          style={{ opacity: boxOp, clipPath: boxClip, pointerEvents: "none" }}
        >
          {/* Quote (visible when box is small) */}
          <motion.div
            style={{ opacity: quoteOp }}
            className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none select-none"
          >
            <div className="max-w-xl text-center">
              <p className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black leading-tight mb-4"
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                "FIRST, SOLVE THE PROBLEM. THEN, WRITE THE CODE."
              </p>
              <div className="w-12 h-1 bg-black mx-auto mb-3" />
              <p className="text-xs font-bold tracking-widest text-neutral-600 uppercase">
                — Mindset
              </p>
            </div>
          </motion.div>

          {/* Fullscreen Content */}
          <motion.div
            style={{ opacity: contentOp, y: contentY, pointerEvents: "auto" }}
            className="absolute inset-0 w-full h-full flex flex-col justify-start md:justify-center px-4 md:px-12 pt-14 md:pt-20 pb-6 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto w-full md:scale-95 md:origin-center">
              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start">

                {/* ── LEFT: Education (Minimalist Monochrome Panel) ── */}
                <div className="lg:col-span-5 bg-black p-6 rounded-2xl border border-black space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm">
                      01
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight"
                        style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                        Education
                      </h3>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Academic Qualifications</p>
                    </div>
                  </div>

                  {/* Clean Monochrome Timeline */}
                  <div className="relative pl-6 space-y-5 before:absolute before:inset-y-2 before:left-[11px] before:w-[1px] before:bg-white/20">

                    {/* MCA */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-3.5 w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
                      <div className="p-4 bg-transparent rounded-xl border border-white/10 group-hover:border-white/50 transition-all duration-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-white">MASTER DEGREE</span>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">2024 – Present</span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight leading-snug">Master of Computer Applications (MCA)</h4>
                        <p className="text-[11px] font-semibold text-neutral-400 uppercase">Sikkim Manipal Institute of Technology</p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[10px] font-black text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">CGPA: 8.25</span>
                        </div>
                      </div>
                    </div>

                    {/* BCA */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-3.5 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-150 transition-all duration-300" />
                      <div className="p-4 bg-transparent rounded-xl border border-white/10 group-hover:border-white/50 transition-all duration-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-white">BACHELOR DEGREE</span>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">2021 – 2024</span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight leading-snug">Bachelor of Computer Applications (BCA)</h4>
                        <p className="text-[11px] font-semibold text-neutral-400 uppercase">Techno India University</p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[10px] font-black text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">CGPA: 8.39</span>
                        </div>
                      </div>
                    </div>

                    {/* Class XII */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-3.5 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-150 transition-all duration-300" />
                      <div className="p-4 bg-transparent rounded-xl border border-white/10 group-hover:border-white/50 transition-all duration-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-white">HIGHER SECONDARY</span>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">2021</span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight leading-snug">Class XII (Higher Secondary)</h4>
                        <p className="text-[11px] font-semibold text-neutral-400 uppercase">Maynaguri High School</p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[10px] font-black text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">Percentage: 88.6%</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── RIGHT: Certifications ── */}
                <div className="lg:col-span-7 bg-neutral-100 p-5 rounded-2xl border border-neutral-300 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-neutral-300">
                    <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm">
                      02
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black uppercase tracking-tight"
                        style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                        Certifications
                      </h3>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">&amp; Industry Internships</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

                    {/* Google Internship */}
                    <div className="sm:col-span-2 p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-black transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-neutral-100 border border-neutral-300">INTERNSHIP</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">Apr 2024 – Jun 2024</span>
                      </div>
                      <h4 className="text-sm font-black text-black uppercase tracking-tight">Android Developer Virtual Internship</h4>
                      <p className="text-[11px] font-semibold text-neutral-600 uppercase">Google &amp; AICTE EduSkills</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <LiveButton href="https://g.dev/suvra" label="DEV PROFILE" />
                        <LiveButton href="https://shorturl.at/P1uHq" label="CERTIFICATE" />
                      </div>
                    </div>

                    {/* IBM Full Stack */}
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-black transition-colors space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-neutral-100 border border-neutral-300">IBM CERT</span>
                        <h4 className="text-xs font-black text-black uppercase tracking-tight mt-1">Full Stack Software Developer</h4>
                      </div>
                      <LiveButton href="https://coursera.org/verify/professional-cert/8Y9PV0EKR63Z" label="VERIFY LINK" />
                    </div>

                    {/* IBM Data Science */}
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-black transition-colors space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-neutral-100 border border-neutral-300">IBM CERT</span>
                        <h4 className="text-xs font-black text-black uppercase tracking-tight mt-1">Data Science and AI</h4>
                      </div>
                      <LiveButton href="https://coursera.org/verify/professional-cert/065T6NLP2W6A" label="VERIFY LINK" />
                    </div>

                    {/* Google AI Essentials */}
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-black transition-colors space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-neutral-100 border border-neutral-300">GOOGLE CERT</span>
                        <h4 className="text-xs font-black text-black uppercase tracking-tight mt-1">Google AI Essentials</h4>
                      </div>
                      <LiveButton href="https://coursera.org/verify/specialization/JBYITCAGT3RH" label="VERIFY LINK" />
                    </div>

                    {/* Oracle Java */}
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-black transition-colors space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest font-black uppercase px-2.5 py-0.5 rounded-full text-black bg-neutral-100 border border-neutral-300">ORACLE CERT</span>
                        <h4 className="text-xs font-black text-black uppercase tracking-tight mt-1">Oracle Java Foundation</h4>
                      </div>
                      <LiveButton href="https://coursera.org/verify/IC3KZOA4RFFM" label="VERIFY LINK" />
                    </div>

                    {/* GitHub Repo */}
                    <div className="sm:col-span-2 p-3.5 bg-black rounded-xl border border-black flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight text-white">All Certificates Repository</h4>
                        <p className="text-[10px] font-medium text-neutral-400">Complete verified badges &amp; learning documentation.</p>
                      </div>
                      <LiveButton
                        href="https://github.com/Suvradip01/learning-journey-Suvradip-Certificates-"
                        label="GITHUB REPO"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── LAYER C: Black arc / orbit wheel ── */}
        <motion.div style={{ opacity: blackOp }} className="absolute inset-0 bg-[#000000] pointer-events-none">
          <motion.div style={{ y: arcY }} className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ position: "absolute", left: "50%", top: "95vh", rotate: wheelRotation }}
            >
              {ORBIT_WORDS.map((w) => <OrbitItem key={w.word} {...w} />)}
              {ARC_DOTS.map((d, i) => <OrbitItem key={`dot-${i}`} {...d} isDot />)}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};
