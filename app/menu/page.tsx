"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import menuDataRaw from "@/data/menu.json";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import TableBanner from "@/components/TableBanner";
import FloatingCategoryButton from "@/components/FloatingCategoryButton";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuData, Category } from "@/types/menu";

const menuData = menuDataRaw as unknown as MenuData;

function MenuContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table");
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (categoryId: string) => {
    const el = categoryRefs.current[categoryId];
    if (el) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-category") ?? "");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-100px 0px -40% 0px"
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pb-32 pt-10 px-4 md:px-8 max-w-7xl mx-auto">
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
        onChange={scrollToCategory}
      />

      <MenuGrid
        categories={menuData.categories as Category[]}
        items={menuData.items}
        ref={categoryRefs}
      />

      <FloatingCategoryButton
        categories={menuData.categories as Category[]}
        onSelect={scrollToCategory}
      />

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
