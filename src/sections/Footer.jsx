import { memo } from "react";
import { mySocials } from "../constants";

const Footer = () => {
  return (
    <section
      role="contentinfo"
      className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space"
    >
      {/* Divider */}
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {/* Left side links */}
      <div className="flex gap-3">
        <a
          href="#"
          className="hover:text-white transition-colors will-change-[color]"
        >
          Terms & Conditions
        </a>
        <span>|</span>
        <a
          href="#"
          className="hover:text-white transition-colors will-change-[color]"
        >
          Privacy Policy
        </a>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-6 flex-wrap justify-center">
        {mySocials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors will-change-[color]"
          >
            {/* Icon only – decorative */}
            <img
              src={social.icon}
              alt=""
              className="w-5 h-5 object-contain"
              aria-hidden="true"
              loading="lazy"
            />
            {/* Visible text */}
            <span>{social.name}</span>
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p>© 2025 Suvra. All rights reserved.</p>
    </section>
  );
};

export default memo(Footer);
