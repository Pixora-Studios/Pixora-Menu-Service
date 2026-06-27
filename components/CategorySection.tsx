"use client";

import { useEffect, useRef, forwardRef } from "react";
import { Category } from "@/types/menu";

interface CategorySectionProps {
  category: Category;
  children: React.ReactNode;
  hidden?: boolean;
}

const CategorySection = forwardRef<HTMLElement, CategorySectionProps>(
  ({ category, children, hidden }, ref) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      let ctx: any;
      const initGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (headerRef.current && !hidden) {
            gsap.fromTo(".section-line",
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.2,
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: "top 95%",
                }
              }
            );
          }
        }, containerRef);
      };

      initGSAP();
      return () => ctx?.revert();
    }, [hidden]);

    if (hidden) return null;

    return (
      <section
        ref={(el) => {
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
          (containerRef as any).current = el;
        }}
        data-category={category.id}
        className="pt-12 pb-6 scroll-mt-24"
      >
        <div ref={headerRef} className="flex items-center justify-center space-x-6 mb-10">
          <div className="section-line flex-1 h-[1px] bg-accent/30 origin-right"></div>
          <div className="flex items-center space-x-3">
            <span className="text-accent text-sm opacity-80">{category.icon}</span>
            <h2 className="text-textMuted font-body text-[9px] tracking-[0.5em] uppercase whitespace-nowrap">
              {category.label}
            </h2>
          </div>
          <div className="section-line flex-1 h-[1px] bg-accent/30 origin-left"></div>
        </div>
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </section>
    );
  }
);

CategorySection.displayName = "CategorySection";

export default CategorySection;
