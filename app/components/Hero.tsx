"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const chars = "XQUISITE".split("");

function SplitHeading() {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } },
          hidden: {},
        }}
        className="heading-xl text-white flex flex-wrap"
      >
        {"Wij behandelen".split("").map((c, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
            className={c === " " ? "mr-[0.25em]" : ""}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.9 } },
          hidden: {},
        }}
        className="heading-xl flex flex-wrap"
      >
        {"uw auto met".split("").map((c, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
            className={`${c === " " ? "mr-[0.25em]" : ""} text-white/30`}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.04, delayChildren: 1.1 } },
          hidden: {},
        }}
        className="heading-xl flex flex-wrap"
      >
        {"obsessieve precisie.".split("").map((c, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
            className={`${c === " " ? "mr-[0.25em]" : ""} text-[#29ABE2]`}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden bg-black noise">
      {/* Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-2000 ${
            videoLoaded ? "opacity-35" : "opacity-0"
          }`}
        />
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20" />
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div
            className="absolute left-0 right-0 h-px bg-white"
            style={{ animation: "scan-line 8s linear infinite" }}
          />
        </div>
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#29ABE2] to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="line-accent" />
            <span className="caption text-[#29ABE2]">
              Roden · Groningen · Friesland · Drenthe
            </span>
          </motion.div>

          {/* Main headline */}
          <SplitHeading />

          {/* Sub + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <p className="text-white/40 text-base max-w-sm leading-relaxed">
              Waar kwaliteit geen toeval is, maar een keuze. Premium autodetailing op het hoogste niveau.
            </p>
            <div className="flex items-center gap-4 flex-shrink-0">
              <a
                href="#contact"
                className="group relative overflow-hidden bg-[#29ABE2] text-black font-bold caption px-8 py-4 flex items-center gap-2 hover:bg-white transition-colors duration-300"
              >
                <span>Afspraak Maken</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#diensten"
                className="caption text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                Pakketten
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-3 md:grid-cols-4 gap-px bg-white/5 max-w-2xl"
        >
          {[
            { n: "500", suffix: "+", label: "Voertuigen" },
            { n: "5.0", suffix: "★", label: "Google Score" },
            { n: "7", suffix: "+", label: "Jaar Ervaring" },
            { n: "100", suffix: "%", label: "Tevredenheid" },
          ].map((s) => (
            <div key={s.label} className="glass px-5 py-4">
              <p className="text-white font-black text-2xl leading-none">
                {s.n}
                <span className="text-[#29ABE2]">{s.suffix}</span>
              </p>
              <p className="caption text-white/30 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#29ABE2] to-transparent" />
        <span className="caption text-white/20 [writing-mode:vertical-lr]">scroll</span>
      </motion.div>
    </section>
  );
}
