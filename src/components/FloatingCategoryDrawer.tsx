"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, X } from "lucide-react";
import { categories } from "@/data/menu";

interface FloatingCategoryDrawerProps {
  onCategoryClick: (category: string) => void;
}

export default function FloatingCategoryDrawer({
  onCategoryClick,
}: FloatingCategoryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-clay"
      >
        <LayoutGrid size={24} />
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 glass-morphism rounded-t-[32px] p-8 pb-12 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-playfair font-bold text-text-primary">
                  Categories
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryClick(category);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-4 rounded-2xl glass-morphism text-lg font-medium text-text-primary active:bg-primary active:text-white transition-colors"
                  >
                    {category}
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
