import { memo } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

// Skills array stays outside for stable reference
const SKILLS = [
  "c",
  "python",
  "java",
  "csharp",
  "dart",
  "javascript",
  "html5",
  "css3",
  "react",
  "dotnet",
  "flutter",
  "tailwindcss",
  "vitejs",
  "nodejs",
  "git",
  "github",
  "mysql",
  "cisco",
  "microsoft",
  "linux",
  "canva",
  "visualstudiocode",
];

export function Frameworks() {
  const baseDuration = 10;
  const outerDuration = baseDuration + Math.ceil(SKILLS.length / 3);
  const innerDuration = baseDuration + Math.ceil(SKILLS.length / 4);

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      {/* Outer Orbit */}
      <OrbitingCircles iconSize={40} duration={outerDuration}>
        {SKILLS.map((skill, index) => (
          <Icon
            key={`${skill}-${index}`}
            src={`/assets/logos/${skill}.svg`}
            alt={`${skill} logo`}
            size={40}
          />
        ))}
      </OrbitingCircles>

      {/* Inner Orbit */}
      <OrbitingCircles
        iconSize={25}
        radius={100}
        reverse
        speed={2}
        duration={innerDuration}
      >
        {[...SKILLS].reverse().map((skill, index) => (
          <Icon
            key={`${skill}-inner-${index}`}
            src={`/assets/logos/${skill}.svg`}
            alt={`${skill} logo`}
            size={25}
          />
        ))}
      </OrbitingCircles>
    </div>
  );
}

// Optimized Icon component
const Icon = memo(({ src, alt, size = 40 }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    className="rounded-sm transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform"
    onError={(e) => {
      e.currentTarget.src = "/assets/logos/default.svg";
    }}
  />
));
