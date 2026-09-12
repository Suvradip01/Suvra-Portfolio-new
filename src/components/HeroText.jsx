import { FlipWords } from "./FlipWords";
import TypingText from "./TypingText";

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        {/* Each hero-line wraps the content so GSAP can clip-reveal it upward */}
        <div className="overflow-hidden">
          <h1
            className="hero-line-inner text-4xl font-medium"
            style={{ transform: "translateY(100%)" }}
          >
            Hi I&apos;m{" "}
            <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              Suvradip
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-start">
          <div className="overflow-hidden">
            <p
              className="hero-line-inner text-5xl font-medium text-neutral-300"
              style={{ transform: "translateY(100%)" }}
            >
              <TypingText
                words={[
                  "An Engineer Who Ships",
                  "A Software Developer",
                  "An ML Practitioner",
                  "A Problem Solver",
                ]}
                className="text-white font-black text-5xl"
                pause={2000}
              />
              <br /> On a Mission to Craft
            </p>
          </div>

          <div className="overflow-hidden">
            <div
              className="hero-line-inner"
              style={{ transform: "translateY(100%)" }}
            >
              <FlipWords words={words} className="font-black text-white text-8xl" />
            </div>
          </div>

          <div className="overflow-hidden">
            <p
              className="hero-line-inner text-4xl font-medium text-neutral-300"
              style={{ transform: "translateY(100%)" }}
            >
              Applications
            </p>
          </div>

          {/* pb-2 gives the glow shadow room so overflow-hidden doesn't clip it */}
          <div className="overflow-hidden mt-8 pb-2">
            <div
              className="hero-line-inner"
              style={{ transform: "translateY(100%)" }}
            >
              <a
                href="/assets/resume.pdf"
                download="Suvradip_Resume.pdf"
                className="relative inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-black transition-all duration-300 bg-white border border-white rounded-full cursor-pointer hover:bg-transparent hover:text-white active:scale-95"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <div className="overflow-hidden">
          <p
            className="hero-line-inner text-4xl font-medium"
            style={{ transform: "translateY(100%)" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              Suvradip
            </span>
          </p>
        </div>
        <div>
          <div className="overflow-hidden">
            <p
              className="hero-line-inner text-5xl font-black text-neutral-300"
              style={{ transform: "translateY(100%)" }}
            >
              Building
            </p>
          </div>
          <div className="overflow-hidden">
            <div
              className="hero-line-inner"
              style={{ transform: "translateY(100%)" }}
            >
              <FlipWords words={words} className="font-bold text-white text-7xl" />
            </div>
          </div>
          <div className="overflow-hidden">
            <p
              className="hero-line-inner text-4xl font-black text-neutral-300"
              style={{ transform: "translateY(100%)" }}
            >
              Applications
            </p>
          </div>

          {/* pb-2 gives the glow shadow room so overflow-hidden doesn't clip it */}
          <div className="overflow-hidden mt-6 pb-2 flex justify-center">
            <div
              className="hero-line-inner"
              style={{ transform: "translateY(100%)" }}
            >
              <a
                href="/assets/resume.pdf"
                download="Suvradip_Resume.pdf"
                className="relative inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-black transition-all duration-300 bg-white border border-white rounded-full cursor-pointer hover:bg-transparent hover:text-white active:scale-95"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
