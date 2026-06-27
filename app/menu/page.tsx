"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuDataRaw from "@/data/menu.json";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import SpecialCard from "@/components/SpecialCard";
import TableBanner from "@/components/TableBanner";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuData, Category } from "@/types/menu";

const menuData = menuDataRaw as unknown as MenuData;

function MenuContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table");
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);

  const filteredItems = useMemo(() => {
    return menuData.items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryType = useMemo(() => {
    return menuData.categories.find(c => c.id === activeCategory)?.type;
  }, [activeCategory]);

  return (
    <div className="min-h-screen pb-20 pt-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-heading text-accent mb-2"
        >
          Our Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-textMuted font-body tracking-widest uppercase text-xs"
        >
          {CAFE_CONFIG.tagline}
        </motion.p>
      </div>

      {tableNumber && <TableBanner table={tableNumber} />}

      <CategoryTabs
        categories={menuData.categories as Category[]}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {activeCategoryType === "special" ? (
            <motion.div
              key="specials-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {filteredItems.map((item) => (
                <SpecialCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="regular-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MenuGrid items={filteredItems} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-24 text-center border-t border-border pt-12">
        <div className="text-accent font-heading text-2xl mb-4">{CAFE_CONFIG.name}</div>
        <div className="flex justify-center space-x-6 mb-8">
          {CAFE_CONFIG.social.instagram && (
            <a href={CAFE_CONFIG.social.instagram} className="text-textMuted hover:text-accent transition-colors">Instagram</a>
          )}
          {CAFE_CONFIG.social.maps && (
            <a href={CAFE_CONFIG.social.maps} className="text-textMuted hover:text-accent transition-colors">Find Us</a>
          )}
        </div>
        <p className="text-textMuted/50 text-[10px] tracking-widest uppercase">Powered by Pixora Studios</p>
      </footer>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="bg-bg text-text min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center font-heading text-accent text-3xl">Loading Menu...</div>}>
        <MenuContent />
      </Suspense>
    </main>
  );
}
