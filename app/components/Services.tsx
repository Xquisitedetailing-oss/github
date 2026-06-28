"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const packages = [
  {
    id: "interieur",
    title: "Interieur Detailing",
    subtitle: "Van binnen flonkerend",
    description:
      "Grondige reiniging van het volledige interieur. Stoelen, dashboard, vloeren, luchtroosters en alle detail­oppervlakken worden vakkundig behandeld.",
    features: [
      "Vacuüm volledige interieur",
      "Dashboard & plastic behandeling",
      "Leder- of stofreinigung",
      "Raamreiniging van binnen",
      "Geursanering",
    ],
    from: "€ 149",
    tag: "Populair",
    color: "#0066FF",
  },
  {
    id: "exterieur",
    title: "Exterieur Detailing",
    subtitle: "Buitenkant in perfectie",
    description:
      "Complete uitwendige reiniging met professionele producten. Van handwas tot sealant — uw lak krijgt de bescherming en glans die het verdient.",
    features: [
      "Professionele handwas",
      "Velgen & banden behandeling",
      "Deurrubbers gereinigd",
      "Lak sealant applicatie",
      "Ramen & spiegels",
    ],
    from: "€ 129",
    tag: null,
    color: "#0066FF",
  },
  {
    id: "combi",
    title: "Combi Pakketten",
    subtitle: "Volledig verzorgd",
    description:
      "Het complete plaatje: interieur én exterieur in één behandeling. De meest gekozen optie voor wie zijn voertuig optimaal wil onderhouden.",
    features: [
      "Volledig interieur detailing",
      "Volledig exterieur detailing",
      "Motorruimte reiniging",
      "Behandelrapport",
      "Gratis nazorgadvies",
    ],
    from: "€ 249",
    tag: "Beste Waarde",
    color: "#0066FF",
  },
  {
    id: "polijsten",
    title: "Polijsten & Lakcorrectie",
    subtitle: "Krassen weg, glans terug",
    description:
      "Professionele lakcorrectie verwijdert krassen, swirl marks en oxidatie. Uw lak wordt machinaal gepolijst tot showroom­kwaliteit.",
    features: [
      "Éénstaps tot driestaps polijsten",
      "Swirl mark verwijdering",
      "Krasverwijdering",
      "Oxidatie behandeling",
      "Eindinspectie met verlichting",
    ],
    from: "€ 299",
    tag: null,
    color: "#0066FF",
  },
  {
    id: "coating",
    title: "Keramische Coating",
    subtitle: "Jarenlange bescherming",
    description:
      "De ultieme lakbescherming. Keramische coating biedt hydrofobe eigenschappen, UV-bescherming en een glasachtige glans voor 2–5 jaar.",
    features: [
      "Lakcorrectie vooraf inbegrepen",
      "Professionele coating applicatie",
      "2–5 jaar bescherming",
      "Hydrofobe werking",
      "Certificaat & garantie",
    ],
    from: "€ 699",
    tag: "Premium",
    color: "#0066FF",
  },
  {
    id: "signature",
    title: "Signature Packages",
    subtitle: "Het allerbeste",
    description:
      "Ons absolute topniveau. Voor eigenaren die geen compromissen sluiten. Volledig maatwerk, topcoating en persoonlijke begeleiding van begin tot eind.",
    features: [
      "Alles in combi pakket",
      "Driestaps lakcorrectie",
      "Premium keramische coating",
      "Lederbehandeling",
      "Persoonlijk detailing rapport",
    ],
    from: "Op aanvraag",
    tag: "Exclusief",
    color: "#0066FF",
  },
];

export default function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="diensten" className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
              Onze Diensten
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
            Premium Pakketten
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Van basisreiniging tot volledige signature behandeling — elk pakket
            is zorgvuldig samengesteld voor maximaal resultaat.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative bg-[#0a0a0a] p-8 cursor-pointer group transition-all duration-300 ${
                active === pkg.id ? "bg-[#0066FF]/5" : "hover:bg-[#111]"
              }`}
              onClick={() => setActive(active === pkg.id ? null : pkg.id)}
            >
              {/* Tag */}
              {pkg.tag && (
                <div className="absolute top-4 right-4 bg-[#0066FF] text-white text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase">
                  {pkg.tag}
                </div>
              )}

              {/* Blue accent */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[#0066FF] transition-all duration-300 ${
                  active === pkg.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />

              <div className="mb-6">
                <p className="text-[#0066FF] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {pkg.subtitle}
                </p>
                <h3 className="text-xl font-bold text-white mb-3">{pkg.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              {/* Features (expand on click) */}
              <AnimatePresence>
                {active === pkg.id && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 overflow-hidden space-y-2"
                  >
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="w-4 h-4 flex items-center justify-center bg-[#0066FF]/20 text-[#0066FF] text-xs font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                <div>
                  <span className="text-white/30 text-xs uppercase tracking-wide">Vanaf</span>
                  <p className="text-white font-bold text-xl">{pkg.from}</p>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/5 hover:bg-[#0066FF] text-white text-xs font-semibold px-4 py-2 tracking-wide uppercase transition-all duration-200 border border-white/10 hover:border-[#0066FF]"
                >
                  Aanvragen
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
