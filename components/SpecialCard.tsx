"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function SpecialCard({ item, hidden }: { item: MenuItem, hidden?: boolean }) {
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
      className="group relative bg-cardBg rounded-3xl overflow-hidden mb-8"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute top-6 left-6">
          <span className="bg-accent text-bg text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded shadow-2xl">
            CHEF'S SPECIAL
          </span>
        </div>

        {item.badge && (
          <div className="absolute top-6 right-6">
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded border border-white/10">
              {item.badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <h3 className="text-3xl font-heading text-text leading-tight mb-2">{item.name}</h3>
            <p className="text-white/70 text-xs font-body max-w-sm line-clamp-1">
              {item.description}
            </p>
          </div>
          <span className="text-accent font-heading text-2xl ml-4">
            {CAFE_CONFIG.currency}{item.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
