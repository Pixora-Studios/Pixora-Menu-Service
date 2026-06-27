"use client";

import { forwardRef } from "react";
import { MenuItem, Category } from "@/types/menu";
import MenuCard from "./MenuCard";
import ComboCard from "./ComboCard";
import SpecialCard from "./SpecialCard";
import CategorySection from "./CategorySection";

interface MenuGridProps {
  categories: Category[];
  items: MenuItem[];
  activeVeg: string;
  activeTags: string[];
}

const MenuGrid = forwardRef<Record<string, HTMLElement | null>, MenuGridProps>(
  ({ categories, items, activeVeg, activeTags }, ref) => {

    const isItemVisible = (item: MenuItem) => {
      // Veg/Non-veg filter
      if (activeVeg === 'veg' && !item.tags?.includes('veg')) return false;
      if (activeVeg === 'non-veg' && !item.tags?.includes('non-veg')) return false;

      // Tag chips filter (if any active tags, item must have at least one)
      if (activeTags.length > 0) {
        const itemTags = item.tags?.map(t => t.toLowerCase()) || [];
        const hasTag = activeTags.some(t => itemTags.includes(t.toLowerCase()));
        if (!hasTag) return false;
      }

      return true;
    };

    return (
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = items.filter(item => item.category === category.id);
          const visibleItems = categoryItems.filter(isItemVisible);

          if (visibleItems.length === 0) return null;

          return (
            <CategorySection
              key={category.id}
              category={category}
              ref={(el) => {
                if (ref && "current" in ref && ref.current) {
                  ref.current[category.id] = el;
                }
              }}
            >
              {visibleItems.map((item) => {
                if (category.type === "special") return <SpecialCard key={item.id} item={item} />;
                if (category.type === "combo") return <ComboCard key={item.id} item={item} />;
                return <MenuCard key={item.id} item={item} />;
              })}
            </CategorySection>
          );
        })}
      </div>
    );
  }
);

MenuGrid.displayName = "MenuGrid";

export default MenuGrid;
