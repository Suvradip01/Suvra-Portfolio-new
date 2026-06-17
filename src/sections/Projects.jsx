import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "motion/react";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative flex flex-col py-32 px-4 md:px-8 items-center w-full"
    >
      <div className="max-w-7xl w-full flex flex-col items-center">
        {/* Reverted Heading Style */}
        <div className="w-full flex flex-col mb-10">
          <h2 className="text-heading text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] text-left w-full">
            My Selected Projects
          </h2>
          {/* Divider below heading */}
          <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px] w-full" />
        </div>

        {/* Balanced wrapping flex container to avoid empty space */}
        <div className="flex flex-wrap justify-center gap-8 w-full items-stretch">
          {myProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] flex animate-fade-in"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.215, 0.610, 0.355, 1.000] }}
              >
                <Project {...project} index={index} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
