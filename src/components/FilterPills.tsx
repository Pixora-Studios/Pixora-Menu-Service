"use client";

import { motion } from "framer-motion";

interface FilterPillsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const filters = [
  "All",
  "Veg",
  "Non-Veg",
  "Spicy",
  "Bestseller",
  "New",
  "Combos",
];

export default function FilterPills({
  activeFilter,
  setActiveFilter,
}: FilterPillsProps) {
  return (
    <div className="sticky top-[60px] z-30 bg-background/80 backdrop-blur-md py-4 overflow-x-auto no-scrollbar">
      <div className="flex px-6 gap-2 min-w-max">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-text-muted"
                }`}
              >
                {filter}
              </span>
              {isActive ? (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              ) : (
                <div className="absolute inset-0 glass-morphism rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
