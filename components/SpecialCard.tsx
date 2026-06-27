"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function SpecialCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group relative bg-cardBg border border-border rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[300px] transition-all duration-500 hover:border-accent/40"
    >
      <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cardBg/20 to-transparent"></div>

        {item.badge && (
          <div className="absolute top-6 left-6">
            <span className="bg-accent text-bg text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-2xl">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-accent text-xs tracking-[0.3em] uppercase">Chef's Choice</span>
          <div className="h-[1px] w-12 bg-accent/30"></div>
        </div>

        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-3xl md:text-4xl font-heading text-text leading-tight">{item.name}</h3>
          <span className="text-accent font-heading text-2xl ml-4">{CAFE_CONFIG.currency}{item.price}</span>
        </div>

        <p className="text-textMuted text-sm md:text-base font-body leading-relaxed mb-8 max-w-md">
          {item.description}
        </p>

        <div className="mt-auto flex items-center space-x-4">
          {item.tags?.map(tag => (
            <span key={tag} className="text-[10px] text-textMuted border border-border px-3 py-1 rounded-full uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {!item.available && (
        <div className="absolute inset-0 bg-bg/80 backdrop-blur-[2px] flex items-center justify-center z-10">
          <span className="text-accent font-heading text-2xl uppercase tracking-widest border border-accent/30 px-8 py-3">Coming Soon</span>
        </div>
      )}
    </motion.div>
  );
}
