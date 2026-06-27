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
}

const MenuGrid = forwardRef<Record<string, HTMLDivElement | null>, MenuGridProps>(
  ({ categories, items }, ref) => {
    return (
      <div className="space-y-12 mt-12">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            ref={(el) => {
              if (ref && "current" in ref && ref.current) {
                ref.current[category.id] = el;
              }
            }}
          >
            {items
              .filter((item) => item.category === category.id)
              .map((item) => {
                if (category.type === "special") return <SpecialCard key={item.id} item={item} />;
                if (category.type === "combo") return <ComboCard key={item.id} item={item} />;
                return <MenuCard key={item.id} item={item} />;
              })}
          </CategorySection>
        ))}
      </div>
    );
  }
);

MenuGrid.displayName = "MenuGrid";

export default MenuGrid;
