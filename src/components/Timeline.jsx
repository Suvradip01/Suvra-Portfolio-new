"use client";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [updateHeight]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const smoothHeight = useSpring(heightTransform, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <div className="c-space section-spacing">
      {/* Title block with video background */}
      <div className="relative w-full h-[150px] flex items-center overflow-hidden rounded-xl mb-8">
        <video
          src="/assets/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Title text (left aligned) */}
        <h2 className="relative z-10 text-heading drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] ml-6">
          My Work Experience
        </h2>
      </div>

      <div ref={ref} className="relative pb-20">
        {/* Timeline line */}
        <div
          style={{ height }}
          className="absolute left-1 top-0 w-[2px] overflow-hidden 
           bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
           from-transparent via-neutral-700 to-transparent 
           [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] 
           md:left-1"
        >
          <motion.div
            style={{
              height: smoothHeight,
              opacity: opacityTransform,
              willChange: "height, opacity", // performance hint
              transform: "translateZ(0)",    // force GPU compositing
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full 
            bg-gradient-to-t from-purple-500 via-purple-400/50 to-transparent"
          />
        </div>

        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            {/* Left side (circle + text for big screens) */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 -left-[15px]">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,1)] bg-neutral-900">
                  <div className="w-4 h-4 rounded-full bg-neutral-700" />
                </div>
              </div>

              <div className="hidden md:flex flex-col gap-2 md:pl-20 md:text-4xl text-xl font-bold text-neutral-300">
                <h3 className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,1)]">
                  {item.date}
                </h3>
                <h3 className="text-3xl text-white-500">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            {/* Right side (all contents in ONE box) */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              {/* Mobile header */}
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                  backgroundImage: `url(${item.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="mb-4 rounded-xl border-2 border-purple-500
                 bg-gradient-to-br from-purple-500/10 via-neutral-900/60 to-neutral-800/80
                 p-6 shadow-[0_0_60px_rgba(168,85,247,0.7)]"
              >
                {/* THIS IS THE LINE TO CHANGE. I changed it from bg-black/70 to bg-black/50 */}
                <div className="absolute inset-0 bg-black/50 rounded-xl"></div> 

                {/* Content over the overlay */}
                <div className="relative z-10">
                    {item.contents.map((content, i) => (
                      <p
                        key={i}
                        className="mb-3 font-normal text-neutral-200 flex items-center justify-between"
                        dangerouslySetInnerHTML={{
                          __html: content.replace(
                            /(https?:\/\/[^\s]+)/g,
                            `<a href="$1" target="_blank" rel="noopener noreferrer"
                              class="inline-block px-4 py-2 text-base font-medium
                              text-purple-100 bg-gradient-to-r from-white-900/50 to-purple-800/50
                              rounded-lg shadow-xl border border-purple-500
                              hover:border-purple-500 transition-all duration-300
                              drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] ml-4">
                              Link
                            </a>`
                          ),
                        }}
                      />
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};