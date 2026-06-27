"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function MenuCard({ item }: { item: MenuItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (cardRef.current) {
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
  }, []);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-cardBg border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-transparent to-transparent opacity-60"></div>

        {item.tags?.includes("veg") && (
          <div className="absolute top-4 right-4 w-4 h-4 border border-green-500 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}
        {item.tags?.includes("non-veg") && (
          <div className="absolute top-4 right-4 w-4 h-4 border border-red-500 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        )}

        {item.badge && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-accent text-bg text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg animate-pulse">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-heading text-text group-hover:text-accent transition-colors">{item.name}</h3>
          <span className="text-accent font-heading text-lg">{CAFE_CONFIG.currency}{item.price}</span>
        </div>
        <p className="text-textMuted text-xs font-body leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>

      {!item.available && (
        <div className="absolute inset-0 bg-bg/80 backdrop-blur-[2px] flex items-center justify-center z-10">
          <span className="text-accent font-heading text-xl uppercase tracking-widest border border-accent/30 px-6 py-2">Available Tomorrow</span>
        </div>
      )}
    </motion.div>
  );
}
