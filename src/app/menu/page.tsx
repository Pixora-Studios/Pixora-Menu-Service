"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { menuData, categories } from "@/data/menu";
import { cafeConfig } from "@/config/cafe";
import FilterPills from "@/components/FilterPills";
import CategorySection from "@/components/CategorySection";
import FloatingCategoryDrawer from "@/components/FloatingCategoryDrawer";

export default function MenuPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  // Refs for category sections
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredMenu = useMemo(() => {
    if (activeFilter === "All") return menuData;

    return menuData.filter((item) => {
      if (activeFilter === "Veg") return item.tags.includes("veg");
      if (activeFilter === "Non-Veg") return item.tags.includes("non-veg");
      if (activeFilter === "Spicy") return item.tags.includes("spicy");
      if (activeFilter === "Bestseller") return item.tags.includes("bestseller");
      if (activeFilter === "New") return item.tags.includes("new");
      if (activeFilter === "Combos") return item.tags.includes("combo");
      return true;
    });
  }, [activeFilter]);

  const scrollToCategory = (category: string) => {
    const ref = categoryRefs.current[category];
    if (ref) {
      const topOffset = 120; // top bar + filter bar approx height
      const elementPosition = ref.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Calculate cumulative index for alternate layout across filtered list
  let cumulativeIndex = 0;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass-morphism h-[60px] flex items-center justify-between px-6">
        <button
          onClick={() => router.push("/home")}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5"
        >
          <ChevronLeft size={24} className="text-text-primary" />
        </button>
        <h1 className="text-xl font-playfair font-bold text-text-primary">
          Menu
        </h1>
        <div className="relative w-8 h-8">
          <Image
            src={cafeConfig.logo}
            alt={cafeConfig.name}
            fill
            className="object-contain"
          />
        </div>
      </header>

      {/* Filter Pills */}
      <FilterPills
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Menu Sections */}
      <main className="mt-4">
        {categories.map((category) => {
          const categoryItems = filteredMenu.filter(
            (item) => item.category === category
          );

          if (categoryItems.length === 0) return null;

          const sectionStartIndex = cumulativeIndex;
          cumulativeIndex += categoryItems.length;

          return (
            <CategorySection
              key={category}
              ref={(el: HTMLDivElement | null) => {
                categoryRefs.current[category] = el;
              }}
              category={category}
              items={categoryItems}
              startIndex={sectionStartIndex}
            />
          );
        })}
      </main>

      {/* FAB Drawer */}
      <FloatingCategoryDrawer onCategoryClick={scrollToCategory} />
    </div>
  );
}
