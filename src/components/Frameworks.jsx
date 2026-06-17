import { memo } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

// Skills array grouped by tier for logical distribution
const OUTER_SKILLS = [
  "javascript",
  "html5",
  "css3",
  "react",
  "tailwindcss",
  "vitejs",
  "canva",
  "visualstudiocode",
  "flutter",
  "dart",
];

const MIDDLE_SKILLS = [
  "nodejs",
  "expressjs",
  "fastapi",
  "mysql",
  "mongodb",
  "docker",
  "git",
  "github",
  "linux",
  "dotnet",
];

const INNER_SKILLS = [
  "python",
  "java",
  "c",
  "pytorch",
  "tensorflow",
  "scikitlearn",
  "opencv",
  "csharp",
];

export function Frameworks() {
  return (
    <div className="relative flex h-[18rem] w-full flex-col items-center justify-center">
      {/* Outer Orbit — radius 155, duration reduced to 24s for faster speed */}
      <OrbitingCircles iconSize={36} radius={155} duration={24}>
        {OUTER_SKILLS.map((skill, index) => (
          <Icon
            key={`${skill}-outer-${index}`}
            src={`/assets/logos/${skill}.svg`}
            alt={`${skill} logo`}
            size={36}
          />
        ))}
      </OrbitingCircles>

      {/* Middle Orbit — radius 105, duration reduced to 18s for faster speed, reverse */}
      <OrbitingCircles iconSize={30} radius={105} duration={18} reverse>
        {MIDDLE_SKILLS.map((skill, index) => (
          <Icon
            key={`${skill}-mid-${index}`}
            src={`/assets/logos/${skill}.svg`}
            alt={`${skill} logo`}
            size={30}
          />
        ))}
      </OrbitingCircles>

      {/* Inner Orbit — radius 55, duration reduced to 12s for faster speed */}
      <OrbitingCircles iconSize={24} radius={55} duration={12}>
        {INNER_SKILLS.map((skill, index) => (
          <Icon
            key={`${skill}-inner-${index}`}
            src={`/assets/logos/${skill}.svg`}
            alt={`${skill} logo`}
            size={24}
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

