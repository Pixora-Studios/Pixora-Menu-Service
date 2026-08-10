"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { menuData, categories } from "@/data/menu";
import { cafeConfig } from "@/config/cafe";

// ─── Types ───────────────────────────────────────────────────────────────────
type MenuItem = (typeof menuData)[number];
type MenuTag = MenuItem["tags"][number];

// ─── Constants ───────────────────────────────────────────────────────────────────
const FILTERS = ["All", "Veg", "Non-Veg", "Spicy", "Bestseller", "New", "Combos"] as const;
type Filter = (typeof FILTERS)[number];

type FilterTag = Exclude<Filter, "All">;

const TAG_MAP: Record<FilterTag, MenuTag> = {
  Veg: "veg",
  "Non-Veg": "non-veg",
  Spicy: "spicy",
  Bestseller: "bestseller",
  New: "new",
  Combos: "combo",
};

// ─── Tag badge colours ────────────────────────────────────────────────────────
function tagStyle(tag: string): { bg: string; text: string } {
  if (tag === "veg") return { bg: "#E8F5E9", text: "#2E7D32" };
  if (tag === "non-veg") return { bg: "#FBE9E7", text: "#BF360C" };
  if (tag === "spicy") return { bg: "#FFF3E0", text: "#E65100" };
  if (tag === "bestseller") return { bg: "#EDE7F6", text: "#4527A0" };
  if (tag === "new") return { bg: "#E3F2FD", text: "#0D47A1" };
  if (tag === "combo") return { bg: "#F3E5F5", text: "#6A1B9A" };
  return { bg: "#F5F5F5", text: "#424242" };
}

function tagLabel(tag: string): string {
  const map: Record<string, string> = {
    veg: "Veg",
    "non-veg": "Non-Veg",
    spicy: "Spicy",
    bestseller: "Bestseller",
    new: "New",
    combo: "Combo",
  };
  return map[tag] ?? tag;
}

