"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Interieur Detailing",
    sub: "Van binnen onberispelijk",
    description:
      "Vacuüm, diepreiniging, extractie, lederbehandeling en geursanering. Drie niveaus: Standaard, Deluxe, Premium.",
    detail:
      "Elk oppervlak van uw interieur — van stuurwiel tot dakhemel — wordt behandeld met professionele producten en de precisie die uw auto verdient.",
    from: "€ 89,95",
    href: "/pakketten/interieur",
    image: "PLACEHOLDER: interieur detailing foto — luxe auto interieur na behandeling",
  },
  {
    num: "02",
    title: "Exterieur Detailing",
    sub: "Buitenkant in perfectie",
    description:
      "Handwas, clay bar decontaminatie, sealant en wax. Uw lak beschermd en stralend.",
    detail:
      "Van basis handwas tot premium carnauba wax behandeling. Elke behandeling begint met een grondige decontaminatie voor een perfect resultaat.",
    from: "€ 94,95",
    href: "/pakketten/exterieur",
    image: "PLACEHOLDER: exterieur foto — glanzende lak close-up",
  },
  {
    num: "03",
    title: "Combi Pakketten",
    sub: "Compleet verzorgd",
    description:
      "Interieur én exterieur in één behandeling. Ons meest gekozen aanbod.",
    detail:
      "Het volledige pakket in één dag. Binnen én buiten tot in de puntjes behandeld. De meest efficiënte keuze voor totaalverzorging.",
    from: "€ 149,95",
    href: "/pakketten/combi",
    image: "PLACEHOLDER: combi behandeling foto — auto in atelier",
    highlight: true,
  },
  {
    num: "04",
    title: "Lakcorrectie",
    sub: "Krassen & swirls weg",
    description:
      "Deluxe, Premium en Signature lakcorrectie. Éénstaps tot driestaps polijsten.",
    detail:
      "Machinaal polijsten verwijdert swirl marks, krassen en oxidatie. Het resultaat: een diepte en glans alsof de auto net de fabriek verlaat.",
    from: "€ 449,95",
    href: "/pakketten/lakcorrectie",
    image: "PLACEHOLDER: polijsten in actie — machine op lak",
  },
  {
    num: "05",
    title: "Keramische Coating",
    sub: "Jarenlange bescherming",
    description:
      "Hydrofobe nano-coating voor 2–5 jaar bescherming, UV-wering en glasachtige glans.",
    detail:
      "De ultieme lakbescherming. Altijd voorafgegaan door professionele lakcorrectie. Inclusief certificaat en garantie.",
    from: "Op aanvraag",
    href: "/pakketten/coating",
    image: "PLACEHOLDER: waterdruppels op gecoate lak — hydrofobisch effect",
  },
];

export default function ServicesNew() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="diensten" className="bg-black py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Diensten</span>
            </div>
            <h2 className="heading-lg text-white">Wat wij doen</h2>
          </div>
          <a
            href="/pakketten"
            className="caption text-white/30 hover:text-white flex items-center gap-2 transition-colors duration-300"
          >
            Alle pakketten & prijzen
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 border border-white/5">
          {/* Left: service list */}
          <div className="border-r border-white/5">
            {services.map((s, i) => (
              <motion.button
                key={s.num}
                onClick={() => setActive(i)}
                className={`w-full text-left p-7 border-b border-white/5 flex items-center gap-6 group transition-all duration-300 ${
                  active === i ? "bg-[#29ABE2]/5" : "hover:bg-white/2"
                }`}
              >
                <span
                  className={`text-xs font-bold transition-colors duration-300 ${
                    active === i ? "text-[#29ABE2]" : "text-white/20 group-hover:text-white/40"
                  }`}
                >
                  {s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bold text-lg transition-colors duration-300 ${
                      active === i ? "text-white" : "text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-white/25 text-sm mt-0.5">{s.sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`caption transition-colors duration-300 ${
                      active === i ? "text-[#29ABE2]" : "text-white/20"
                    }`}
                  >
                    {s.from}
                  </span>
                  <motion.div
                    animate={{ x: active === i ? 0 : -4, opacity: active === i ? 1 : 0 }}
                    className="w-4 h-px bg-[#29ABE2]"
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col"
            >
              {/* Image placeholder */}
              <div className="relative flex-1 min-h-[260px] lg:min-h-[320px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#29ABE2]/5 to-transparent" />
                <div className="text-center px-8 py-10">
                  <div className="w-16 h-16 border border-[#29ABE2]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#29ABE2]/40 font-black text-2xl">{current.num}</span>
                  </div>
                  <p className="caption text-white/20 text-center">[PLACEHOLDER FOTO]</p>
                  <p className="text-white/20 text-xs mt-2 max-w-xs mx-auto">{current.image}</p>
                </div>
                {/* Badge */}
                {current.highlight && (
                  <div className="absolute top-4 right-4 bg-[#29ABE2] text-black caption px-3 py-1.5">
                    Meest Gekozen
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="p-8 flex flex-col gap-4 border-t border-white/5">
                <div>
                  <p className="caption text-[#29ABE2] mb-2">{current.sub}</p>
                  <h3 className="text-white font-bold text-2xl">{current.title}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{current.detail}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="caption text-white/20 mb-1">Vanaf</p>
                    <p className="text-white font-black text-2xl">{current.from}</p>
                  </div>
                  <a
                    href={current.href}
                    className="caption bg-white/5 hover:bg-[#29ABE2] text-white hover:text-black border border-white/10 hover:border-[#29ABE2] px-6 py-3 flex items-center gap-2 transition-all duration-300"
                  >
                    Bekijk pakketten
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
