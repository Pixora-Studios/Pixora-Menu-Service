"use client";

import { motion } from "framer-motion";
import { CAFE_CONFIG } from "@/config/cafe.config";

interface FilterBarProps {
  activeVeg: string; // 'all' | 'veg' | 'non-veg'
  setActiveVeg: (v: string) => void;
  activeTags: string[];
  toggleTag: (tag: string) => void;
}

export default function FilterBar({
  activeVeg,
  setActiveVeg,
  activeTags,
  toggleTag
}: FilterBarProps) {
  const tags = CAFE_CONFIG.features.filterTags;

  return (
    <div className="sticky top-12 z-40 bg-bg pt-2 pb-6 px-4">
      {/* Veg/Non-veg Toggles */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveVeg('veg')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] tracking-widest uppercase transition-all ${
            activeVeg === 'veg' ? 'bg-green-500/20 border-green-500 text-green-500' : 'border-border text-textMuted'
          }`}
        >
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Veg Only
        </button>
        <button
          onClick={() => setActiveVeg('non-veg')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] tracking-widest uppercase transition-all ${
            activeVeg === 'non-veg' ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-border text-textMuted'
          }`}
        >
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          Non-Veg Only
        </button>
        {activeVeg !== 'all' && (
          <button
            onClick={() => setActiveVeg('all')}
            className="text-[10px] text-accent tracking-widest uppercase underline underline-offset-4"
          >
            Reset
          </button>
        )}
      </div>

      {/* Tag Chips */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-5 py-2 rounded-full border text-[10px] tracking-widest uppercase whitespace-nowrap transition-all ${
              activeTags.includes(tag)
                ? 'bg-accent border-accent text-bg font-bold'
                : 'border-border text-textMuted hover:border-accentMuted'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
