"use client";

import { motion } from "framer-motion";
import { vehicleClasses, type VehicleClass } from "../data/pricing";

interface Props {
  selected: VehicleClass;
  onChange: (k: VehicleClass) => void;
}

export default function VehicleSelector({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <p className="text-white/40 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
        Selecteer voertuigklasse
      </p>
      <div className="grid grid-cols-5 gap-2">
        {([1, 2, 3, 4, 5] as VehicleClass[]).map((k) => {
          const cls = vehicleClasses[k];
          const active = selected === k;
          return (
            <motion.button
              key={k}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(k)}
              className={`relative flex flex-col items-center gap-1.5 p-3 border transition-all duration-200 text-center group ${
                active
                  ? "border-[#0066FF] bg-[#0066FF]/10"
                  : "border-white/10 hover:border-white/30 bg-white/2"
              }`}
            >
              <span className="text-2xl">{cls.icon}</span>
              <span
                className={`text-xs font-bold tracking-wide ${
                  active ? "text-[#0066FF]" : "text-white/60"
                }`}
              >
                K{k}
              </span>
              {active && (
                <motion.div
                  layoutId="vehicle-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF]"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-white/30 text-xs mt-2 text-center">
        {vehicleClasses[selected].label} · {vehicleClasses[selected].voorbeelden}
      </p>
    </div>
  );
}
