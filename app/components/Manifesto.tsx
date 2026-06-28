"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const words = [
    { text: "Elk", blue: false },
    { text: "voertuig", blue: false },
    { text: "vertelt", blue: false },
    { text: "een", blue: false },
    { text: "verhaal.", blue: true },
    { text: "Wij", blue: false },
    { text: "zorgen", blue: false },
    { text: "dat", blue: false },
    { text: "het", blue: false },
    { text: "het", blue: false },
    { text: "juiste", blue: true },
    { text: "verhaal", blue: false },
    { text: "is.", blue: false },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#030303]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <motion.div
        style={{ y, opacity }}
        className="max-w-[1200px] mx-auto"
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="line-accent" />
          <span className="caption text-[#29ABE2]">Ons Manifest</span>
        </div>

        <p className="heading-lg flex flex-wrap gap-x-[0.3em] gap-y-1">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className={w.blue ? "text-[#29ABE2]" : "text-white/70"}
            >
              {w.text}
            </motion.span>
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-col sm:flex-row items-start gap-12 border-t border-white/5 pt-12"
        >
          <p className="text-white/35 text-base leading-relaxed max-w-sm">
            Xquisite Car Detailing is geen autowasstraat. Het is een atelier waar
            vakmanschap, tijd en toewijding samenkomen in elk detail.
          </p>
          <p className="text-white/35 text-base leading-relaxed max-w-sm">
            Opgericht in Roden, actief in heel Noord-Nederland. Elke behandeling
            is uniek, elke klant krijgt onze volledige aandacht.
          </p>
          <div className="sm:ml-auto flex-shrink-0">
            <p className="caption text-[#29ABE2] mb-2">Tagline</p>
            <p className="text-white font-bold text-lg italic">
              &ldquo;Waar kwaliteit geen toeval is,<br />maar een keuze.&rdquo;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
