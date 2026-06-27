"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/menu";

interface Props {
  categories: Category[];
  onSelect: (id: string) => void;
}

export default function FloatingCategoryButton({ categories, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-2xl text-bg"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-2xl">◈</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-cardBg border-t border-border rounded-t-3xl p-6 pb-12 max-h-[80vh] overflow-y-auto no-scrollbar"
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setIsOpen(false);
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-8" />
              <p className="text-accent text-[10px] tracking-[0.5em] font-body uppercase mb-8 text-center">Explore Menu</p>

              <div className="grid grid-cols-1 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className="flex items-center justify-between w-full p-5 rounded-2xl hover:bg-white/5 transition-colors text-left group"
                    onClick={() => {
                      onSelect(cat.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">{cat.icon}</span>
                      <span className="text-text font-heading text-2xl group-hover:text-accent transition-colors">{cat.label}</span>
                    </div>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
