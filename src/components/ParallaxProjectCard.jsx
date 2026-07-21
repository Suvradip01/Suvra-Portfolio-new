import React, { useState } from "react";
import { createPortal } from "react-dom";
import ProjectDetails from "./ProjectDetails";

// Each card gets its own colour theme for the conic-gradient border
// The colours are the start / mid / end stops of the rotating gradient
const CARD_COLORS = [
  { a: "#7c3aed", b: "#06b6d4", c: "#7c3aed" }, // purple–cyan
  { a: "#2563eb", b: "#a855f7", c: "#2563eb" }, // blue–purple
  { a: "#06b6d4", b: "#10b981", c: "#06b6d4" }, // cyan–emerald
  { a: "#f59e0b", b: "#ef4444", c: "#f59e0b" }, // amber–red
  { a: "#ec4899", b: "#8b5cf6", c: "#ec4899" }, // pink–violet
];

const ParallaxProjectCard = ({
  id,
  title,
  description,
  subDescription,
  href,
  images,
  tags,
  index,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const num = String(index + 1).padStart(3, "0");
  const { a, b } = CARD_COLORS[index % CARD_COLORS.length];

  // Determine button label
  const isGithub = href && href.includes("github.com");
  const isKaggle = href && href.includes("kaggle.com");
  const btnLabel = isGithub
    ? "VIEW ON GITHUB"
    : isKaggle
    ? "VIEW NOTEBOOK"
    : "LIVE PROJECT";

  // Golden-orange fixed vars for the button ring (always gold, regardless of card theme)
  const btnVars = {
    "--ca": "#f97316",
    "--cb": "#eab308",
  };

  // White glow vars for the explore button ring
  const exploreVars = {
    "--ca": "#ffffff",
    "--cb": "#6b7280",
  };

  // CSS custom properties passed inline — each card gets its unique hue
  const cardVars = {
    "--ca": a,
    "--cb": b,
  };

  return (
    <>
      {/* ── Outer shell: holds the pseudo-element animated border ── */}
      <div className="pcard-shell" style={cardVars}>

        {/* ── Actual card content ── */}
        <div className="pcard-surface">

          {/* ═══ HEADER ROW ═══ */}
          <div className="pcard-header">

            {/* Big bold number */}
            <span className="pcard-num">{num}</span>

            {/* Title only — tech subtitle removed */}
            <div className="pcard-meta">
              <h3 className="pcard-title">{title.toUpperCase()}</h3>
            </div>

            {/* ── Animated-ring CTA button — always golden orange ── */}
            <div className="pcard-btn-shell" style={btnVars}>
              <div className="pcard-btn-ring" />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="pcard-btn-inner"
                onClick={(e) => e.stopPropagation()}
              >
                {btnLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="pcard-btn-arrow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ═══ DIVIDER ═══ */}
          <div className="pcard-divider" />

          {/* ═══ BODY ROW: Mockup ＋ Description ═══ */}
          <div className="pcard-body">

            {/* Browser mockup */}
            <div className="pcard-mockup">
              <div className="pcard-mockup-bar">
                <span className="pcard-dot pcard-dot-r" />
                <span className="pcard-dot pcard-dot-y" />
                <span className="pcard-dot pcard-dot-g" />
              </div>
              <div className="pcard-mockup-screen">
                <img
                  src={(images && images[0]) || "/assets/projects/project1.png"}
                  alt={`${title} screenshot`}
                  loading="lazy"
                  className="pcard-mockup-img"
                />
              </div>
            </div>

            {/* Right: description + tech icons + explore link */}
            <div className="pcard-right">
              <p className="pcard-desc">{description}</p>

              {/* ── Tech SVG icons ── */}
              {tags && tags.length > 0 && (
                <div className="pcard-tags">
                  {tags.map((tag) => (
                    <div key={tag.id} className="pcard-tag">
                      {tag.path && (
                        <img
                          src={tag.path}
                          alt={tag.name}
                          loading="lazy"
                          className="pcard-tag-icon"
                        />
                      )}
                      <span className="pcard-tag-name">{tag.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Explore Details link */}
              <div className="pcard-btn-shell" style={{ ...exploreVars, alignSelf: "flex-start", marginLeft: 0 }}>
                <div className="pcard-btn-ring" />
                <button
                  className="pcard-btn-inner"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  Explore Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="pcard-btn-arrow"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen &&
        createPortal(
          <ProjectDetails
            title={title}
            description={description}
            subDescription={subDescription}
            images={images}
            tags={tags}
            href={href}
            closeModal={() => setIsModalOpen(false)}
          />,
          document.body
        )}
    </>
  );
};

export default ParallaxProjectCard;
