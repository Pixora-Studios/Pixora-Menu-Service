"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/menu";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const isEven = index % 2 === 0;

  const tagColors: Record<string, string> = {
    veg: "bg-secondary/10 text-secondary",
    "non-veg": "bg-red-500/10 text-red-500",
    spicy: "bg-orange-500/10 text-orange-500",
    bestseller: "bg-yellow-500/10 text-yellow-600",
    new: "bg-blue-500/10 text-blue-500",
    combo: "bg-primary/10 text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      // Fixed height of 100px as requested
      className={`glass-morphism clay-card p-2.5 mb-3 flex items-center gap-3 h-[100px] overflow-hidden ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Image - reduced size to fit height comfortably */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded-14 shadow-sm"
        />
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col justify-center overflow-hidden ${isEven ? "text-left" : "text-right"}`}>
        <div className={`flex items-baseline gap-2 mb-0.5 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
          <h3 className="text-[14px] font-semibold text-text-primary truncate">
            {item.name}
          </h3>
          <span className="text-[13px] font-semibold text-primary whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        <p className="text-[11px] text-text-muted line-clamp-2 leading-tight mb-1.5">
          {item.description}
        </p>

        {/* Tags - kept very compact */}
        <div className={`flex flex-wrap gap-1 ${isEven ? "justify-start" : "justify-end"}`}>
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-[8px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                tagColors[tag] || "bg-gray-100 text-gray-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
