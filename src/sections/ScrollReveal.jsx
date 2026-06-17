import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const hasRevealed = useRef(false); //  Prevent redundant state updates

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          //  RequestAnimationFrame ensures smooth paint
          requestAnimationFrame(() => setIsVisible(true));
          obs.unobserve(entry.target); // reveal only once
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -5% 0px", //  Reveal a bit earlier for smoother effect
        threshold: 0.05, //  Lower threshold = less work on mobile
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect(); //  Proper cleanup
    };
  }, []);

  const initialStyles = "opacity-0 translate-y-6 scale-[0.97]";
  const finalStyles = "opacity-100 translate-y-0 scale-100";
  const transitionStyles =
    "transition-all duration-700 ease-out transform-gpu will-change-transform will-change-opacity";

  return (
    <div
      ref={elementRef}
      className={`${className} ${transitionStyles} ${isVisible ? finalStyles : initialStyles
        }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
