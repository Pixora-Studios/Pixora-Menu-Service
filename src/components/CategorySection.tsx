"use client";

import { forwardRef } from "react";
import { MenuItem } from "@/data/menu";
import MenuCard from "./MenuCard";

interface CategorySectionProps {
  category: string;
  items: MenuItem[];
  startIndex: number;
}

const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ category, items, startIndex }, ref) => {
    if (items.length === 0) return null;

    return (
      <section ref={ref} className="px-6 mb-10 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
            {category}
          </h2>
          <div className="h-[1px] flex-1 bg-primary/10" />
        </div>

        <div className="flex flex-col">
          {items.map((item, idx) => (
            <MenuCard key={item.id} item={item} index={startIndex + idx} />
          ))}
        </div>
      </section>
    );
  }
);

CategorySection.displayName = "CategorySection";

export default CategorySection;
