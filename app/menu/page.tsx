"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import menuDataRaw from "@/data/menu.json";
import MenuGrid from "@/components/MenuGrid";
import FilterBar from "@/components/FilterBar";
import FloatingCategoryButton from "@/components/FloatingCategoryButton";
import PageTransition from "@/components/PageTransition";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { MenuData, Category } from "@/types/menu";

const menuData = menuDataRaw as unknown as MenuData;

function MenuContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get("table");
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);
  const [activeVeg, setActiveVeg] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const toggleTag = (tag: string) => {
    if (tag === 'All') {
      setActiveTags([]);
      return;
    }
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const scrollToCategory = (categoryId: string) => {
    const el = categoryRefs.current[categoryId];
    if (el) {
      const offset = 160; // Offset for header + filter bar
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
        threshold: 0.1,
        rootMargin: "-160px 0px -40% 0px"
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeVeg, activeTags]);

  return (
    <div className="min-h-screen pb-32">
      {/* Minimal Sticky Header */}
      <header className="sticky top-0 z-50 h-12 flex items-center justify-between px-6 bg-black/60 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-accent/40 flex items-center justify-center rounded-sm">
            <span className="text-accent font-heading text-xs">{CAFE_CONFIG.shortName[0]}</span>
          </div>
          <span className="text-text font-body text-[11px] tracking-[0.2em] uppercase font-bold">
            {CAFE_CONFIG.name}
          </span>
        </div>
        {table && (
          <div className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest">Table {table}</span>
          </div>
        )}
      </header>

      {/* Filter Bar */}
      <FilterBar
        activeVeg={activeVeg}
        setActiveVeg={setActiveVeg}
        activeTags={activeTags}
        toggleTag={toggleTag}
      />

      <div className="px-4">
        <MenuGrid
          categories={menuData.categories as Category[]}
          items={menuData.items}
          ref={categoryRefs}
          activeVeg={activeVeg}
          activeTags={activeTags}
        />
      </div>

      <FloatingCategoryButton
        categories={menuData.categories as Category[]}
        onSelect={scrollToCategory}
      />

      <footer className="mt-24 text-center border-t border-border pt-12">
        <div className="text-accent font-heading text-2xl mb-4">{CAFE_CONFIG.name}</div>
        <p className="text-textMuted/50 text-[9px] tracking-widest uppercase">Powered by Pixora Studios</p>
      </footer>
    </div>
  );
}

export default function MenuPage() {
  return (
    <PageTransition>
      <main className="bg-bg text-text min-h-screen">
        {/* Grain & Scanlines */}
        <div className="grain-overlay opacity-40" />
        <div className="scanlines opacity-10" />

        <Suspense fallback={<div className="h-screen flex items-center justify-center font-heading text-accent text-3xl">Loading Menu...</div>}>
          <MenuContent />
        </Suspense>
      </main>
    </PageTransition>
  );
}
