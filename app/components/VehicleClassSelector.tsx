"use client";

import { motion } from "framer-motion";
import { vehicleClasses, VehicleClass } from "../data/pricing";

interface Props {
  selected: VehicleClass | null;
  onSelect: (klasse: VehicleClass) => void;
}

export default function VehicleClassSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
      {(Object.entries(vehicleClasses) as [string, { label: string; voorbeelden: string; icon: string }][]).map(
        ([key, cls], i) => {
          const klasse = Number(key) as VehicleClass;
          const active = selected === klasse;
          return (
            <motion.button
              key={klasse}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => onSelect(klasse)}
              className={`relative group flex flex-col items-start p-5 border transition-all duration-300 text-left focus:outline-none ${
                active
                  ? "border-[#29ABE2] bg-[#29ABE2]/8"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="vehicle-glow"
                  className="absolute inset-0 shadow-[0_0_30px_rgba(41,171,226,0.15)] pointer-events-none"
                />
              )}

              <span className="text-2xl mb-3">{cls.icon}</span>
              <p className={`font-bold text-sm mb-1 transition-colors ${active ? "text-[#29ABE2]" : "text-white"}`}>
                {cls.label}
              </p>
              <p className="text-white/35 text-xs leading-relaxed">{cls.voorbeelden}</p>

              {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29ABE2]" />
              )}
            </motion.button>
          );
        }
      )}
    </div>
  );
}
