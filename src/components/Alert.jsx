import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";

const Alert = ({ type, text }) => {
  const alertVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.9,
      filter: "blur(6px)",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className="fixed z-50 flex items-center justify-center bottom-6 right-6 will-change-transform will-change-opacity"
          role="alert"
          aria-live="polite"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
        >
          <div
            className={`flex items-center gap-3 backdrop-blur-md text-white shadow-xl shadow-black/20 rounded-2xl px-5 py-3 border border-white/10 ${
              type === "danger"
                ? "bg-gradient-to-r from-red-600 to-red-700"
                : "bg-gradient-to-r from-indigo-500 to-purple-600"
            }`}
          >
            <span
              className={`text-xs font-semibold tracking-wide rounded-full px-2 py-1 ${
                type === "danger"
                  ? "bg-red-500/40 text-red-100"
                  : "bg-white/20 text-white"
              }`}
            >
              {type === "danger" ? "Error" : "Success"}
            </span>
            <p className="text-sm font-medium">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Alert);
