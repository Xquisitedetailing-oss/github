"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  vehicleClasses,
  packagesByCategory,
  formatPrijs,
  type VehicleClass,
  type Category,
  type PackageData,
  getPackage,
} from "../data/pricing";

type Step = "category" | "level" | "vehicle" | "result";

const categoryOptions: { id: Category; label: string; icon: string; sub: string }[] = [
  { id: "interieur", label: "Interieur Detailing", icon: "🪑", sub: "Reiniging van binnenuit" },
  { id: "exterieur", label: "Exterieur Detailing", icon: "✨", sub: "Buitenkant & lak" },
  { id: "combi", label: "Combi Pakket", icon: "🚗", sub: "Binnen én buiten" },
  { id: "correction", label: "Lakcorrectie", icon: "🔧", sub: "Krassen & swirls" },
  { id: "coating", label: "Keramische Coating", icon: "💎", sub: "Jarenlange bescherming" },
];

export default function PricingConfigurator() {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);
  const [klasse, setKlasse] = useState<VehicleClass>(2);
  const [member, setMember] = useState(false);

  const levels = category ? packagesByCategory[category] : [];

  const entry = selectedPkg
    ? member && selectedPkg.memberPrijzen
      ? selectedPkg.memberPrijzen[klasse]
      : selectedPkg.prijzen[klasse]
    : null;

  const upgrade = selectedPkg?.aanbevolen ? getPackage(selectedPkg.aanbevolen) : null;
  const upgradeEntry = upgrade
    ? member && upgrade.memberPrijzen
      ? upgrade.memberPrijzen[klasse]
      : upgrade.prijzen[klasse]
    : null;

  const progress = { category: 25, level: 50, vehicle: 75, result: 100 }[step];

  const reset = () => {
    setStep("category");
    setCategory(null);
    setSelectedPkg(null);
    setKlasse(2);
  };

  return (
    <section id="configurator" className="bg-[#030303] py-28 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
              Prijscalculator
            </span>
            <div className="w-8 h-px bg-[#0066FF]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-3">
            Bereken uw prijs
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Selecteer behandeling, pakket en voertuigklasse voor een directe prijsopgave.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="w-full bg-white/5 h-px mb-12">
          <motion.div
            className="h-px bg-[#0066FF]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Category */}
          {step === "category" && (
            <motion.div
              key="cat"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/30 text-sm tracking-widest uppercase text-center mb-8">
                Stap 1 / 3 — Kies een behandeling
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCategory(opt.id);
                      if (opt.id === "coating") {
                        setSelectedPkg(packagesByCategory.coating[0]);
                        setStep("vehicle");
                      } else {
                        setStep("level");
                      }
                    }}
                    className="flex items-center gap-4 p-5 border border-white/10 hover:border-[#0066FF] bg-white/2 hover:bg-[#0066FF]/5 text-left transition-all duration-200 group"
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <div>
                      <p className="text-white font-semibold group-hover:text-[#0066FF] transition-colors duration-200">
                        {opt.label}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">{opt.sub}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Level */}
          {step === "level" && category && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/30 text-sm tracking-widest uppercase text-center mb-8">
                Stap 2 / 3 — Kies een pakketniveau
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPkg(pkg);
                      setStep("vehicle");
                    }}
                    className={`relative p-6 border text-left transition-all duration-200 group ${
                      pkg.highlight
                        ? "border-[#0066FF]/50 bg-[#0066FF]/5"
                        : "border-white/10 hover:border-[#0066FF]/40 bg-white/2"
                    }`}
                  >
                    {pkg.badge && (
                      <div className="absolute top-3 right-3 bg-[#0066FF] text-white text-[9px] font-black px-2 py-1 tracking-widest uppercase">
                        {pkg.badge}
                      </div>
                    )}
                    <p className="text-[#0066FF] text-[10px] font-black tracking-[0.25em] uppercase mb-2">
                      {pkg.level}
                    </p>
                    <h4 className="text-white font-bold text-lg mb-2">{pkg.naam}</h4>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{pkg.beschrijving}</p>
                    <p className="text-white/30 text-xs">
                      Vanaf € {pkg.prijzen[2].prijs.toFixed(2).replace(".", ",")}
                    </p>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setStep("category")}
                className="mt-6 text-white/30 hover:text-white text-sm tracking-wide uppercase mx-auto block transition-colors"
              >
                ← Vorige
              </button>
            </motion.div>
          )}

          {/* STEP 3: Vehicle class */}
          {step === "vehicle" && selectedPkg && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/30 text-sm tracking-widest uppercase text-center mb-8">
                Stap 3 / 3 — Selecteer voertuigklasse
              </p>

              <div className="grid grid-cols-5 gap-3 mb-8">
                {([1, 2, 3, 4, 5] as VehicleClass[]).map((k) => {
                  const vc = vehicleClasses[k];
                  return (
                    <motion.button
                      key={k}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setKlasse(k)}
                      className={`flex flex-col items-center gap-2 p-4 border transition-all duration-200 ${
                        klasse === k
                          ? "border-[#0066FF] bg-[#0066FF]/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="text-2xl">{vc.icon}</span>
                      <span className={`text-xs font-bold ${klasse === k ? "text-[#0066FF]" : "text-white/50"}`}>
                        Klasse {k}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-white/40 text-sm text-center mb-8">
                <span className="text-white font-semibold">{vehicleClasses[klasse].label}</span> · {vehicleClasses[klasse].voorbeelden}
              </p>

              {/* Member toggle */}
              {selectedPkg.memberPrijzen && (
                <div className="flex items-center justify-center gap-3 mb-8">
                  <button
                    onClick={() => setMember(!member)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      member ? "bg-[#0066FF]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                        member ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                  <span className="text-white/50 text-sm">Fresh &amp; Clean member (15% korting)</span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("result")}
                className="w-full bg-[#0066FF] hover:bg-[#3385FF] text-white font-bold py-4 tracking-wide uppercase transition-all duration-200"
              >
                Prijs Berekenen →
              </motion.button>

              <button
                onClick={() => setStep(category === "coating" ? "category" : "level")}
                className="mt-4 text-white/30 hover:text-white text-sm tracking-wide uppercase mx-auto block transition-colors"
              >
                ← Vorige
              </button>
            </motion.div>
          )}

          {/* RESULT */}
          {step === "result" && selectedPkg && entry && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Main result card */}
              <div className="border border-[#0066FF]/30 bg-[#0066FF]/5 p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#0066FF] text-[10px] font-black tracking-[0.3em] uppercase">
                        {selectedPkg.level}
                      </span>
                      {selectedPkg.badge && (
                        <span className="bg-[#0066FF] text-white text-[9px] font-black px-2 py-0.5 tracking-widest uppercase">
                          {selectedPkg.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-black text-3xl mb-1">{selectedPkg.naam}</h3>
                    <p className="text-white/40 text-sm">
                      {vehicleClasses[klasse].label} · {vehicleClasses[klasse].voorbeelden}
                    </p>
                  </div>
                  <div className="text-right">
                    {member && selectedPkg.memberPrijzen && (
                      <p className="text-white/25 text-sm line-through mb-1">
                        {formatPrijs(selectedPkg.prijzen[klasse].prijs)}
                      </p>
                    )}
                    <p className="text-[#0066FF] font-black text-5xl leading-none">
                      {formatPrijs(entry.prijs)}
                    </p>
                    {member && selectedPkg.memberPrijzen && (
                      <p className="text-[#0066FF]/60 text-xs font-semibold tracking-wide mt-1 uppercase">
                        Fresh &amp; Clean prijs
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-5 border-t border-b border-white/5">
                  <div className="text-center">
                    <p className="text-[#0066FF] font-bold text-xl">{entry.duur}</p>
                    <p className="text-white/30 text-xs uppercase tracking-wide mt-1">Behandelduur</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-xl">{vehicleClasses[klasse].label}</p>
                    <p className="text-white/30 text-xs uppercase tracking-wide mt-1">Voertuigklasse</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-xl capitalize">{selectedPkg.level}</p>
                    <p className="text-white/30 text-xs uppercase tracking-wide mt-1">Pakketniveau</p>
                  </div>
                </div>

                {/* Included */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {selectedPkg.inbegrepen.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-white/60">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full bg-[#0066FF] hover:bg-[#3385FF] text-white font-bold py-4 tracking-wide uppercase transition-all duration-200"
                >
                  Dit Pakket Aanvragen
                </a>
              </div>

              {/* Upgrade recommendation */}
              {upgrade && upgradeEntry && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border border-white/10 bg-white/2 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#0066FF] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                        Aanbevolen upgrade
                      </p>
                      <p className="text-white font-bold text-lg mb-1">{upgrade.naam}</p>
                      <p className="text-white/40 text-sm">{upgrade.beschrijving}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold text-xl">
                        {formatPrijs(upgradeEntry.prijs)}
                      </p>
                      <a
                        href="#contact"
                        className="mt-2 inline-block text-xs font-semibold text-[#0066FF] hover:text-white uppercase tracking-wide transition-colors"
                      >
                        Meer info →
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Coating upsell if not already coating */}
              {selectedPkg.categorie !== "coating" && selectedPkg.categorie !== "correction" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border border-white/5 bg-white/1 p-5 flex items-center gap-4"
                >
                  <span className="text-2xl">💎</span>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      Combineer met Keramische Coating
                    </p>
                    <p className="text-white/30 text-xs">
                      Jarenlange bescherming na uw detailing behandeling
                    </p>
                  </div>
                  <a
                    href="/pakketten/coating"
                    className="text-[#0066FF] text-xs font-bold tracking-wide uppercase whitespace-nowrap hover:text-white transition-colors"
                  >
                    Bekijken →
                  </a>
                </motion.div>
              )}

              <button
                onClick={reset}
                className="w-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 py-3 text-sm tracking-wide uppercase transition-all duration-200"
              >
                Opnieuw Beginnen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
