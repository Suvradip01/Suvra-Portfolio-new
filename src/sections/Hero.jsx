import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import { Astronaut } from "../components/Astronaut";
import { Float, Preload } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useMemo, useState, useEffect } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [showCanvas, setShowCanvas] = useState(!isMobile);

  //  Delay loading 3D Canvas on mobile (to prevent lag during first paint)
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setShowCanvas(true), 200); // load after 0.5s
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const astronautProps = useMemo(
    () => ({
      scale: isMobile ? 0.23 : undefined,
      position: isMobile ? [0, -1.5, 0] : undefined,
    }),
    [isMobile]
  );

  return (
    <section
      id="home"
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      {/* Background Video (cont-bg.mp4) */}
      <div className="blackhole-box">
        <video
          src="/assets/cont-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="pointer-events-none select-none"
        />
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 -z-40" />

      {/* Vertical Sidebar Nav (Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center pointer-events-auto">
        <div className="flex flex-col items-center">
          {[
            {
              name: "GITHUB",
              href: "https://github.com/Suvradip01",
              icon: "/assets/socials/github.svg",
            },
            {
              name: "LINKEDIN",
              href: "https://www.linkedin.com/in/suvradip01/",
              icon: "/assets/socials/linkedIn.svg",
            },
            {
              name: "EMAIL",
              href: "mailto:suvrawork03@gmail.com",
              icon: "/assets/socials/email.svg",
            },
          ].map((item, index, arr) => (
            <div key={item.name} className="flex flex-col items-center">
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="
                  group
                  flex
                  flex-col
                  items-center
                  gap-2.5
                  transition-all
                  duration-300
                  hover:scale-110
                "
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-5 h-5 object-contain transition-transform duration-300"
                />
                <span
                  className="
                    uppercase
                    [writing-mode:vertical-lr]
                    rotate-180
                    text-[12px]
                    font-semibold
                    tracking-[0.35em]
                    text-white
                    transition-all
                    duration-300
                  "
                  style={{
                    textShadow:
                      "0 0 8px rgba(255,255,255,0.9), 0 0 18px rgba(255,255,255,0.45)",
                  }}
                >
                  {item.name}
                </span>
              </a>

              {/* Connector Line */}
              {index !== arr.length - 1 && (
                <div className="w-px h-10 my-4 bg-white/40" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero text */}
      <HeroText />

      {/* Load 3D astronaut only when ready */}
      {showCanvas && (
        <figure
          className="absolute inset-0"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas
            camera={{ position: [0, 1, 3] }}
            dpr={isMobile ? [1, 1.2] : [1, 1.5]}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
            }}
          >
            <Suspense fallback={<Loader />}>
              <Float speed={isMobile ? 0.5 : 1}> {/* slower animation on mobile */}
                <Astronaut {...astronautProps} />
              </Float>
              {!isMobile && <Rig />} {/*  disable camera movement on mobile */}
              <Preload all />
            </Suspense>
          </Canvas>
        </figure>
      )}
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;