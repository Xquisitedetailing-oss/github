"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  type PackageData,
  type VehicleClass,
  formatPrijs,
  vehicleClasses,
  levelLabels,
} from "../data/pricing";
import VehicleSelector from "./VehicleSelector";

interface Props {
  packages: PackageData[];
  title?: string;
}

const featureMatrix: string[] = [
  "Vacuüm & basisreiniging",
  "Dashboard & console",
  "Diepreiniging stoelen",
  "Machinale extractie",
  "Leder- / stofreinigung",
  "Leder conditionering",
  "Ozonsanering",
  "Clay bar decontaminatie",
  "Lak sealant",
  "Carnauba wax",
  "Glascoating",
  "Motorruimte",
  "Behandelrapport",
  "Garantie",
];

const featureMap: Record<string, boolean[]> = {
  // [standaard, deluxe, premium/signature]
  "Vacuüm & basisreiniging": [true, true, true],
  "Dashboard & console": [true, true, true],
  "Diepreiniging stoelen": [false, true, true],
  "Machinale extractie": [false, false, true],
  "Leder- / stofreinigung": [false, true, true],
  "Leder conditionering": [false, false, true],
  "Ozonsanering": [false, true, true],
  "Clay bar decontaminatie": [false, true, true],
  "Lak sealant": [false, true, true],
  "Carnauba wax": [false, false, true],
  "Glascoating": [false, false, true],
  "Motorruimte": [false, false, true],
  "Behandelrapport": [false, false, true],
  "Garantie": [false, false, true],
};

export default function ComparisonTable({ packages, title }: Props) {
  const [klasse, setKlasse] = useState<VehicleClass>(2);

  if (packages.length === 0) return null;

  return (
    <div className="space-y-8">
      {title && (
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      )}

      <VehicleSelector selected={klasse} onChange={setKlasse} />

      {/* Comparison grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 text-white/30 text-xs font-semibold tracking-widest uppercase w-48">
                Inbegrepen
              </th>
              {packages.map((pkg) => (
                <th key={pkg.id} className="p-4 text-center min-w-[160px]">
                  <div className="space-y-1">
                    {pkg.badge && (
                      <div className="inline-block bg-[#0066FF] text-white text-[9px] font-black px-2 py-0.5 tracking-widest uppercase mb-1">
                        {pkg.badge}
                      </div>
                    )}
                    <p className="text-[#0066FF] text-[10px] font-black tracking-[0.2em] uppercase">
                      {levelLabels[pkg.level] ?? pkg.level}
                    </p>
                    <p className="text-white font-bold text-base">{pkg.naam}</p>
                    <p className="text-white font-black text-xl">
                      {formatPrijs(pkg.prijzen[klasse].prijs)}
                    </p>
                    <p className="text-white/30 text-xs">{pkg.prijzen[klasse].duur}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((feature, i) => {
              const row = featureMap[feature] ?? [];
              return (
                <motion.tr
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="p-4 text-white/50 text-sm">{feature}</td>
                  {packages.map((_, pkgIdx) => {
                    const has = row[pkgIdx] ?? false;
                    return (
                      <td key={pkgIdx} className="p-4 text-center">
                        {has ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-[#0066FF]/15 text-[#0066FF]">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6">
                            <span className="w-3 h-px bg-white/15" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}

            {/* CTA row */}
            <tr className="border-t border-white/10">
              <td className="p-4" />
              {packages.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center">
                  <a
                    href="#contact"
                    className={`inline-block text-xs font-bold px-5 py-3 tracking-wide uppercase transition-all duration-200 ${
                      pkg.highlight
                        ? "bg-[#0066FF] hover:bg-[#3385FF] text-white"
                        : "border border-white/15 hover:border-[#0066FF] text-white hover:text-[#0066FF]"
                    }`}
                  >
                    Aanvragen
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
