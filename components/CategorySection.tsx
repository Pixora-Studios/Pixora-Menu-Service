"use client";

import { useEffect, useRef, forwardRef } from "react";
import { Category } from "@/types/menu";

interface CategorySectionProps {
  category: Category;
  children: React.ReactNode;
}

const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ category, children }, ref) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let ctx: any;

      const initGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (headerRef.current) {
            gsap.fromTo(headerRef.current,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: "top 90%",
                  toggleActions: "play none none none"
                }
              }
            );
          }
        }, containerRef);
      };

      initGSAP();
      return () => ctx?.revert();
    }, []);

    return (
      <section
        ref={(el) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
          (containerRef as any).current = el;
        }}
        data-category={category.id}
        className="pt-10 pb-4 scroll-mt-24"
      >
        <div ref={headerRef} className="flex items-center space-x-4 mb-8">
          <span className="text-accent text-xl">{category.icon}</span>
          <h2 className="text-accent font-body text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">
            {category.label}
          </h2>
          <div className="h-[1px] flex-grow bg-accent/30"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {children}
        </div>
      </section>
    );
  }
);

CategorySection.displayName = "CategorySection";

export default CategorySection;
