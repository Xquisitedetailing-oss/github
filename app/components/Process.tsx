"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Intake & Inspectie",
    description:
      "Wij beginnen met een grondige inspectie van uw voertuig. Elke kras, vlek en imperfectie wordt gedocumenteerd zodat we het juiste plan van aanpak kunnen opstellen.",
  },
  {
    number: "02",
    title: "Voorbereiding",
    description:
      "Het voertuig wordt zorgvuldig voorbereid: handwas, ontvetting en clay bar behandeling. Zo begint het eigenlijke werk op een perfect schone ondergrond.",
  },
  {
    number: "03",
    title: "Behandeling",
    description:
      "De afgesproken behandeling wordt met professionele producten en machines uitgevoerd. Van lakcorrectie tot coating applicatie — elk detail telt.",
  },
  {
    number: "04",
    title: "Eindcontrole",
    description:
      "Na de behandeling voert onze detailer een uitgebreide eindcontrole uit onder professionele verlichting. Pas bij volledige tevredenheid leveren wij uw auto terug.",
  },
];

export default function Process() {
  return (
    <section id="werkwijze" className="bg-[#050505] py-28 px-6 border-t border-white/5">
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
              Onze Werkwijze
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
            Van intake tot<br />perfecte aflevering
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Transparantie en vakmanschap staan centraal in alles wat wij doen. Zo werkt
            het proces bij X-quisite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 border border-white/5 group hover:bg-[#0066FF]/3 transition-all duration-300"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 right-0 w-px h-8 bg-[#0066FF]/20 translate-x-px z-10" />
              )}

              <div className="text-[#0066FF] font-black text-5xl mb-6 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                {step.number}
              </div>

              <div className="w-8 h-0.5 bg-[#0066FF] mb-4" />

              <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
        >
          {[
            { value: "500+", label: "Behandelde Voertuigen" },
            { value: "5.0", label: "Google Beoordeling" },
            { value: "7+", label: "Jaar Ervaring" },
            { value: "100%", label: "Tevredenheidsgarantie" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0a0a0a] p-8 text-center">
              <p className="text-[#0066FF] font-black text-4xl mb-2">{stat.value}</p>
              <p className="text-white/40 text-sm uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
