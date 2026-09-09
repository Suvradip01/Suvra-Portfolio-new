import { useRef, useMemo, useState, useEffect } from "react";
import Card from "../components/Card";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import ScrollReveal from "./ScrollReveal";
import { LocationMap } from "../components/LocationMap";
import LiveClock from "../components/LiveClock";

const About = () => {
  const grid2Container = useRef();
  const grid2Ref = useRef();
  const frameworks = useMemo(() => <Frameworks />, []);

  // ⚡ PERF FIX: Lazy-mount the 18 draggable Card components.
  // Framer Motion drag registers live pointer-event listeners + physics on each element.
  // Mounting them unconditionally means 18 drag physics simulations run even when the
  // section is completely off-screen. We only mount when the grid enters the viewport.
  const [cardsVisible, setCardsVisible] = useState(false);
  useEffect(() => {
    const el = grid2Ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollReveal>
      <section className="c-space section-spacing" id="about">
        <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight text-white">
          About Me
        </h2>

        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
          {/* Grid 1 */}
          {/* ⚡ Removed will-change-transform from animate-float image — CSS animations
              manage their own compositor layer; adding will-change creates a second
              conflicting promotion that fights the sticky scroll track. */}
          <div className="flex items-end grid-default-color grid-1 relative overflow-hidden transform-gpu">
            <img
              src="assets/coding-pov.png"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] md:scale-[1.6] lg:scale-[1.7] animate-float transform-gpu"
            />
            {/* ⚡ Removed will-change-transform from animate-slideUp element */}
            <div className="z-10 animate-slideUp transform-gpu">
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

          {/* Grid 2 — skill cards, lazy-mounted */}
          <div
            ref={grid2Ref}
            className="grid-default-color grid-2 grid-2-clock-cutout transform-gpu relative overflow-hidden"
          >
            {/* Background Image */}
            <img
              src="/assets/skillimage.png"
              alt="skills background"
              className="absolute inset-0 w-full h-full object-cover -z-10 opacity-100"
            />
            {/* Dark semi-transparent tint overlay on top of the image */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none -z-10" />
            <div
              ref={grid2Container}
              className="flex items-center justify-center w-full h-full relative z-10"
            >
              {/* ⚡ Only mount draggable cards when section is in view */}
              {cardsVisible && (
                <>
                  {/* Row 1 */}
                  <Card style={{ rotate: "15deg", top: "6%", left: "6%" }} image="/assets/logos/python.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-10deg", top: "7%", left: "22%" }} image="/assets/logos/java.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "5deg", top: "5%", left: "38%" }} image="/assets/logos/javascript.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-15deg", top: "6%", left: "54%" }} image="/assets/logos/c.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "20deg", top: "5%", left: "70%" }} image="/assets/logos/react.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-5deg", top: "8%", left: "86%" }} image="/assets/logos/html5.svg" containerRef={grid2Container} />

                  {/* Row 2 */}
                  <Card style={{ rotate: "12deg", top: "35%", left: "16%" }} image="/assets/logos/css3.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-20deg", top: "33%", left: "32%" }} image="/assets/logos/tailwindcss.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "8deg", top: "36%", left: "47%" }} image="/assets/logos/nodejs.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-8deg", top: "38%", left: "62%" }} image="/assets/logos/expressjs.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "15deg", top: "34%", left: "77%" }} image="/assets/logos/fastapi.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-8deg", top: "38%", left: "91%" }} image="/assets/logos/docker.svg" containerRef={grid2Container} />

                  {/* Row 3 (Adjusted so logos don't overlap the clock cutout) */}
                  <Card style={{ rotate: "-15deg", top: "68%", left: "26%" }} image="/assets/logos/mongodb.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "10deg", top: "70%", left: "40%" }} image="/assets/logos/mysql.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-5deg", top: "68%", left: "54%" }} image="/assets/logos/pytorch.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "25deg", top: "73%", left: "67%" }} image="/assets/logos/tensorflow.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-12deg", top: "70%", left: "80%" }} image="/assets/logos/scikitlearn.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "5deg", top: "72%", left: "92%" }} image="/assets/logos/git.svg" containerRef={grid2Container} />
                </>
              )}
            </div>
          </div>

          {/* Grid 3 — Time Zone */}
          <div className="grid-3 relative overflow-hidden transform-gpu" style={{
            height: "288px",
            padding: 0,
            margin: 0,
            background: "#000000",
            borderRadius: "1rem"
          }}>
            <LocationMap />
            {/* Dark vignette over map */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1050]" />

            {/* Mobile-only clock centered inside card */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center z-[1100] pointer-events-none">
              <LiveClock className="w-full h-full" svgClassName="max-w-[170px] max-h-[170px] drop-shadow-2xl" />
            </div>

            {/* Text Overlay — positioned on top-right in desktop so it doesn't collide with the junction clock */}
            <div className="z-[2000] w-[60%] md:w-[48%] animate-slideUp transform-gpu absolute top-5 right-5 text-right pointer-events-none">
              <p className="headtext text-white-500 drop-shadow-[0_0_10px_rgba(127,90,240,0.5)]">
                Time Zone
              </p>
              <p className="subtext text-xs md:text-sm">
                Operating from Mars, deploying apps across galaxies.
              </p>
            </div>
          </div>

          {/* Grid 4 */}
          <div className="grid-special-color grid-4 flex flex-col items-center justify-center gap-4 transform-gpu">
            {/* ⚡ animate-pulse-gradient paused via CSS body.is-scrolling rule in index.css */}
            <p className="text-center headtext animate-pulse-gradient transform-gpu">
              Ready to code across galaxies? Let&apos;s launch together.
            </p>
            <CopyEmailButton />
          </div>

          {/* Grid 5 */}
          <div className="grid-default-color grid-5 relative overflow-hidden transform-gpu">
            {/* ⚡ Removed will-change-transform from float-animated background image */}
            <img
              src="assets/tech.png"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="absolute inset-0 w-full h-full object-cover scale-[1.1] md:scale-[1.3] lg:scale-[1.4] animate-float transform-gpu -z-10 opacity-55"
            />
            {/* ⚡ Removed will-change-transform from animate-slideUp element */}
            <div className="z-10 w-[50%] animate-slideUp transform-gpu">
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

          {/* ⚡ Floating Live Clock between the 3 cards (Grid 1, Grid 2, Grid 3) matching reference design */}
          <div
            className="hidden md:flex absolute items-center justify-center pointer-events-none z-40"
            style={{
              left: "50%",
              top: "18.5rem",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div id="junction-clock" className="w-[215px] h-[215px] lg:w-[235px] lg:h-[235px] rounded-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] flex items-center justify-center">
              <LiveClock className="w-full h-full" svgClassName="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default About;
