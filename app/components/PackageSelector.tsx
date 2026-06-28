"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  PackageData,
  VehicleClass,
  packagesByCategory,
  Category,
  getPrijs,
  formatPrijs,
  getPackage,
} from "../data/pricing";

interface Props {
  category: Category;
  vehicleClass: VehicleClass;
  selected: PackageData | null;
  onSelect: (pkg: PackageData) => void;
}

export default function PackageSelector({ category, vehicleClass, selected, onSelect }: Props) {
  const packages = packagesByCategory[category];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AnimatePresence mode="wait">
        {packages.map((pkg, i) => {
          const entry = getPrijs(pkg, vehicleClass);
          const isActive = selected?.id === pkg.id;
          const isHighlight = pkg.highlight;
          const upsell = pkg.aanbevolen ? getPackage(pkg.aanbevolen) : null;

          return (
            <motion.button
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => onSelect(pkg)}
              className={`relative flex flex-col text-left p-6 border transition-all duration-300 focus:outline-none group ${
                isActive
                  ? "border-[#29ABE2] bg-[#29ABE2]/8"
                  : isHighlight
                  ? "border-white/20 bg-white/[0.03] hover:border-[#29ABE2]/50"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <span
                  className={`absolute top-4 right-4 caption text-[10px] px-2 py-1 ${
                    isActive
                      ? "bg-[#29ABE2] text-black"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {pkg.badge}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#29ABE2]" />
              )}

              <div className="flex-1">
                <p className={`font-bold text-base mb-1 transition-colors ${isActive ? "text-[#29ABE2]" : "text-white"}`}>
                  {pkg.naam}
                </p>
                <p className="text-white/35 text-xs mb-4 leading-relaxed">{pkg.beschrijving}</p>

                {/* Price */}
                <div className="mb-5">
                  <p className={`text-2xl font-black tracking-tight ${isActive ? "text-white" : "text-white/80"}`}>
                    {formatPrijs(entry.prijs)}
                  </p>
                  {entry.prijs > 0 && (
                    <p className="text-white/25 text-xs mt-0.5">{entry.duur}</p>
                  )}
                </div>

                {/* Included */}
                <ul className="space-y-1.5">
                  {pkg.inbegrepen.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/40">
                      <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isActive ? "text-[#29ABE2]" : "text-white/20"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upsell hint */}
              {upsell && !isActive && (
                <p className="mt-4 text-[#29ABE2]/60 text-[10px] caption">
                  Upgrade: {upsell.naam} →
                </p>
              )}

              {/* CTA */}
              <div className={`mt-5 pt-4 border-t text-xs font-semibold flex items-center justify-between transition-all duration-300 ${
                isActive
                  ? "border-[#29ABE2]/30 text-[#29ABE2]"
                  : "border-white/5 text-white/25 group-hover:text-white/50"
              }`}>
                {isActive ? "Geselecteerd" : "Deze behandeling kiezen"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isActive ? "M5 13l4 4L19 7" : "M17 8l4 4m0 0l-4 4m4-4H3"} />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
