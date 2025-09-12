import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const getCardStyles = (isMobile) => {
  if (isMobile) {
    return [
      { borderColor: "rgba(255, 165, 0, 1)", boxShadow: "0 0 20px rgba(255, 165, 0, 0.8)", rotate: "21deg", x: "50px", y: "20px" },
      { borderColor: "rgba(138, 43, 226, 1)", boxShadow: "0 0 20px rgba(138, 43, 226, 0.8)", rotate: "14deg", x: "30px", y: "10px" },
      { borderColor: "rgba(128, 0, 128, 1)", boxShadow: "0 0 20px rgba(128, 0, 128, 0.8)", rotate: "7deg", x: "15px", y: "5px" },
      { borderColor: "rgba(255, 255, 255, 1)", boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)", rotate: "0deg", x: "0px", y: "-20px" },
    ];
  }
  return [
    { borderColor: "rgba(255, 165, 0, 1)", boxShadow: "0 0 50px rgba(255, 165, 0, 1)", rotate: "21deg", x: "80px", y: "50px" },
    { borderColor: "rgba(138, 43, 226, 1)", boxShadow: "0 0 50px rgba(138, 43, 226, 1)", rotate: "14deg", x: "40px", y: "30px" },
    { borderColor: "rgba(128, 0, 128, 1)", boxShadow: "0 0 50px rgba(128, 0, 128, 1)", rotate: "7deg", x: "20px", y: "10px" },
    { borderColor: "rgba(255, 255, 255, 1)", boxShadow: "0 0 50px rgba(255, 255, 255, 1)", rotate: "0deg", x: "0px", y: "-50px" },
  ];
};

const Education = () => {
  const containerRef = useRef(null);
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const styles = getCardStyles(isMobile);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".edu-card");

      if (isMobile) {
        // Mobile: animate cards one by one
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { x: 100, y: 0, opacity: 0 },
            {
              x: styles[index].x,
              y: styles[index].y,
              rotate: styles[index].rotate,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.3, // stagger sequentially
              ease: "power2.out",
            }
          );
        });
      } else {
        // Desktop: keep original timeline & pin
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
            { x: 500, y: 0, opacity: 0 },
            { x, y, opacity: 1, rotate, ease: "power3.out", duration: 1 },
            index * 0.3
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [styles, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <h2 className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 text-3xl md:text-5xl font-bold text-purple-200 drop-shadow-[0_0_14px_rgba(168,85,247,1)] z-20">
        Education
      </h2>

      <div className="relative z-10 flex items-center justify-center">
        {education.map((edu, index) => {
          const style = styles[education.length - 1 - index];
          return (
            <div
              key={index}
              className="edu-card absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center backdrop-blur-md"
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "white",
                border: `2px solid ${style.borderColor}`,
                boxShadow: style.boxShadow,
                transform: `translate(${style.x}, ${style.y}) rotate(${style.rotate})`,
                willChange: "transform, opacity",
              }}
            >
              <img
                src={edu.logo}
                alt={edu.institution}
                className="w-14 h-14 md:w-20 md:h-20 mb-3 md:mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold">{edu.degree}</h3>
              <p className="text-sm">{edu.institution}</p>
              <span className="text-xs opacity-80">{edu.date}</span>
              <p className="mt-2 md:mt-3 text-sm">{edu.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
