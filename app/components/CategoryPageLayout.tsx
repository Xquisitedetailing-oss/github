"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  type PackageData,
  type VehicleClass,
  vehicleClasses,
  formatPrijs,
  levelLabels,
} from "../data/pricing";
import PackageCard from "./PackageCard";
import VehicleSelector from "./VehicleSelector";
import ComparisonTable from "./ComparisonTable";

interface Props {
  title: string;
  icon: string;
  beschrijving: string;
  packages: PackageData[];
  extraContent?: React.ReactNode;
}

export default function CategoryPageLayout({
  title,
  icon,
  beschrijving,
  packages,
  extraContent,
}: Props) {
  const [klasse, setKlasse] = useState<VehicleClass>(2);
  const [member, setMember] = useState(false);
  const [view, setView] = useState<"cards" | "table">("cards");

  return (
    <main className="bg-black min-h-screen">
      {/* Nav spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="relative py-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/#diensten"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white text-sm tracking-wide uppercase mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Alle pakketten
            </a>
            <div className="flex items-start gap-6">
              <span className="text-6xl">{icon}</span>
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-4">
                  {title}
                </h1>
                <p className="text-white/50 text-xl max-w-2xl leading-relaxed">{beschrijving}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-10 px-6 bg-[#050505] border-b border-white/5 sticky top-20 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="w-full lg:w-auto lg:flex-1 max-w-2xl">
            <VehicleSelector selected={klasse} onChange={setKlasse} />
          </div>
          <div className="flex items-center gap-6">
            {/* Member toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMember(!member)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                  member ? "bg-[#0066FF]" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                    member ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
              <span className="text-white/40 text-xs whitespace-nowrap">
                Member <span className="text-[#0066FF]">−15%</span>
              </span>
            </div>
            {/* View toggle */}
            <div className="flex border border-white/10">
              <button
                onClick={() => setView("cards")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                  view === "cards"
                    ? "bg-[#0066FF] text-white"
                    : "text-white/30 hover:text-white"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                  view === "table"
                    ? "bg-[#0066FF] text-white"
                    : "text-white/30 hover:text-white"
                }`}
              >
                Vergelijk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {view === "cards" ? (
            <motion.div
              key={`cards-${klasse}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                packages.length === 1
                  ? "max-w-lg mx-auto"
                  : packages.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <PackageCard pkg={pkg} klasse={klasse} showMember={member} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ComparisonTable packages={packages} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing grid for all classes */}
      <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">
            Alle prijzen per voertuigklasse
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/30 text-xs font-semibold tracking-widest uppercase">
                    Pakket
                  </th>
                  {([1, 2, 3, 4, 5] as VehicleClass[]).map((k) => (
                    <th key={k} className="p-4 text-center text-white/30 text-xs font-semibold tracking-widest uppercase">
                      <div>{vehicleClasses[k].icon}</div>
                      <div>K{k}</div>
                    </th>
                  ))}
                  <th className="p-4 text-center text-white/30 text-xs font-semibold tracking-widest uppercase">
                    Duur
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) =>
                  pkg.prijzen[1].prijs === 0 ? null : (
                    <motion.tr
                      key={pkg.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {pkg.badge && (
                            <span className="bg-[#0066FF] text-white text-[9px] font-black px-2 py-0.5 tracking-widest uppercase">
                              {pkg.badge}
                            </span>
                          )}
                          <div>
                            <p className="text-white font-semibold text-sm">{pkg.naam}</p>
                            <p className="text-white/30 text-xs capitalize">
                              {levelLabels[pkg.level] ?? pkg.level}
                            </p>
                          </div>
                        </div>
                      </td>
                      {([1, 2, 3, 4, 5] as VehicleClass[]).map((k) => (
                        <td key={k} className="p-4 text-center">
                          <p className="text-white font-semibold text-sm">
                            {formatPrijs(pkg.prijzen[k].prijs)}
                          </p>
                          {member && pkg.memberPrijzen && (
                            <p className="text-[#0066FF] text-xs">
                              {formatPrijs(pkg.memberPrijzen[k].prijs)}
                            </p>
                          )}
                        </td>
                      ))}
                      <td className="p-4 text-center text-white/40 text-xs">
                        {pkg.prijzen[klasse].duur}
                      </td>
                    </motion.tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <p className="text-white/20 text-xs mt-4">
            Alle prijzen zijn inclusief BTW. Duur is exclusief 15 min voor- en nabereiding.
            {member && " Member prijzen zijn exclusief voor Fresh & Clean leden (15% korting)."}
          </p>
        </div>
      </section>

      {extraContent}

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-black text-white mb-4">
            Klaar om te boeken?
          </h3>
          <p className="text-white/40 mb-8">
            Neem contact op voor een vrijblijvende offerte op maat.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-[#0066FF] hover:bg-[#3385FF] text-white font-bold px-12 py-4 tracking-wide uppercase transition-all duration-200"
          >
            Offerte Aanvragen
          </a>
        </div>
      </section>
    </main>
  );
}
