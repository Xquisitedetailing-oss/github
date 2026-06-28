"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { label: "Diensten", href: "#diensten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        {/* Glass pill */}
        <div
          className={`mx-4 md:mx-8 transition-all duration-500 ${
            scrolled
              ? "glass rounded-none border-b border-white/5 -mx-0 rounded-b-none px-6 md:px-10"
              : "glass rounded-full px-6 md:px-10"
          }`}
        >
          <div className="flex items-center justify-between h-14">
            <a href="/" className="flex-shrink-0">
              <Logo size="sm" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="caption text-white/50 hover:text-white transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 caption bg-[#29ABE2] text-black px-5 py-2.5 hover:bg-white transition-all duration-300"
              >
                Offerte
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setOpen(!open)}
                aria-label="menu"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-white origin-center"
                />
                <motion.span
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-px bg-white"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-white origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  onClick={() => setOpen(false)}
                  className="heading-md text-white/80 hover:text-white border-b border-white/5 pb-5"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setOpen(false)}
                className="mt-4 bg-[#29ABE2] text-black font-bold text-lg py-4 text-center"
              >
                Offerte Aanvragen
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
