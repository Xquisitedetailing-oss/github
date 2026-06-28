"use client";

import { motion } from "framer-motion";
import { Category, categoryMeta } from "../data/pricing";

const categories: Category[] = ["interieur", "exterieur", "combi", "correction", "coating"];

interface Props {
  selected: Category | null;
  onSelect: (cat: Category) => void;
}

export default function ServiceCategorySelector({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat, i) => {
        const meta = categoryMeta[cat];
        const active = selected === cat;
        return (
          <motion.button
            key={cat}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => onSelect(cat)}
            className={`relative flex items-center gap-2.5 px-5 py-3 border transition-all duration-300 focus:outline-none text-sm font-medium ${
              active
                ? "border-[#29ABE2] bg-[#29ABE2]/10 text-[#29ABE2]"
                : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/25"
            }`}
          >
            <span className="text-base">{meta.icon}</span>
            {meta.title}
            {active && (
              <motion.div
                layoutId="category-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29ABE2]"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
