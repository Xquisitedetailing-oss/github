"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { label: "Behandelde voertuigen", end: 500, suffix: "+", decimals: 0 },
  { label: "Google beoordeling", end: 5.0, suffix: " ★", decimals: 1 },
  { label: "Jaar ervaring", end: 7, suffix: "+", decimals: 0 },
  { label: "Tevredenheidspercentage", end: 100, suffix: "%", decimals: 0 },
  { label: "Actieve servicegebieden", end: 3, suffix: "", decimals: 0 },
];

export default function StatsBar() {
  return (
    <section className="border-t border-b border-white/5 bg-[#050505] py-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#050505] px-8 py-8"
            >
              <p className="text-white font-black text-4xl md:text-5xl leading-none mb-2">
                <AnimatedCounter
                  end={s.end}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="caption text-white/25">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
