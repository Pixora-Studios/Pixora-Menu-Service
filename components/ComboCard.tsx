"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { CAFE_CONFIG } from "@/config/cafe.config";
import Image from "next/image";

export default function ComboCard({ item, hidden }: { item: MenuItem, hidden?: boolean }) {
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
      className="group relative bg-cardBg rounded-3xl overflow-hidden mb-6"
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

        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-accent text-bg text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-xl">
            Combo Deal
          </span>
          {item.badge && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border border-white/10">
              {item.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading text-text mb-1">{item.name}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-accent font-heading text-xl">{CAFE_CONFIG.currency}{item.price}</span>
                {item.originalPrice && (
                  <span className="text-textMuted text-sm line-through decoration-accent/30">{CAFE_CONFIG.currency}{item.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-textMuted text-xs font-body leading-relaxed mb-4">
          {item.description}
        </p>
        {item.comboIncludes && (
          <div className="flex flex-wrap gap-2">
            {item.comboIncludes.map((included, idx) => (
              <span key={idx} className="text-[9px] text-accent border border-accent/20 px-2 py-1 rounded bg-accent/5 uppercase tracking-wider">
                {included}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
