"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  PackageData,
  VehicleClass,
  vehicleClasses,
  getPrijs,
  formatPrijs,
  getPackage,
  categoryMeta,
} from "../data/pricing";

interface Props {
  vehicleClass: VehicleClass | null;
  pkg: PackageData | null;
  step: number;
  onBook: () => void;
}

export default function BookingSummary({ vehicleClass, pkg, step, onBook }: Props) {
  const entry = pkg && vehicleClass ? getPrijs(pkg, vehicleClass) : null;
  const upsell = pkg?.aanbevolen ? getPackage(pkg.aanbevolen) : null;
  const upsellEntry = upsell && vehicleClass ? getPrijs(upsell, vehicleClass) : null;
  const ready = vehicleClass !== null && pkg !== null;

  return (
    <div className="border border-white/10 bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="line-accent" />
        <span className="caption text-[#29ABE2] text-xs">Uw selectie</span>
      </div>

      <div className="space-y-4">
        {/* Vehicle class */}
        <SummaryRow
          step={1}
          done={vehicleClass !== null}
          label="Voertuigklasse"
          value={vehicleClass ? vehicleClasses[vehicleClass].label : null}
          sub={vehicleClass ? vehicleClasses[vehicleClass].voorbeelden : undefined}
        />

        {/* Category */}
        <SummaryRow
          step={2}
          done={pkg !== null}
          label="Categorie"
          value={pkg ? categoryMeta[pkg.categorie].title : null}
        />

        {/* Package */}
        <SummaryRow
          step={3}
          done={pkg !== null}
          label="Pakket"
          value={pkg ? pkg.naam : null}
          sub={entry && entry.prijs > 0 ? entry.duur : undefined}
        />

        {/* Price */}
        <AnimatePresence>
          {entry && (
            <motion.div
              key="price"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-end justify-between">
                  <p className="text-white/30 text-xs">Prijs vanaf</p>
                  <p className="text-white font-black text-2xl tracking-tight">
                    {formatPrijs(entry.prijs)}
                  </p>
                </div>
                {entry.prijs === 0 && (
                  <p className="text-white/25 text-xs mt-1">Definitieve prijs na inspectie</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upsell */}
        <AnimatePresence>
          {upsell && upsellEntry && (
            <motion.div
              key="upsell"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="bg-[#29ABE2]/5 border border-[#29ABE2]/15 p-3"
            >
              <p className="text-[#29ABE2] text-xs font-semibold mb-0.5">Aanbevolen upgrade</p>
              <p className="text-white/50 text-xs">{upsell.naam}</p>
              {upsellEntry.prijs > 0 && (
                <p className="text-white/25 text-xs mt-0.5">{formatPrijs(upsellEntry.prijs)}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.button
        onClick={onBook}
        disabled={!ready}
        whileHover={ready ? { scale: 1.01 } : {}}
        whileTap={ready ? { scale: 0.99 } : {}}
        className={`mt-6 w-full caption py-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm ${
          ready
            ? "bg-[#29ABE2] text-black hover:bg-white"
            : "bg-white/5 text-white/20 cursor-not-allowed"
        }`}
      >
        {ready ? (
          <>
            Boeking aanvragen
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        ) : (
          `Stap ${step} van 3 voltooien`
        )}
      </motion.button>

      {ready && (
        <p className="text-white/20 text-[10px] text-center mt-3">
          Geen betaling vereist — enkel een aanvraag
        </p>
      )}
    </div>
  );
}

function SummaryRow({
  step, done, label, value, sub,
}: {
  step: number;
  done: boolean;
  label: string;
  value: string | null;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border text-[10px] font-bold mt-0.5 transition-all duration-300 ${
        done ? "border-[#29ABE2] bg-[#29ABE2]/10 text-[#29ABE2]" : "border-white/10 text-white/20"
      }`}>
        {done ? (
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : step}
      </div>
      <div className="min-w-0">
        <p className="text-white/30 text-[10px] caption mb-0.5">{label}</p>
        {value ? (
          <>
            <p className="text-white text-sm font-semibold truncate">{value}</p>
            {sub && <p className="text-white/25 text-[10px] mt-0.5 truncate">{sub}</p>}
          </>
        ) : (
          <p className="text-white/15 text-xs">Nog niet gekozen</p>
        )}
      </div>
    </div>
  );
}
