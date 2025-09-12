import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useMemo } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  // Freeze astronaut props to avoid re-renders
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
      {/* Background Video */}
      <video
        src="/assets/video-stars.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-50"
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/40 -z-40" />

      {/* Hero text */}
      <HeroText />

      {/* 3D astronaut */}
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          camera={{ position: [0, 1, 3] }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut {...astronautProps} />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
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
