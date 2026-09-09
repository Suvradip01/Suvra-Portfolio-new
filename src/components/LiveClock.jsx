import { useEffect, useRef, useId } from "react";

export function LiveClock({ className = "", svgClassName = "" }) {
  const containerRef = useRef(null);
  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let isVisible = true;

    const updateClock = () => {
      if (!isVisible) return;

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
      const minuteAngle = (minutes + seconds / 60 + milliseconds / 60000) * 6;
      const secondAngle = (seconds + milliseconds / 1000) * 6;

      if (hourHandRef.current) {
        hourHandRef.current.setAttribute("transform", `rotate(${hourAngle})`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute("transform", `rotate(${minuteAngle})`);
      }
      if (secondHandRef.current) {
        secondHandRef.current.setAttribute("transform", `rotate(${secondAngle})`);
      }

      animationFrameId = requestAnimationFrame(updateClock);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          animationFrameId = requestAnimationFrame(updateClock);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    animationFrameId = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // 12 hour numbers positioned along radius = 168
  const numbers = [
    { num: "12", x: 0, y: -168 },
    { num: "1", x: 84, y: -145.5 },
    { num: "2", x: 145.5, y: -84 },
    { num: "3", x: 168, y: 0 },
    { num: "4", x: 145.5, y: 84 },
    { num: "5", x: 84, y: 145.5 },
    { num: "6", x: 0, y: 168 },
    { num: "7", x: -84, y: 145.5 },
    { num: "8", x: -145.5, y: 84 },
    { num: "9", x: -168, y: 0 },
    { num: "10", x: -145.5, y: -84 },
    { num: "11", x: -84, y: -145.5 },
  ];

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center relative select-none pointer-events-none ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className={`w-full h-full overflow-visible ${svgClassName}`}
      >
        <defs>
          {/* Bezel Metallic Gradient - Angle reflection */}
          <linearGradient id={`${id}_bezel_metal`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#D2D6DC" />
            <stop offset="50%" stopColor="#9AA2AF" />
            <stop offset="75%" stopColor="#DCE0E6" />
            <stop offset="100%" stopColor="#8A92A0" />
          </linearGradient>

          {/* Bezel Radial Depth Gradient */}
          <radialGradient id={`${id}_bezel_ring`} cx="48%" cy="46%" r="52%">
            <stop offset="85%" stopColor="#F5F7FA" />
            <stop offset="92%" stopColor="#CBD0D8" />
            <stop offset="97%" stopColor="#8E96A4" />
            <stop offset="100%" stopColor="#555A64" />
          </radialGradient>

          {/* Deep Dial Face with Subtle Radial Center Glow */}
          <radialGradient id={`${id}_dial_face`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E2024" />
            <stop offset="55%" stopColor="#141518" />
            <stop offset="88%" stopColor="#0B0C0E" />
            <stop offset="100%" stopColor="#060708" />
          </radialGradient>

          {/* Center Hub Metal Gradient */}
          <linearGradient id={`${id}_hub_metal`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C4C8D0" />
            <stop offset="70%" stopColor="#8C93A0" />
            <stop offset="100%" stopColor="#5B626E" />
          </linearGradient>

          {/* Hand Drop Shadow for 3D Floating Effect */}
          <filter id={`${id}_hand_shadow`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.75" />
          </filter>

          {/* Dial Inset Shadow */}
          <filter id={`${id}_dial_shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.9" />
          </filter>

          {/* Reusable Minor Tick (Minute) */}
          <line
            id={`${id}_minor_tick`}
            x1="0"
            y1="-222"
            x2="0"
            y2="-214"
            stroke="#6B7280"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Reusable Major Tick (Hour) */}
          <rect
            id={`${id}_major_tick`}
            x="-2.5"
            y="-224"
            width="5"
            height="15"
            rx="1.5"
            fill="#FFFFFF"
          />
        </defs>

        <g transform="translate(250, 250)">
          {/* 1. Outer Dark Edge Casing */}
          <circle r="248" fill="#121316" stroke="#050505" strokeWidth="2" />

          {/* 2. Distinct Shiny Brushed Silver / Chrome Bezel Ring */}
          <circle
            r="244"
            fill={`url(#${id}_bezel_ring)`}
            stroke={`url(#${id}_bezel_metal)`}
            strokeWidth="3"
          />

          {/* 3. Inner Bezel Metallic Highlight Ridge */}
          <circle r="231" fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1" />
          <circle r="227" fill="#0C0D10" stroke="#000000" strokeWidth="1.5" />

          {/* 4. Deep Charcoal Dial Face with Inner Depth */}
          <circle
            r="225"
            fill={`url(#${id}_dial_face)`}
            filter={`url(#${id}_dial_shadow)`}
          />

          {/* 5. Minute / Second Ticks (60 marks) */}
          <g>
            {[
              6, 12, 18, 24, 36, 42, 48, 54, 66, 72, 78, 84, 96, 102, 108, 114,
              126, 132, 138, 144, 156, 162, 168, 174, 186, 192, 198, 204, 216,
              222, 228, 234, 246, 252, 258, 264, 276, 282, 288, 294, 306, 312,
              318, 324, 336, 342, 348, 354,
            ].map((angle) => (
              <use
                key={angle}
                href={`#${id}_minor_tick`}
                transform={`rotate(${angle})`}
              />
            ))}
          </g>

          {/* 6. Major Hour Markers (12 marks) */}
          <g>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle) => (
                <use
                  key={angle}
                  href={`#${id}_major_tick`}
                  transform={`rotate(${angle})`}
                />
              )
            )}
          </g>

          {/* 7. Numbers 1–12 (Clean, bold, modern typography) */}
          <g
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', sans-serif"
            fontSize="25"
            fontWeight="700"
            fill="#FFFFFF"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {numbers.map(({ num, x, y }) => (
              <text key={num} x={x} y={y}>
                {num}
              </text>
            ))}
          </g>

          {/* 8. Hands (Modern Swiss Baton Watch Hands) */}
          <g>
            {/* Hour Hand: Solid white baton with rounded corners */}
            <g
              id="hour-hand"
              ref={hourHandRef}
              style={{ willChange: "transform" }}
              transform="rotate(0)"
              filter={`url(#${id}_hand_shadow)`}
            >
              <rect
                x="-7.5"
                y="-120"
                width="15"
                height="138"
                rx="7.5"
                fill="#FFFFFF"
              />
              <rect
                x="-1.5"
                y="-114"
                width="3"
                height="100"
                rx="1.5"
                fill="#F3F4F6"
                opacity="0.9"
              />
            </g>

            {/* Minute Hand: Sleek white baton reaching to outer ticks */}
            <g
              id="minute-hand"
              ref={minuteHandRef}
              style={{ willChange: "transform" }}
              transform="rotate(0)"
              filter={`url(#${id}_hand_shadow)`}
            >
              <rect
                x="-5.5"
                y="-178"
                width="11"
                height="200"
                rx="5.5"
                fill="#FFFFFF"
              />
              <rect
                x="-1.2"
                y="-172"
                width="2.4"
                height="150"
                rx="1.2"
                fill="#F3F4F6"
                opacity="0.9"
              />
            </g>

            {/* Second Hand: Elegant high-visibility needle with counterweight */}
            <g
              id="second-hand"
              ref={secondHandRef}
              style={{ willChange: "transform" }}
              transform="rotate(0)"
              filter={`url(#${id}_hand_shadow)`}
            >
              {/* Long needle pointing outward */}
              <line
                x1="0"
                y1="40"
                x2="0"
                y2="-192"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Counterweight dot on the tail */}
              <circle cx="0" cy="28" r="5.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* 9. Center Hub (Concentric Metallic Rings) */}
          <g filter={`url(#${id}_hand_shadow)`}>
            <circle
              r="17"
              fill={`url(#${id}_hub_metal)`}
              stroke="#FFFFFF"
              strokeWidth="0.75"
            />
            <circle r="12" fill="#14161B" stroke="#333842" strokeWidth="0.75" />
            <circle r="8" fill={`url(#${id}_bezel_ring)`} />
            <circle r="4" fill="#FFFFFF" stroke="#8A92A0" strokeWidth="0.5" />
            <circle r="1.5" fill="#4B5260" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default LiveClock;
