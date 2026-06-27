"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function ComboCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative bg-bgSecondary border border-accent/20 rounded-3xl overflow-hidden transition-all duration-500 hover:border-accent/50"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bgSecondary via-transparent to-transparent"></div>

        <div className="absolute top-4 left-4">
          <span className="bg-accent text-bg text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-sm shadow-xl">
            Combo Deal
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-heading text-text mb-1">{item.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-accent font-heading text-xl">{CAFE_CONFIG.currency}{item.price}</span>
              {item.originalPrice && (
                <span className="text-textMuted text-sm line-through decoration-accent/30">{CAFE_CONFIG.currency}{item.originalPrice}</span>
              )}
            </div>
          </div>
          {item.badge && (
            <span className="text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full uppercase tracking-widest">
              {item.badge}
            </span>
          )}
        </div>

        <p className="text-textMuted text-xs font-body mb-6 leading-relaxed">
          {item.description}
        </p>

        {item.comboIncludes && (
          <div className="space-y-2">
            <p className="text-[10px] text-accent uppercase tracking-[0.2em] mb-3">Includes:</p>
            <div className="flex flex-wrap gap-2">
              {item.comboIncludes.map((included, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-accent/5 border border-accent/10 px-3 py-1.5 rounded-full">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span className="text-[10px] text-text/80 uppercase tracking-wider">{included}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
