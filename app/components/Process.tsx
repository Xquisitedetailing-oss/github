"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Intake & Inspectie",
    body: "Elk voertuig wordt bij aankomst volledig geïnspecteerd. Elke kras, vlek en imperfectie wordt gedocumenteerd. Zo beginnen wij met een helder beeld en een transparant plan.",
    detail: "Paint thickness meting · Fotodocumentatie · Persoonlijk behandelplan",
  },
  {
    num: "02",
    title: "Voorbereiding",
    body: "Grondige handwas, ontvetting en clay bar decontaminatie. Wij beginnen het eigenlijke werk altijd op een volledig schone, onbesmette lakondergrond.",
    detail: "Handwas · Iron remover · Clay bar · IPA decontaminatie",
  },
  {
    num: "03",
    title: "Behandeling",
    body: "De afgesproken behandeling wordt uitgevoerd met professionele apparatuur en topproducten. Van interieur extractie tot machinaal polijsten — elke stap telt.",
    detail: "Professional grade producten · Machinale behandeling · Tijdregistratie",
  },
  {
    num: "04",
    title: "Eindcontrole & Levering",
    body: "Uitgebreide eindcontrole onder professionele LED-verlichting. U ontvangt een behandelrapport en persoonlijk nazorgadvies voordat uw auto wordt teruggegeven.",
    detail: "LED-inspectie · Behandelrapport · Nazorgadvies · Tevredenheidsgarantie",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="werkwijze" ref={ref} className="bg-black py-24 md:py-36 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Werkwijze</span>
            </div>
            <h2 className="heading-lg text-white">
              Hoe wij<br />
              <span className="text-white/25">te werk gaan</span>
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs">
            Elk voertuig, elke keer dezelfde hoge standaard. Geen uitzonderingen.
          </p>
        </div>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5 hidden md:block">
            <motion.div className="w-full bg-[#29ABE2] origin-top" style={{ height: lineH }} />
          </div>

          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="grid md:grid-cols-[40px_1fr] gap-8 pb-16"
              >
                {/* Dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 border border-[#29ABE2]/30 bg-black flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-[#29ABE2] font-black text-xs">{s.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="border border-white/5 p-8 hover:border-[#29ABE2]/20 transition-colors duration-500 group">
                  <p className="caption text-[#29ABE2] mb-3 md:hidden">{s.num}</p>
                  <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-[#29ABE2] transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-white/40 text-base leading-relaxed mb-5">{s.body}</p>
                  <div className="flex flex-wrap gap-3">
                    {s.detail.split(" · ").map((d) => (
                      <span key={d} className="caption text-white/20 glass px-3 py-1.5">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
