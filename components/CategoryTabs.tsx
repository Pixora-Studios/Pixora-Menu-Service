"use client";

import { motion } from "framer-motion";
import { Category } from "@/types/menu";

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="sticky top-4 z-40 flex justify-center w-full px-4">
      <div className="flex bg-cardBg/80 backdrop-blur-xl border border-border p-1.5 rounded-full overflow-x-auto no-scrollbar shadow-2xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`relative flex items-center px-6 py-2.5 rounded-full text-xs md:text-sm font-body tracking-widest uppercase transition-all whitespace-nowrap ${
              active === cat.id ? "text-bg" : "text-textMuted hover:text-text"
            }`}
          >
            {active === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-accent rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg opacity-70">{cat.icon}</span>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
