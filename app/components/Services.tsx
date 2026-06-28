"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  packagesByCategory,
  categoryMeta,
  type Category,
  type VehicleClass,
  formatPrijs,
} from "../data/pricing";
import VehicleSelector from "./VehicleSelector";
import PackageCard from "./PackageCard";

const categories = Object.keys(categoryMeta) as Category[];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>("combi");
  const [klasse, setKlasse] = useState<VehicleClass>(2);
  const [member, setMember] = useState(false);

  const packages = packagesByCategory[activeCategory];
  const meta = categoryMeta[activeCategory];

  return (
    <section id="diensten" className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
              Pakketten & Prijzen
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-3">
                Premium Pakketten
              </h2>
              <p className="text-white/40 text-lg max-w-xl">
                Officiële prijzen op basis van voertuigklasse. Selecteer een categorie en uw auto om de exacte prijs te zien.
              </p>
            </div>
            {/* Member toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMember(!member)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  member ? "bg-[#0066FF]" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                    member ? "left-6" : "left-1"
                  }`}
                />
              </button>
              <span className="text-white/40 text-sm whitespace-nowrap">
                Fresh &amp; Clean <span className="text-[#0066FF]">−15%</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-white/5 pb-0">
          {categories.map((cat) => {
            const m = categoryMeta[cat];
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-200 border-b-2 -mb-px ${
                  active
                    ? "border-[#0066FF] text-white"
                    : "border-transparent text-white/30 hover:text-white/60"
                }`}
              >
                <span>{m.icon}</span>
                <span className="hidden sm:inline">{m.title}</span>
                <span className="sm:hidden">K{cat.slice(0, 3)}</span>
              </button>
            );
          })}
        </div>

        {/* Vehicle selector */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <VehicleSelector selected={klasse} onChange={setKlasse} />
        </motion.div>

        {/* Category heading */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-3xl">{meta.icon}</span>
          <div>
            <h3 className="text-white font-bold text-2xl">{meta.title}</h3>
            <p className="text-white/40 text-sm">{meta.beschrijving}</p>
          </div>
          <a
            href={`/pakketten/${meta.slug}`}
            className="ml-auto text-[#0066FF] text-xs font-semibold tracking-wide uppercase hover:text-white transition-colors"
          >
            Alles bekijken →
          </a>
        </div>

        {/* Package cards */}
        {activeCategory === "coating" ? (
          <div className="border border-white/10 bg-[#0a0a0a] p-10 text-center">
            <span className="text-4xl mb-4 block">💎</span>
            <h4 className="text-white font-black text-3xl mb-3">Keramische Coating</h4>
            <p className="text-white/50 text-base max-w-lg mx-auto mb-6 leading-relaxed">
              Prijs op aanvraag — afhankelijk van voertuigklasse, staat van de lak en gewenste coating.
              Altijd voorafgegaan door lakcorrectie.
            </p>
            <ul className="flex flex-wrap justify-center gap-4 mb-8">
              {packages[0]?.inbegrepen.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                  <span className="text-[#0066FF]">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-block bg-[#0066FF] hover:bg-[#3385FF] text-white font-bold px-10 py-4 tracking-wide uppercase transition-all duration-200"
            >
              Offerte Aanvragen
            </a>
          </div>
        ) : (
          <motion.div
            key={`${activeCategory}-${klasse}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <PackageCard pkg={pkg} klasse={klasse} showMember={member} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-white/30 text-sm">
            Prijs incl. BTW · Duur exclusief inbreng- en ophaalmoment
          </p>
          <div className="flex gap-3">
            <a
              href="#configurator"
              className="border border-white/15 text-white/60 hover:text-white hover:border-white/40 text-xs font-semibold px-5 py-3 tracking-wide uppercase transition-all duration-200"
            >
              Prijscalculator
            </a>
            <a
              href="#contact"
              className="bg-[#0066FF] hover:bg-[#3385FF] text-white text-xs font-semibold px-5 py-3 tracking-wide uppercase transition-all duration-200"
            >
              Offerte Aanvragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
