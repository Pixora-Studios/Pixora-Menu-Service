"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function MenuCard({ item, hidden }: { item: MenuItem, hidden?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (cardRef.current && !hidden) {
          gsap.fromTo(cardRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "expo.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 95%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      }, cardRef);
    };

    initGSAP();
    return () => ctx?.revert();
  }, [hidden]);

  if (hidden) return null;

  return (
    <motion.div
      ref={cardRef}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-cardBg rounded-2xl p-3 flex gap-4 transition-all duration-500 border-b border-border/50 last:border-0"
    >
      {/* Square Image */}
      <div className="relative w-[90px] h-[90px] flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${!item.available ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-[8px] text-accent tracking-widest uppercase font-bold">Sold Out</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[17px] font-heading text-text leading-tight group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <span className="text-accent font-body text-[15px] font-medium pl-2">
            {CAFE_CONFIG.currency}{item.price}
          </span>
        </div>

        <p className="text-textMuted text-[12px] font-body leading-snug line-clamp-2 mt-1">
          {item.description}
        </p>

        <div className="flex items-center gap-3 mt-2">
          {item.tags?.includes("veg") && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-textMuted uppercase tracking-tighter">Veg</span>
            </div>
          )}
          {item.tags?.includes("non-veg") && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              <span className="text-[10px] text-textMuted uppercase tracking-tighter">Non-Veg</span>
            </div>
          )}

          <div className="flex gap-1.5">
            {item.tags?.filter(t => !["veg", "non-veg"].includes(t)).map(tag => (
              <span key={tag} className="text-[9px] border border-border px-1.5 py-0.5 rounded text-textMuted uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
