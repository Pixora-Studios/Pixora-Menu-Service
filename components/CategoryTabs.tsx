"use client";

import { motion } from "framer-motion";
import { Category } from "@/types/menu";
import { useRef, useEffect } from "react";

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(`[data-id="${active}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  return (
    <div className="sticky top-0 md:top-4 z-40 w-full bg-bg/80 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none py-4">
      <div className="relative max-w-fit mx-auto group">
        {/* Horizontal scroll shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          ref={scrollRef}
          className="flex bg-cardBg/80 backdrop-blur-xl border border-border p-1.5 rounded-full overflow-x-auto no-scrollbar shadow-2xl mx-4"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-id={cat.id}
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
    </div>
  );
}
