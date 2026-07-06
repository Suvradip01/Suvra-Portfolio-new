import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import TypingText from "./TypingText";



const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const tweenTransition = (delay) => ({
    type: "tween",
    ease: "easeOut",
    duration: 0.8,
    delay,
  });

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={tweenTransition(0.3)}
        >
          Hi I'm <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">Suvradip</span>
        </motion.h1>

        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.5)}
          >
            <TypingText
              words={["An Engineer Who Ships", "A Software Developer", "An ML Practitioner", "A Problem Solver"]}
              className="text-white font-black text-5xl"
              pause={2000}
            />
            <br />  On a Mission to Craft
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.7)}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.9)}
          >
            Applications
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(1.1)}
            className="mt-8"
          >
            <a
              href="/assets/resume.pdf"
              download="Suvradip_Resume.pdf"
              className="relative inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-black transition-all duration-300 bg-white border border-white rounded-full cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:bg-transparent hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={tweenTransition(0.3)}
        >
          Hi, I'm <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">Suvradip</span>
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.5)}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.7)}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(0.9)}
          >
            Applications
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={tweenTransition(1.1)}
            className="mt-6 flex justify-center"
          >
            <a
              href="/assets/resume.pdf"
              download="Suvradip_Resume.pdf"
              className="relative inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-black transition-all duration-300 bg-white border border-white rounded-full cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:bg-transparent hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
