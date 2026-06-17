import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ProjectDetails from "./ProjectDetails";
import { motion, AnimatePresence } from "motion/react";

const Project = ({
  title,
  description,
  subDescription,
  href,
  images,
  tags,
  index,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  
  // Spotlight Glow state
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  
  // 3D Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Theme Palette
  const themes = [
    { name: "purple", spotlight: "rgba(168, 85, 247, 0.25)", border: "hover:border-purple-500/40", text: "group-hover:text-purple-400", textGrad: "group-hover:from-purple-400 group-hover:to-pink-400", accent: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
    { name: "blue", spotlight: "rgba(59, 130, 246, 0.25)", border: "hover:border-blue-500/40", text: "group-hover:text-blue-400", textGrad: "group-hover:from-blue-400 group-hover:to-cyan-400", accent: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
    { name: "orange", spotlight: "rgba(249, 115, 22, 0.25)", border: "hover:border-orange-500/40", text: "group-hover:text-orange-400", textGrad: "group-hover:from-orange-400 group-hover:to-red-400", accent: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
    { name: "pink", spotlight: "rgba(236, 72, 153, 0.25)", border: "hover:border-pink-500/40", text: "group-hover:text-pink-400", textGrad: "group-hover:from-pink-400 group-hover:to-purple-400", accent: "bg-pink-500/10 text-pink-300 border-pink-500/20" },
    { name: "cyan", spotlight: "rgba(6, 182, 212, 0.25)", border: "hover:border-cyan-500/40", text: "group-hover:text-cyan-400", textGrad: "group-hover:from-cyan-400 group-hover:to-blue-400", accent: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
  ];
  const theme = themes[index % themes.length];

  const handleMouseMove = (e) => {
    if (isModalOpen || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y });

    // 3D Tilt calculation (max 8 degrees tilt)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (centerY - y) / 25;
    const tiltY = (x - centerX) / 25;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const imageCount = images ? images.length : 0;

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        className={`relative flex flex-col w-full h-full overflow-hidden rounded-3xl group cursor-pointer border border-white/5 bg-[#050508]/80 backdrop-blur-xl transition-all duration-700 shadow-2xl ${theme.border} hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
        style={{
          transform: isModalOpen ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Glowing Ambient Spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{
            background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, ${theme.spotlight}, transparent 80%)`,
          }}
        />

        {/* Top: Browser Mockup Frame (Visual Polish) with 3D Depth */}
        <div 
          className="relative w-full z-10 flex flex-col bg-black/40 border-b border-white/5 transition-transform duration-500"
          style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)", transformStyle: "preserve-3d" }}
        >
          {/* macOS window dots */}
          <div className="flex items-center px-5 py-3.5">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative w-full aspect-video bg-neutral-950/20 flex items-center justify-center overflow-hidden px-4 pb-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black/40 border border-white/10 shadow-inner group-hover:border-white/20 transition-colors duration-500">
              <img
                src={(images && images[0]) || "/assets/projects/project1.png"}
                alt={`${title} cover screenshot`}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Subtle glassmorphism gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

              {/* Image count badge */}
              {imageCount > 1 && (
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/70 border border-white/10 rounded-full px-2.5 py-1 text-[11px] text-neutral-300 backdrop-blur-md font-medium shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span>{imageCount} photos</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div 
          className="relative z-10 flex flex-col flex-grow p-6 justify-between bg-gradient-to-b from-transparent to-black/40 transition-transform duration-500"
          style={{ transform: isHovered ? "translateZ(40px)" : "translateZ(0px)" }}
        >
          <div>
            {/* Tech Stack Glowing Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-neutral-300 bg-white/5 border border-white/5 rounded-full hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  {tag.path && <img src={tag.path} alt={tag.name} className="w-4 h-4" />}
                  <span>{tag.name}</span>
                </div>
              ))}
            </div>

            {/* Title with Gradient Text hover effect */}
            <h3 className={`text-2xl font-extrabold text-white mb-3 tracking-wide transition-all duration-500 bg-gradient-to-r from-white to-white bg-clip-text group-hover:text-transparent ${theme.textGrad}`}>
              {title}
            </h3>

            {/* Description */}
            <p className="text-neutral-400 text-sm line-clamp-3 mb-5 leading-relaxed font-light group-hover:text-neutral-300 transition-colors duration-500">
              {description}
            </p>
          </div>

          {/* Interactive Button */}
          <div className={`flex items-center gap-2 font-semibold text-sm transition-colors duration-500 ${theme.text} text-neutral-400`}>
            <span>Explore Details</span>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && createPortal(
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          images={images}
          tags={tags}
          href={href}
          closeModal={() => setIsModalOpen(false)}
        />,
        document.body
      )}
    </>
  );
};

export default Project;