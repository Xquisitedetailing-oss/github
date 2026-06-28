"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type PackageData,
  type VehicleClass,
  formatPrijs,
  levelLabels,
} from "../data/pricing";

interface Props {
  pkg: PackageData;
  klasse: VehicleClass;
  showMember?: boolean;
}

const levelColors: Record<string, string> = {
  standaard: "text-white/50",
  deluxe: "text-[#0066FF]",
  premium: "text-[#3385FF]",
  signature: "text-white",
};

const levelBg: Record<string, string> = {
  standaard: "border-white/10",
  deluxe: "border-[#0066FF]/40",
  premium: "border-[#0066FF]/60",
  signature: "border-white/40",
};

export default function PackageCard({ pkg, klasse, showMember = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const entry = showMember && pkg.memberPrijzen
    ? pkg.memberPrijzen[klasse]
    : pkg.prijzen[klasse];
  const regularEntry = pkg.prijzen[klasse];

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative flex flex-col border ${levelBg[pkg.level]} bg-[#0a0a0a] overflow-hidden group cursor-pointer ${
        pkg.highlight ? "ring-1 ring-[#0066FF]/30" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Badge */}
      {pkg.badge && (
        <div
          className={`absolute top-0 right-0 text-[10px] font-black px-3 py-1.5 tracking-widest uppercase ${
            pkg.level === "signature"
              ? "bg-white text-black"
              : "bg-[#0066FF] text-white"
          }`}
        >
          {pkg.badge}
        </div>
      )}

      {/* Top accent line */}
      <div
        className={`h-0.5 w-full ${
          pkg.level === "signature"
            ? "bg-gradient-to-r from-white/40 via-white to-white/40"
            : pkg.level === "premium"
            ? "bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF] to-[#0066FF]/0"
            : pkg.level === "deluxe"
            ? "bg-[#0066FF]/60"
            : "bg-white/10"
        }`}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Level tag */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[10px] font-black tracking-[0.3em] uppercase ${levelColors[pkg.level]}`}
          >
            {levelLabels[pkg.level] ?? pkg.level}
          </span>
          <svg
            className={`w-4 h-4 text-white/20 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <h3 className="text-white font-bold text-xl mb-2 leading-tight">{pkg.naam}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-5">{pkg.beschrijving}</p>

        {/* Duration */}
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-4 h-4 text-[#0066FF]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white/40 text-sm">Geschatte duur: {entry.duur}</span>
        </div>

        {/* Expandable features */}
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-5 space-y-2"
            >
              {pkg.inbegrepen.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 bg-[#0066FF]/15 text-[#0066FF] flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="text-white/60">{f}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Price row */}
        <div className="mt-auto pt-5 border-t border-white/5 flex items-end justify-between gap-4">
          <div>
            {showMember && pkg.memberPrijzen && (
              <p className="text-white/25 text-xs line-through mb-0.5">
                {formatPrijs(regularEntry.prijs)}
              </p>
            )}
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Vanaf</p>
            <p
              className={`font-black text-2xl leading-none ${
                pkg.level === "signature" ? "text-white" : "text-white"
              }`}
            >
              {formatPrijs(entry.prijs)}
            </p>
            {showMember && pkg.memberPrijzen && (
              <p className="text-[#0066FF] text-[10px] font-semibold tracking-wide mt-1">
                Fresh &amp; Clean prijs
              </p>
            )}
          </div>
          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            className={`flex-shrink-0 text-xs font-bold px-5 py-3 tracking-wide uppercase transition-all duration-200 ${
              pkg.highlight || pkg.level === "signature"
                ? "bg-[#0066FF] hover:bg-[#3385FF] text-white"
                : "bg-white/5 hover:bg-[#0066FF] text-white border border-white/10 hover:border-[#0066FF]"
            }`}
          >
            Aanvragen
          </a>
        </div>
      </div>
    </motion.div>
  );
}
