// modules/Education.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Responsive card styles using a function to determine values based on screen size
const getCardStyles = (isMobile) => {
  if (isMobile) {
    return [
      {
        borderColor: "rgba(255, 165, 0, 1)", // Orange
        boxShadow: "0 0 50px rgba(255, 165, 0, 1)",
        rotate: "21deg",
        x: "50px", // Reduced for mobile
        y: "20px", // Reduced for mobile
      },
      {
        borderColor: "rgba(138, 43, 226, 1)", // Purple
        boxShadow: "0 0 50px rgba(138, 43, 226, 1)",
        rotate: "14deg",
        x: "30px", // Reduced for mobile
        y: "10px", // Reduced for mobile
      },
      {
        borderColor: "rgba(128, 0, 128, 1)", // Dark Purple
        boxShadow: "0 0 50px rgba(128, 0, 128, 1)",
        rotate: "7deg",
        x: "15px", // Reduced for mobile
        y: "5px", // Reduced for mobile
      },
      {
        borderColor: "rgba(255, 255, 255, 1)", // White
        boxShadow: "0 0 50px rgba(255, 255, 255, 1)",
        rotate: "0deg",
        x: "0px",
        y: "-20px", // Reduced for mobile
      },
    ];
  }
  // Default (desktop) styles
  return [
    {
      borderColor: "rgba(255, 165, 0, 1)",
      boxShadow: "0 0 50px rgba(255, 165, 0, 1)",
      rotate: "21deg",
      x: "80px",
      y: "50px",
    },
    {
      borderColor: "rgba(138, 43, 226, 1)",
      boxShadow: "0 0 50px rgba(138, 43, 226, 1)",
      rotate: "14deg",
      x: "40px",
      y: "30px",
    },
    {
      borderColor: "rgba(128, 0, 128, 1)",
      boxShadow: "0 0 50px rgba(128, 0, 128, 1)",
      rotate: "7deg",
      x: "20px",
      y: "10px",
    },
    {
      borderColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 0 50px rgba(255, 255, 255, 1)",
      rotate: "0deg",
      x: "0px",
      y: "-50px",
    },
  ];
};

const Education = () => {
  const containerRef = useRef(null);
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  const styles = getCardStyles(isMobile);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".edu-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 2,
          pin: true,
        },
      });

      cards.forEach((card, index) => {
        const { x, y, rotate } = styles[index];
        tl.fromTo(
          card,
          { x: isMobile ? 200 : 500, y: 0, opacity: 0 },
          { x, y, opacity: 1, rotate, ease: "power3.out", duration: 1 },
          index * 0.3
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [styles, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🔹 Title */}
      <h2 className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 text-3xl md:text-5xl font-bold text-purple-200 drop-shadow-[0_0_14px_rgba(168,85,247,1)] z-20">
        Education
      </h2>

      {/* 🔹 Cards */}
      <div className="relative z-10 flex items-center justify-center">
        {education.map((edu, index) => {
          const style = styles[education.length - 1 - index];
          return (
            <div
              key={index}
              className="edu-card absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-md"
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "white",
                border: `2px solid ${style.borderColor}`,
                boxShadow: style.boxShadow,
                transform: `translate(${style.x}, ${style.y}) rotate(${style.rotate})`,
              }}
            >
              <img
                src={edu.logo}
                alt={edu.institution}
                className="w-16 h-16 md:w-20 md:h-20 mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold">{edu.degree}</h3>
              <p className="text-sm">{edu.institution}</p>
              <span className="text-xs opacity-80">{edu.date}</span>
              <p className="mt-3 text-sm">{edu.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;