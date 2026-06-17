import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  images,
  tags,
  href,
  closeModal,
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const hasMultipleImages = images && images.length > 1;

  // Auto-slideshow inside the modal — cycles every 4 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;
    setCurrentImgIdx(0);
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen p-4 md:p-8 bg-black/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col border shadow-2xl rounded-3xl bg-gradient-to-b from-[#0a0a0f] to-[#040406] border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button: Styled to be bright white and highly visible */}
        <button
          onClick={closeModal}
          className="absolute z-40 p-2.5 rounded-full top-5 right-5 bg-white/10 hover:bg-white/20 transition-all border border-white/25 text-white cursor-pointer hover:scale-105 flex items-center justify-center shadow-lg"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Top: Header Banner Section */}
        <div className="px-6 pt-8 pb-4 border-b border-white/5 relative bg-gradient-to-r from-purple-500/5 to-transparent">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold">Project Spotlight</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">{title}</h2>
          </div>
        </div>

        {/* Middle: Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 overflow-hidden flex-grow">
          
          {/* Left Column: Image Viewer (Col 7) */}
          <div className="lg:col-span-7 relative bg-black/50 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-white/5 min-h-[260px] md:min-h-[360px]">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-neutral-950/40 p-2 aspect-video">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIdx}
                  src={(images && images[currentImgIdx]) || "/assets/projects/project1.png"}
                  alt={`${title} screenshot ${currentImgIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                />
              </AnimatePresence>

              {hasMultipleImages && (
                <>
                  {/* Arrows */}
                  <button
                    onClick={() => setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/70 border border-white/10 text-white hover:bg-purple-600/30 hover:border-purple-500/30 transition-all z-30 cursor-pointer hover:scale-105"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/70 border border-white/10 text-white hover:bg-purple-600/30 hover:border-purple-500/30 transition-all z-30 cursor-pointer hover:scale-105"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  {/* Progress Line */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-1 z-30 bg-black/60 p-2 rounded-full border border-white/5 backdrop-blur-md justify-between items-center max-w-max mx-auto px-4">
                    <div className="flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImgIdx(idx)}
                          className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                            idx === currentImgIdx ? "bg-purple-500 w-5" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Project Info (Col 5) - Layout split to keep tech stack and link pinned at the bottom */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-hidden h-full">
            <div className="overflow-y-auto pr-2 flex-grow custom-scrollbar mb-4">
              <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">Overview</h4>
              <p className="mb-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-light">
                {description}
              </p>

              <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">Key Highlights</h4>
              <div className="relative h-[180px] overflow-hidden rounded-xl bg-black/10">
                <style>{`
                  @keyframes marquee-vertical {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                  }
                  .animate-marquee-vertical-projects {
                    animation: marquee-vertical 24s linear infinite;
                  }
                  .animate-marquee-vertical-projects:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                
                {/* Visual fading masks at top/bottom */}
                <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#040406] to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee-vertical-projects flex flex-col gap-2.5 py-2">
                  {[...subDescription, ...subDescription].map((subDesc, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 text-xs md:text-sm text-neutral-400 hover:text-white transition-colors duration-300 p-2.5 border border-white/[0.01] bg-white/[0.005] rounded-lg"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                      <p className="leading-relaxed font-light">{subDesc}</p>
                    </div>
                  ))}
                  {/* Mathematical spacer matching gap-2.5 to eliminate looping jump */}
                  <div className="h-2.5 flex-shrink-0" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex-shrink-0 bg-[#040406]/30">
              <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <div 
                    key={tag.id} 
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300 rounded-lg text-xs text-neutral-300"
                  >
                    {tag.path && <img src={tag.path} alt={tag.name} className="w-3.5 h-3.5" />}
                    <span>{tag.name}</span>
                  </div>
                ))}
              </div>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm rounded-2xl bg-purple-600 text-white hover:bg-purple-500 transition-all duration-300 shadow-xl shadow-purple-600/10 hover:translate-y-[-2px] cursor-pointer"
              >
                <span>{href.includes("kaggle.com") ? "View Kaggle Notebook" : href.includes("github.com") ? "View Source Repository" : "View Live Project"}</span>
                <img src="/assets/arrow-up.svg" className="w-3.5 h-3.5 invert" alt="arrow" />
              </a>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
