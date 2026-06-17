import { useRef } from "react";

// All tech stack logos with names
const techStack = [
  { name: "Python",       logo: "/assets/logos/python.svg" },
  { name: "JavaScript",   logo: "/assets/logos/javascript.svg" },
  { name: "Java",         logo: "/assets/logos/java.svg" },
  { name: "C",            logo: "/assets/logos/c.svg" },
  { name: "React.js",     logo: "/assets/logos/react.svg" },
  { name: "HTML5",        logo: "/assets/logos/html5.svg" },
  { name: "CSS3",         logo: "/assets/logos/css3.svg" },
  { name: "Tailwind CSS", logo: "/assets/logos/tailwindcss.svg" },
  { name: "Node.js",      logo: "/assets/logos/nodejs.svg" },
  { name: "Express.js",   logo: "/assets/logos/expressjs.svg" },
  { name: "FastAPI",      logo: "/assets/logos/fastapi.svg" },
  { name: "MongoDB",      logo: "/assets/logos/mongodb.svg" },
  { name: "MySQL",        logo: "/assets/logos/mysql.svg" },
  { name: "PyTorch",      logo: "/assets/logos/pytorch.svg" },
  { name: "TensorFlow",   logo: "/assets/logos/tensorflow.svg" },
  { name: "Scikit-learn", logo: "/assets/logos/scikitlearn.svg" },
  { name: "OpenCV",       logo: "/assets/logos/opencv.svg" },
  { name: "Docker",       logo: "/assets/logos/docker.svg" },
  { name: "Git",          logo: "/assets/logos/git.svg" },
  { name: "GitHub",       logo: "/assets/logos/github.svg" },
  { name: "VS Code",      logo: "/assets/logos/visualstudiocode.svg" },
];

// Single logo pill
const LogoPill = ({ name, logo }) => (
  <div className="flex items-center gap-3 px-5 py-3 mx-3 rounded-2xl
    bg-white/[0.04] border border-white/[0.08]
    hover:border-purple-500/40 hover:bg-purple-500/5
    transition-all duration-300 group flex-shrink-0 cursor-default select-none"
  >
    <img
      src={logo}
      alt={name}
      className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
    />
    <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
      {name}
    </span>
  </div>
);

// One row of the marquee — duplicates items for seamless loop
const MarqueeRow = ({ items, reverse = false, speed = 35 }) => {
  // Duplicate 3× for smooth infinite feel
  const repeated = [...items, ...items, ...items];
  const duration = `${speed}s`;

  return (
    <div className="flex overflow-hidden relative w-full">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#080010] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#080010] to-transparent pointer-events-none" />

      <div
        className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: duration }}
      >
        {repeated.map((item, i) => (
          <LogoPill key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
};

const TechMarquee = () => {
  // Split stack into two rows
  const row1 = techStack.slice(0, 11);
  const row2 = techStack.slice(11);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold text-center">
          Technologies I work with
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} reverse={false} speed={40} />
        <MarqueeRow items={row2} reverse={true}  speed={32} />
      </div>
    </section>
  );
};

export default TechMarquee;
