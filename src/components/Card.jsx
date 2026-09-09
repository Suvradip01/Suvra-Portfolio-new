import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useCallback } from "react";

const Card = ({ style, text, image, containerRef }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const checkCollision = useCallback((isDragging = false) => {
    if (!cardRef.current) return;
    const clockEl = document.getElementById("junction-clock");
    if (!clockEl) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const clockRect = clockEl.getBoundingClientRect();

    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const clockCenterX = clockRect.left + clockRect.width / 2;
    const clockCenterY = clockRect.top + clockRect.height / 2;

    const clockRadius = clockRect.width / 2;
    const cardRadius = Math.max(cardRect.width, cardRect.height) / 2;
    // Clearance buffer so card bounces before touching the clock wall
    const minDist = clockRadius + cardRadius + 14;

    const dx = cardCenterX - clockCenterX;
    const dy = cardCenterY - clockCenterY;
    const dist = Math.hypot(dx, dy);

    if (dist < minDist && dist > 0) {
      const nx = dx / dist;
      const ny = dy / dist;

      if (isDragging) {
        // While dragging: hard boundary prevents entering the clock wall
        const overlap = minDist - dist;
        x.set(x.get() + nx * overlap);
        y.set(y.get() + ny * overlap);
      } else {
        // On release: spring bounce back into the card area
        const bounceDist = minDist - dist + 32;
        animate(x, x.get() + nx * bounceDist, {
          type: "spring",
          stiffness: 450,
          damping: 20,
          bounce: 0.6,
        });
        animate(y, y.get() + ny * bounceDist, {
          type: "spring",
          stiffness: 450,
          damping: 20,
          bounce: 0.6,
        });
      }
    }
  }, [x, y]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkCollision(false);
    }, 120);
    return () => clearTimeout(timer);
  }, [checkCollision]);

  const combinedStyle = {
    ...style,
    x,
    y,
  };

  return image && !text ? (
    <motion.img
      ref={cardRef}
      className="absolute w-15 cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      src={image}
      style={combinedStyle}
      whileHover={{ scale: 1.08 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
      onDrag={() => checkCollision(true)}
      onDragEnd={() => checkCollision(false)}
    />
  ) : (
    <motion.div
      ref={cardRef}
      className="absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={combinedStyle}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
      onDrag={() => checkCollision(true)}
      onDragEnd={() => checkCollision(false)}
    >
      {text}
    </motion.div>
  );
};

export default Card;
