"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const showcases = [
  { label: "Lakcorrectie", sub: "BMW 5 Serie" },
  { label: "Keramische Coating", sub: "Mercedes E-Klasse" },
  { label: "Interieur Detailing", sub: "Audi Q5" },
];

function Slider({ label, sub }: { label: string; sub: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos((x / rect.width) * 100);
  }, []);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] overflow-hidden bg-[#111] cursor-col-resize select-none"
        onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
        onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => updatePos(e.touches[0].clientX)}
        onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      >
        {/* Before */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 border-2 border-white/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white/20 text-sm tracking-widest uppercase">Voor</p>
          </div>
        </div>

        {/* After (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 to-[#0044BB]/20" />
          <div className="text-center relative z-10">
            <div className="w-16 h-16 mx-auto mb-3 border-2 border-[#0066FF]/40 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#0066FF]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <p className="text-[#0066FF]/60 text-sm tracking-widest uppercase">Na</p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#0066FF] z-10"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center shadow-lg shadow-[#0066FF]/40">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="bg-black/70 text-white/60 text-xs px-2 py-1 tracking-wider uppercase">Voor</span>
        </div>
        <div className="absolute bottom-3 right-3 z-20">
          <span className="bg-[#0066FF]/80 text-white text-xs px-2 py-1 tracking-wider uppercase">Na</span>
        </div>
      </div>

      <div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-white/40 text-sm">{sub}</p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-black py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
              Resultaten
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
            Voor & Na
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Sleep de schuifregelaar om het verschil zelf te zien. Binnenkort voegen
            wij echte projectfoto&apos;s toe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcases.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Slider label={s.label} sub={s.sub} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
