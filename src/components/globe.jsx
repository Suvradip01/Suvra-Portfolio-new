"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 500;

const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  onRender: () => { },
  devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.25) : 1,
  phi: 0,
  theta: 0.15,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 8000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = canvasRef.current.offsetWidth || 400;

    let isVisible = true;
    let isTabVisible = true;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvasRef.current);

    let globeInstance = null;

    try {
      globeInstance = createGlobe(canvasRef.current, {
        ...GLOBE_CONFIG,
        width: Math.round(width * 1.2),
        height: Math.round(width * 1.2),
        onRender: (state) => {
          if (!isVisible || !isTabVisible) return;
          if (!pointerInteracting.current) phi += 0.008;
          state.phi = phi + rs.get();
        },
      });
      globeRef.current = globeInstance;
    } catch (err) {
      console.warn("WebGL initialization skipped:", err);
    }

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      if (globeInstance) {
        try {
          globeInstance.destroy();
        } catch (_) {}
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []); //  Run ONCE on mount to prevent WebGL Context Loss

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px] transform-gpu contain-strict",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[26rem] max-w-full opacity-0 transition-opacity duration-500 transform-gpu [contain:layout_paint_size] touch-pan-y"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            pointerInteracting.current = e.touches[0].clientX;
            updatePointerInteraction(e.touches[0].clientX);
          }
        }}
        onTouchEnd={() => updatePointerInteraction(null)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX);
          }
        }}
      />
    </div>
  );
}
