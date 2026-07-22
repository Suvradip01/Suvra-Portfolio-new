import { useState, useMemo } from "react";
import { motion } from "motion/react";

function Navigation() {
  //  Memoize nav items so they don't recreate on every render
  const navItems = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Education", href: "#education" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <ul className="nav-ul flex gap-6 text-white font-medium">
      {navItems.map((item) => (
        <li key={item.name} className="nav-li relative group">
          <a
            href={item.href}
            className="nav-link relative z-10 px-1 py-0.5 transition-colors duration-200 ease-in-out hover:text-[#00ffff]"
          >
            {item.name}
          </a>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#7b00ff] transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed inset-x-0 top-0 z-50 w-full pt-3 px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="relative mx-auto max-w-7xl px-6 py-2.5 rounded-2xl overflow-hidden border border-white shadow-2xl transition-all duration-300" style={{ minHeight: '80px', background: 'black' }}>

          {/* Blackhole Video Background inside Navbar Pill */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <video
              src="/assets/blackhole.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="
    absolute
    left-1/2
    top-100%
    w-full
    h-[700px]
    object-cover
    -translate-x-1/2
    -translate-y-1/2
    scale-[0.5]
    transform-gpu
    will-change-transform
  "
            />
          </div>

          <div className="flex items-center justify-between relative z-10">

            {/* Brand */}
            <a
              href="#home"
              className="text-xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300"
            >
              Suvradip
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex cursor-pointer text-neutral-300 hover:text-white focus:outline-none sm:hidden"
            >
              <img
                src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                className="w-6 h-6"
                alt="toggle"
                loading="lazy"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex">
              <Navigation />
            </nav>
          </div>
        </div>

        {/* Mobile Navigation (Optimized Animation) */}
        {isOpen && (
          <motion.div
            className="block overflow-hidden text-center sm:hidden bg-black/70"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }} // Shorter animation = smoother feel
          >
            <nav className="pb-5">
              <Navigation />
            </nav>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
