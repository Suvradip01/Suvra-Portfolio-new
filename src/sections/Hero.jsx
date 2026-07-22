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
