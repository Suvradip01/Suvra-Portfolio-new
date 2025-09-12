import { useRef, useState, useMemo } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import ScrollReveal from "./ScrollReveal"; // keeps one-time reveal

const About = () => {
  const grid2Container = useRef();
  const [activeGrid, setActiveGrid] = useState(null);

  // Freeze heavy components so they don’t re-render
  const globe = useMemo(() => <Globe />, []);
  const frameworks = useMemo(() => <Frameworks />, []);
  const ScrollWrapper = useMemo(() => ScrollReveal, []);

  // Glow style (no change)
  const glowStyle = {
    boxShadow: "0 0 40px 10px rgba(127, 90, 240, 0.9)",
    transition: "box-shadow 0s ease-in-out",
    willChange: "box-shadow, transform",
  };

  return (
    <ScrollWrapper>
      <section className="c-space section-spacing" id="about">
        <h2 className="text-heading text-white-500 drop-shadow-[0_0_10px_rgba(127,90,240,1)]">
          About Me
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
          {/* Grid 1 */}
          <div
            className="flex items-end grid-default-color grid-1 relative overflow-hidden hover:scale-[1.001] transform-gpu"
            style={activeGrid === 1 ? glowStyle : {}}
            onMouseEnter={() => setActiveGrid(1)}
            onMouseLeave={() => setActiveGrid(null)}
          >
            <img
              src="assets/coding-pov.png"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] md:scale-[1.6] lg:scale-[1.7] animate-float transform-gpu"
            />

            <div className="z-10 animate-slideUp transform-gpu">
              <p className="headtext text-white-500 drop-shadow-[0_0_15px_rgba(127,90,240,1)]">
                Hi, I'm Suvradip Ghosh
              </p>
              <p className="subtext">
                A developer driven by curiosity, passionate about web and
                crafting software solutions. I enjoy creating dynamic apps while
                diving deeper into AI and Data Science to build future-ready
                solutions.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo/50" />
          </div>

          {/* Grid 2 */}
          <div
            className="grid-default-color grid-2 hover:scale-[1.001] transform-gpu"
            style={activeGrid === 2 ? glowStyle : {}}
            onMouseEnter={() => setActiveGrid(2)}
            onMouseLeave={() => setActiveGrid(null)}
          >

            {/* Background Image */}
            <img
              src="assets/undo.png"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover scale-[1.1] md:scale-[1.3] lg:scale-[1.4] animate-float transform-gpu -z-10 opacity-65"
            />
            <div
              ref={grid2Container}
              className="flex items-center justify-center w-full h-full relative"
            >

              {/* Cards */}
              <Card style={{ rotate: "15deg", top: "10%", left: "8%" }} image="assets/logos/java.png" containerRef={grid2Container} className="hover:scale-110 transition-transform duration-300 transform-gpu" />
              <Card style={{ rotate: "-15deg", top: "10%", left: "50%" }} image="assets/logos/c.png" containerRef={grid2Container} className="hover:scale-110 transition-transform duration-300 transform-gpu" />
              <Card style={{ rotate: "30deg", top: "70%", left: "40%" }} image="assets/logos/python.png" containerRef={grid2Container} className="hover:scale-110 transition-transform duration-300 transform-gpu" />
              <Card style={{ rotate: "-10deg", top: "70%", left: "80%" }} image="assets/logos/vscode.png" containerRef={grid2Container} className="hover:scale-110 transition-transform duration-300 transform-gpu" />
              <Card style={{ rotate: "1deg", top: "20%", left: "30%" }} image="assets/logos/intelij.png" containerRef={grid2Container} className="hover:scale-110 transition-transform duration-300 transform-gpu" />
            </div>
          </div>

          {/* Grid 3 */}
          <div
            className="grid-black-color grid-3 relative overflow-hidden hover:scale-[1.001] transform-gpu"
            style={activeGrid === 3 ? glowStyle : {}}
            onMouseEnter={() => setActiveGrid(3)}
            onMouseLeave={() => setActiveGrid(null)}
          >
            <div className="z-10 w-[50%] animate-slideUp transform-gpu">
              <p className="headtext text-white-500 drop-shadow-[0_0_15px_rgba(127,90,240,1)]">
                Time Zone
              </p>
              <p className="subtext">
                Operating from Mars, deploying apps across galaxies.
              </p>
            </div>
            <figure className="absolute left-[30%] top-[10%] animate-spin-slow transform-gpu">
              {globe}
            </figure>
          </div>

          {/* Grid 4 */}
          <div
            className="grid-special-color grid-4 flex flex-col items-center justify-center gap-4 hover:scale-[1.001] transform-gpu"
            style={activeGrid === 4 ? glowStyle : {}}
            onMouseEnter={() => setActiveGrid(4)}
            onMouseLeave={() => setActiveGrid(null)}
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
            onMouseEnter={() => setActiveGrid(5)}
            onMouseLeave={() => setActiveGrid(null)}
          >
            <img
              src="assets/tech.png"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover scale-[1.1] md:scale-[1.3] lg:scale-[1.4] animate-float transform-gpu -z-10 opacity-55"
            />

            <div className="z-10 w-[50%] animate-slideUp transform-gpu">
              <p className="headText text-white-500 drop-shadow-[0_0_15px_rgba(127,90,240,1)]">
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