// ─── Menu Item Row ────────────────────────────────────────────────────────────
function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = item.imageUrl && !imgError;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "1px solid #F0EBE3",
        position: "relative",
      }}
    >
      {/* Index number */}
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "11px",
          fontWeight: 400,
          color: "#C9B49A",
          letterSpacing: "0.08em",
          minWidth: "20px",
          paddingTop: "3px",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#1A1A1A",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </span>
          {/* Primary tag */}
          {item.tags[0] && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "20px",
                background: tagStyle(item.tags[0]).bg,
                color: tagStyle(item.tags[0]).text,
                whiteSpace: "nowrap",
              }}
            >
              {tagLabel(item.tags[0])}
            </span>
          )}
        </div>

        {item.description && (
          <p
            style={{
              margin: "6px 0 10px",
              fontSize: "13px",
              color: "#8A7968",
              lineHeight: 1.55,
              fontStyle: "italic",
            }}
          >
            {item.description}
          </p>
        )}

        {/* Extra tags (skip first) */}
        {item.tags.length > 1 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
            {item.tags.slice(1).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  padding: "2px 7px",
                  borderRadius: "20px",
                  background: tagStyle(tag).bg,
                  color: tagStyle(tag).text,
                }}
              >
                {tagLabel(tag)}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#7B5E3A",
            letterSpacing: "-0.01em",
          }}
        >
          ₹{item.price}
        </span>
      </div>

      {/* Image */}
      {hasImage && (
        <div
          style={{
            flexShrink: 0,
            width: "88px",
            height: "88px",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#F5EFE8",
            position: "relative",
          }}
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="88px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────
const CategorySection = ({
  category,
  items,
  startIndex,
  innerRef,
}: {
  category: string;
  items: MenuItem[];
  startIndex: number;
  innerRef: (el: HTMLDivElement | null) => void;
}) => (
  <section
    ref={innerRef}
    style={{ padding: "0 20px", marginBottom: "8px" }}
  >
    {/* Category heading */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "28px 0 4px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#1A1A1A",
          margin: 0,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {category}
      </h2>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, #D4C4B0, transparent)",
        }}
      />
      <span
        style={{
          fontSize: "11px",
          color: "#B0A090",
          fontWeight: 500,
          letterSpacing: "0.06em",
        }}
      >
        {items.length} items
      </span>
    </div>

    {/* Items */}
    <div>
      {items.map((item, i) => (
        <MenuItemRow key={item.id ?? item.name} item={item} index={startIndex + i} />
      ))}
    </div>
  </section>
);

// ─── Filter Sheet ─────────────────────────────────────────────────────────────
function FilterSheet({
  active,
  onSelect,
  onClose,
}: {
  active: Filter;
  onSelect: (f: Filter) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          zIndex: 50,
        }}
      />
      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          padding: "20px 20px 36px",
          zIndex: 51,
          boxShadow: "0 -4px 40px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "4px",
            borderRadius: "2px",
            background: "#E0D6CA",
            margin: "0 auto 20px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            Filter Menu
          </span>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid #EDE8E1",
              background: "#FAFAF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} color="#8A7968" />
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => { onSelect(f); onClose(); }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: isActive ? "1.5px solid #7B5E3A" : "1px solid #EDE8E1",
                  background: isActive ? "#7B5E3A" : "#FAFAF8",
                  color: isActive ? "#FFFFFF" : "#3D3026",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Category Drawer (FAB) ────────────────────────────────────────────────────
function CategoryDrawer({
  onCategoryClick,
  onClose,
  filteredCategories,
}: {
  onCategoryClick: (c: string) => void;
  onClose: () => void;
  filteredCategories: string[];
}) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          padding: "20px 20px 36px",
          zIndex: 51,
          maxHeight: "60vh",
          overflowY: "auto",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "4px",
            borderRadius: "2px",
            background: "#E0D6CA",
            margin: "0 auto 20px",
          }}
        />
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: "0 0 16px",
          }}
        >
          Jump to
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {filteredCategories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => { onCategoryClick(cat); onClose(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "13px 4px",
                background: "transparent",
                border: "none",
                borderBottom: i < filteredCategories.length - 1 ? "1px solid #F5EFE8" : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "11px",
                  color: "#C9B49A",
                  minWidth: "20px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredMenu = useMemo(() => {
    if (activeFilter === "All") return menuData;
    const tag = TAG_MAP[activeFilter] as MenuTag;
    return menuData.filter((item) => item.tags.includes(tag));
  }, [activeFilter]);

  const visibleCategories = useMemo(
    () => categories.filter((cat) => filteredMenu.some((item) => item.category === cat)),
    [filteredMenu]
  );

  const scrollToCategory = (category: string) => {
    const ref = categoryRefs.current[category];
    if (!ref) return;
    const top = ref.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Sticky active category highlight via scroll
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      for (let i = visibleCategories.length - 1; i >= 0; i--) {
        const ref = categoryRefs.current[visibleCategories[i]];
        if (ref && ref.getBoundingClientRect().top <= 100) {
          setActiveCategory(visibleCategories[i]);
          return;
        }
      }
      setActiveCategory(visibleCategories[0] ?? "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCategories]);

  let cumulativeIndex = 0;

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
        * { -webkit-tap-highlight-color: transparent; }
        html, body { background: #FFFFFF; }
      `}</style>

      <div
        style={{
          background: "#FFFFFF",
          minHeight: "100vh",
          paddingBottom: "100px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Top Bar ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid #F0EBE3",
            height: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <button
            onClick={() => router.push("/home")}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid #EDE8E1",
              background: "#FAFAF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} color="#3D3026" />
          </button>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Menu
          </h1>

          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #EDE8E1",
              position: "relative",
            }}
          >
            <Image
              src={cafeConfig.logo}
              alt={cafeConfig.name}
              fill
              sizes="38px"
              className="object-contain"
            />
          </div>
        </header>

        {/* ── Active Category Eyebrow ── */}
        <div
          style={{
            padding: "10px 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#B0A090",
              textTransform: "uppercase",
            }}
          >
            {activeCategory}
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#F0EBE3",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#C9B49A",
              fontWeight: 500,
            }}
          >
            {filteredMenu.length} items
          </span>
        </div>

        {/* ── Filter Pill Row ── */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            padding: "12px 20px 0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: "20px",
                  border: isActive ? "1.5px solid #7B5E3A" : "1.5px solid #EDE8E1",
                  background: isActive ? "#7B5E3A" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#6B5D4F",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                  transition: "all 0.15s ease",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* ── Empty state ── */}
        {filteredMenu.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 20px",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "36px" }}>☕</span>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              Nothing here
            </p>
            <p style={{ fontSize: "13px", color: "#B0A090", margin: 0 }}>
              Try a different filter
            </p>
          </div>
        )}

        {/* ── Menu Sections ── */}
        <main style={{ marginTop: "8px" }}>
          {categories.map((category) => {
            const items = filteredMenu.filter((item) => item.category === category);
            if (items.length === 0) return null;

            const sectionStart = cumulativeIndex;
            cumulativeIndex += items.length;

            return (
              <CategorySection
                key={category}
                category={category}
                items={items}
                startIndex={sectionStart}
                innerRef={(el) => { categoryRefs.current[category] = el; }}
              />
            );
          })}
        </main>

        {/* ── FAB Row ── */}
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          {/* Filter FAB */}
          <button
            onClick={() => setShowFilter(true)}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              borderRadius: "50px",
              background: "#FFFFFF",
              border: "1px solid #E8DDD3",
              boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: "#3D3026",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            <SlidersHorizontal size={16} color={activeFilter !== "All" ? "#7B5E3A" : "#8A7968"} />
            {activeFilter !== "All" ? (
              <span style={{ color: "#7B5E3A", fontWeight: 600 }}>{activeFilter}</span>
            ) : (
              <span>Filter</span>
            )}
          </button>

          {/* Category FAB */}
          <button
            onClick={() => setShowCategories(true)}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              borderRadius: "50px",
              background: "#7B5E3A",
              border: "none",
              boxShadow: "0 4px 20px rgba(123,94,58,0.30)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.01em",
            }}
          >
            Categories
          </button>
        </div>

        {/* ── Sheets ── */}
        {showFilter && (
          <FilterSheet
            active={activeFilter}
            onSelect={setActiveFilter}
            onClose={() => setShowFilter(false)}
          />
        )}
        {showCategories && (
          <CategoryDrawer
            filteredCategories={visibleCategories}
            onCategoryClick={scrollToCategory}
            onClose={() => setShowCategories(false)}
          />
        )}
      </div>
    </>
  );
}
