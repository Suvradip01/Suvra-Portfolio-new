import { useState, useCallback, useRef } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, AnimatePresence } from "motion/react";

const Projects = () => {
  const [preview, setPreview] = useState(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const [cursorStyle, setCursorStyle] = useState({ left: 0, top: 0 });

  // Efficient mouse tracking (throttled with requestAnimationFrame)
  const handleMouseMove = useCallback((e) => {
    cursorPos.current = { x: e.clientX + 20, y: e.clientY + 20 };
    requestAnimationFrame(() => {
      setCursorStyle({ left: cursorPos.current.x, top: cursorPos.current.y });
    });
  }, []);

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative flex flex-col py-40 px-4 sm:flex-row sm:justify-between sm:items-stretch gap-10"
    >
      {/* Left side: heading + projects */}
      <div className="flex-1 flex flex-col max-w-4xl w-full">
        <h2 className="text-heading text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
          My Selected Projects
        </h2>

        {/* Divider below heading */}
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px]" />

        {/* Projects List */}
        <div className="flex flex-col gap-10 mt-10">
          {myProjects.map((project) => (
            <div key={project.id} className="w-full">
              <Project {...project} setPreview={setPreview} />
              <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Right side: video */}
      <div className="flex-shrink-0 w-full sm:w-[300px] lg:w-[580px] mt-15">
        <video
          src="/assets/proj.mp4"
          autoPlay
          loop
          muted
          className="rounded-xl shadow-lg object-cover w-full h-95"
        />
      </div>

      {/* Hover Preview */}
      <AnimatePresence>
        {preview && (
          <motion.img
            key={preview}
            src={preview}
            className="fixed z-50 object-cover h-56 w-80 rounded-lg shadow-lg pointer-events-none will-change-transform will-change-opacity"
            style={cursorStyle}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;