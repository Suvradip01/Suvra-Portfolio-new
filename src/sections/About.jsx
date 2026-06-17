import { useRef, useState, useMemo, useEffect } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import ScrollReveal from "./ScrollReveal";
import { Particles } from "../components/Particles";

const About = () => {
  const grid2Container = useRef();
  const [activeGrid, setActiveGrid] = useState(null);
  const [showGlobe, setShowGlobe] = useState(false);
  const [isTouch, setIsTouch] = useState(false); //  Detect mobile/touch device

  //  Detect touch devices on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  // Lazy-load globe after first render for smoother first paint
  useEffect(() => {
    const timer = setTimeout(() => setShowGlobe(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const frameworks = useMemo(() => <Frameworks />, []);
  const ScrollWrapper = useMemo(() => ScrollReveal, []);
  const globe = useMemo(() => <Globe />, []);

  const glowStyle = useMemo(
    () => ({
      boxShadow: "0 0 40px 10px rgba(127, 90, 240, 0.9)",
      transition: "box-shadow 0s ease-in-out",
      willChange: "box-shadow, transform",
    }),
    []
  );

  //  Reusable handler
  const handleGridEnter = (id) => !isTouch && setActiveGrid(id);
  const handleGridLeave = () => !isTouch && setActiveGrid(null);
  const handleGridClick = (id) => isTouch && setActiveGrid((prev) => (prev === id ? null : id));

  return (
    <ScrollWrapper>
      <section className="c-space section-spacing" id="about">
        <h2 className="text-heading text-white-500 drop-shadow-[0_0_8px_rgba(127,90,240,0.5)]">
          About Me
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
          {/* Grid 1 */}
          <div
            className="flex items-end grid-default-color grid-1 relative overflow-hidden hover:scale-[1.001] transform-gpu"
            style={activeGrid === 1 ? glowStyle : {}}
            onMouseEnter={() => handleGridEnter(1)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(1)} // Tap activates glow
          >
            <img
              src="assets/coding-pov.png"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] md:scale-[1.6] lg:scale-[1.7] animate-float transform-gpu will-change-transform"
            />
            <div className="z-10 animate-slideUp transform-gpu will-change-transform">
              <p className="headtext text-white-500 drop-shadow-[0_0_10px_rgba(127,90,240,0.5)]">
                Hi, I'm Suvradip Ghosh
              </p>
              <p className="subtext">
                Software Developer working across full-stack development and machine learning, with experience in building production
                software and applying modern AI techniques to real-world tasks, from experimentation to deployment and maintenance.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo/50" />
          </div>

          {/* Grid 2 */}
          <div
            className="grid-default-color grid-2 hover:scale-[1.001] transform-gpu relative overflow-hidden"
            style={activeGrid === 2 ? glowStyle : {}}
            onMouseEnter={() => handleGridEnter(2)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(2)}
          >
            {/* Background Video from Contact section */}
            <video
              src="/assets/cont-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover -z-10 opacity-100"
            />
            {/* Dark semi-transparent tint overlay on top of the video */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none -z-10" />
            <div
              ref={grid2Container}
              className="flex items-center justify-center w-full h-full relative z-10"
            >
              {/* Row 1 */}
              <Card style={{ rotate: "15deg", top: "5%", left: "5%" }} image="/assets/logos/python.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-10deg", top: "8%", left: "22%" }} image="/assets/logos/java.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "5deg", top: "4%", left: "40%" }} image="/assets/logos/javascript.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-15deg", top: "6%", left: "58%" }} image="/assets/logos/c.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "20deg", top: "5%", left: "76%" }} image="/assets/logos/react.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-5deg", top: "10%", left: "90%" }} image="/assets/logos/html5.svg" containerRef={grid2Container} />

              {/* Row 2 */}
              <Card style={{ rotate: "12deg", top: "40%", left: "8%" }} image="/assets/logos/css3.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-20deg", top: "35%", left: "26%" }} image="/assets/logos/tailwindcss.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "8deg", top: "38%", left: "44%" }} image="/assets/logos/nodejs.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-8deg", top: "42%", left: "62%" }} image="/assets/logos/expressjs.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "15deg", top: "35%", left: "80%" }} image="/assets/logos/fastapi.svg" containerRef={grid2Container} />

              {/* Row 3 */}
              <Card style={{ rotate: "-15deg", top: "72%", left: "5%" }} image="/assets/logos/mongodb.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "10deg", top: "70%", left: "22%" }} image="/assets/logos/mysql.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-5deg", top: "68%", left: "40%" }} image="/assets/logos/pytorch.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "25deg", top: "74%", left: "58%" }} image="/assets/logos/tensorflow.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-12deg", top: "70%", left: "74%" }} image="/assets/logos/scikitlearn.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "5deg", top: "73%", left: "88%" }} image="/assets/logos/git.svg" containerRef={grid2Container} />
              <Card style={{ rotate: "-8deg", top: "40%", left: "92%" }} image="/assets/logos/docker.svg" containerRef={grid2Container} />
            </div>
          </div>

          {/* Grid 3 */}
          <div
            className="grid-black-color grid-3 relative overflow-hidden hover:scale-[1.001] transform-gpu"
            style={activeGrid === 3 ? glowStyle : {}}
            onMouseEnter={() => handleGridEnter(3)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(3)}
          >
            <div className="z-10 w-[50%] animate-slideUp transform-gpu will-change-transform">
              <p className="headtext text-white-500 drop-shadow-[0_0_10px_rgba(127,90,240,0.5)]">
                Time Zone
              </p>
              <p className="subtext">
                Operating from Mars, deploying apps across galaxies.
              </p>
            </div>
            {showGlobe && (
              <figure className="absolute left-[30%] top-[10%] animate-spin-slow transform-gpu will-change-transform">
                {globe}
              </figure>
            )}
          </div>

          {/* Grid 4 */}
          <div
            className="grid-special-color grid-4 flex flex-col items-center justify-center gap-4 hover:scale-[1.001] transform-gpu"
            style={activeGrid === 4 ? glowStyle : {}}
            onMouseEnter={() => handleGridEnter(4)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(4)}
          >
            <p className="text-center headtext animate-pulse-gradient transform-gpu">
              Ready to code across galaxies? Let's launch together.
            </p>
            <CopyEmailButton className="hover:scale-105 transition-transform duration-200 transform-gpu" />
          </div>

          {/* Grid 5 */}
          <div
            className="grid-default-color grid-5 relative overflow-hidden hover:scale-[1.001] transform-gpu"
            style={activeGrid === 5 ? glowStyle : {}}
            onMouseEnter={() => handleGridEnter(5)}
            onMouseLeave={handleGridLeave}
            onClick={() => handleGridClick(5)}
          >
            <img
              src="assets/tech.png"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="absolute inset-0 w-full h-full object-cover scale-[1.1] md:scale-[1.3] lg:scale-[1.4] animate-float transform-gpu -z-10 opacity-55"
            />
            <div className="z-10 w-[50%] animate-slideUp transform-gpu will-change-transform">
              <p className="headText text-white-500 drop-shadow-[0_0_10px_rgba(127,90,240,0.5)]">
                Tech Stack
              </p>
              <p className="subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications.
              </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125 transform-gpu">
              {frameworks}
            </div>
          </div>
        </div>
      </section>
    </ScrollWrapper>
  );
};

export default About;
