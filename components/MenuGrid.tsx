"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types/menu";
import MenuCard from "./MenuCard";
import ComboCard from "./ComboCard";

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  // Simple CSS Column Masonry
  return (
    <motion.div
      layout
      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mt-12"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="break-inside-avoid mb-6"
          >
            {item.category === "combos" ? (
              <ComboCard item={item} />
            ) : (
              <MenuCard item={item} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
