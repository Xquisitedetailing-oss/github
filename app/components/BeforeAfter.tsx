"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const cases = [
  {
    title: "BMW 5 Serie",
    service: "Lakcorrectie + Keramische Coating",
    before: "PLACEHOLDER: BMW 5 voor behandeling — matte lak met swirl marks",
    after: "PLACEHOLDER: BMW 5 na behandeling — diepe glanzende lak",
  },
  {
    title: "Mercedes E-Klasse",
    service: "Premium Combi Pakket",
    before: "PLACEHOLDER: Mercedes voor — smerig interieur + dof exterieur",
    after: "PLACEHOLDER: Mercedes na — spiksplinternieuw interieur & exterieur",
  },
  {
    title: "Porsche 911",
    service: "Signature Correction Package",
    before: "PLACEHOLDER: Porsche voor — krassen & oxidatie op lak",
    after: "PLACEHOLDER: Porsche na — showroom finish",
  },
];

function Slider({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] select-none cursor-col-resize overflow-hidden bg-black"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) update(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) update(e.touches[0].clientX); }}
    >
      {/* Before */}
      <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="caption text-white/15 mb-2">Voor</p>
          <p className="text-white/15 text-xs max-w-[180px]">{before}</p>
        </div>
      </div>

      {/* After — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#29ABE2]/10 to-[#050505] flex items-center justify-center">
          <div className="text-center p-6">
            <p className="caption text-[#29ABE2]/50 mb-2">Na</p>
            <p className="text-[#29ABE2]/30 text-xs max-w-[180px]">{after}</p>
          </div>
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-px h-full bg-[#29ABE2]/60" />
        <div className="absolute w-10 h-10 bg-black border-2 border-[#29ABE2] rounded-full flex items-center justify-center shadow-lg shadow-[#29ABE2]/20">
          <svg className="w-4 h-4 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 z-20 caption glass px-2 py-1 text-white/50">Voor</span>
      <span className="absolute bottom-3 right-3 z-20 caption bg-[#29ABE2]/80 text-black px-2 py-1">Na</span>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);

  return (
    <section id="portfolio" className="bg-[#030303] py-24 md:py-36 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Portfolio</span>
            </div>
            <h2 className="heading-lg text-white">Voor &amp; Na</h2>
          </div>
          <p className="text-white/30 text-sm max-w-sm">
            Sleep de schuifregelaar om het verschil te zien. Echte projectfoto&apos;s
            worden toegevoegd zodra ze beschikbaar zijn.
          </p>
        </div>

        {/* Case selector */}
        <div className="flex gap-1 mb-6">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`caption px-4 py-2.5 transition-all duration-200 border ${
                active === i
                  ? "bg-[#29ABE2] text-black border-[#29ABE2]"
                  : "text-white/30 border-white/10 hover:border-white/30 hover:text-white/60"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Slider before={cases[active].before} after={cases[active].after} />
        </motion.div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">{cases[active].title}</p>
            <p className="text-white/30 text-sm">{cases[active].service}</p>
          </div>
          <a
            href="#contact"
            className="caption text-[#29ABE2] hover:text-white flex items-center gap-2 transition-colors"
          >
            Zelfde resultaat voor uw auto?
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
