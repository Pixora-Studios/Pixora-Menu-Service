"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import TransitionOverlay from "./TransitionOverlay";

type Props = { hasLoaded?: boolean };

export default function Hero({ hasLoaded = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const table = searchParams.get("table");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hasRun = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const taglineChars = CAFE_CONFIG.tagline.split("");

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.05));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    if (!hasLoaded || hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      const { gsap } = await import("gsap");

      const ctx = gsap.context(() => {
        gsap.set(".h-topbar", { y: -30, opacity: 0 });
        gsap.set(".h-ornament", { scaleX: 0, opacity: 0 });
        gsap.set(".h-title", { y: 60, opacity: 0, filter: "blur(12px)" });
        gsap.set(".h-rule", { scaleX: 0 });
        gsap.set(".h-tag-char", { opacity: 0 });
        gsap.set(".h-cta", { y: 20, opacity: 0 });
        gsap.set(".h-table-badge", { y: 10, opacity: 0 });
        gsap.set(".h-scroll", { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.15 });

        tl.to(".h-topbar", { y: 0, opacity: 1, duration: 1, ease: "expo.out" })
          .to(".h-ornament", { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.5")
          .to(".h-title", {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
          }, "-=0.9")
          .to(".h-rule", { scaleX: 1, duration: 1, ease: "expo.out" }, "-=0.8")
          .to(".h-tag-char", {
            opacity: 1,
            stagger: 0.025,
            duration: 0.04,
            ease: "none",
          }, "-=0.7")
          .to(".h-cta", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.5")
          .to(".h-table-badge", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.7")
          .to(".h-scroll", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
      }, containerRef);

      return () => ctx.revert();
    };

    run();
  }, [hasLoaded]);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
  };

  const completeNavigation = () => {
    router.push(`/menu${table ? `?table=${table}` : ""}`);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", backgroundColor: CAFE_CONFIG.theme.bg }}
    >
      <TransitionOverlay isTriggered={isTransitioning} onComplete={completeNavigation} />

      {/* ── BACKGROUND IMAGE ── */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={CAFE_CONFIG.heroImage}
          alt={CAFE_CONFIG.name}
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />

        {/* Heavy bottom-up dark gradient so text is always readable */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.15) 30%,
              rgba(0,0,0,0.10) 50%,
              rgba(0,0,0,0.70) 72%,
              rgba(0,0,0,0.97) 100%
            )`,
          }}
        />

        {/* Side darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />
      </motion.div>

      {/* ── TOP BAR ── */}
      <div
        className="h-topbar absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-10"
        style={{ paddingTop: "env(safe-area-inset-top, 20px)", marginTop: "20px" }}
      >
        {/* Est. badge */}
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-px"
            style={{ backgroundColor: CAFE_CONFIG.theme.accent + "80" }}
          />
          <span
            style={{
              fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
              fontSize: "9px",
              letterSpacing: "0.4em",
              color: CAFE_CONFIG.theme.accent,
              textTransform: "uppercase",
            }}
          >
            Est. 2024
          </span>
        </div>

        {/* Center wordmark */}
        <span
          style={{
            fontFamily: `'${CAFE_CONFIG.fonts.heading}', serif`,
            fontSize: "clamp(11px, 2.5vw, 14px)",
            letterSpacing: "0.5em",
            color: CAFE_CONFIG.theme.text + "90",
            textTransform: "uppercase",
            fontWeight: 300,
          }}
        >
          {CAFE_CONFIG.shortName}
        </span>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {CAFE_CONFIG.social.instagram && (
            <a
              href={CAFE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: CAFE_CONFIG.theme.text + "80" }}
              className="hover:opacity-100 transition-opacity"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          {CAFE_CONFIG.social.maps && (
            <a
              href={CAFE_CONFIG.social.maps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Location"
              style={{ color: CAFE_CONFIG.theme.text + "80" }}
              className="hover:opacity-100 transition-opacity"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ── HERO CONTENT — pinned to bottom third ── */}
      <motion.div
        style={{ opacity, paddingBottom: "clamp(90px, 18vh, 140px)" }}
        className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none select-none"
      >
        <div className="flex flex-col items-center px-6 text-center">

          {/* Ornament */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-ornament origin-right"
              style={{
                width: "clamp(28px, 6vw, 48px)",
                height: "1px",
                backgroundColor: CAFE_CONFIG.theme.accent + "90",
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: CAFE_CONFIG.theme.accent,
                flexShrink: 0,
              }}
            />
            <div
              className="h-ornament origin-left"
              style={{
                width: "clamp(28px, 6vw, 48px)",
                height: "1px",
                backgroundColor: CAFE_CONFIG.theme.accent + "90",
              }}
            />
          </div>

          {/* Cafe name — single animated block */}
          <h1
            className="h-title"
            style={{
              fontFamily: `'${CAFE_CONFIG.fonts.heading}', serif`,
              fontSize: "clamp(56px, 18vw, 128px)",
              fontWeight: 300,
              color: CAFE_CONFIG.theme.accent,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              marginBottom: "clamp(16px, 3vw, 28px)",
            }}
          >
            {CAFE_CONFIG.name}
          </h1>

          {/* Divider */}
          <div
            className="h-rule origin-center mb-5"
            style={{
              width: "clamp(60px, 20vw, 120px)",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${CAFE_CONFIG.theme.accent}80, transparent)`,
            }}
          />

          {/* Tagline */}
          <p
            className="flex flex-wrap justify-center mb-8"
            style={{ maxWidth: "280px" }}
          >
            {taglineChars.map((char, i) => (
              <span
                key={i}
                className="h-tag-char"
                style={{
                  fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                  fontSize: "clamp(8px, 2vw, 10px)",
                  letterSpacing: "0.4em",
                  color: CAFE_CONFIG.theme.text + "85",
                  textTransform: "uppercase",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          {/* ── CTA BUTTON ── */}
          <div className="h-cta pointer-events-auto">
            <button
              onClick={handleExplore}
              className="group relative overflow-hidden"
              aria-label="Explore the menu"
              style={{
                border: `1px solid ${CAFE_CONFIG.theme.accent}50`,
                borderRadius: "2px",
                padding: "14px 40px",
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "border-color 0.3s ease, background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = CAFE_CONFIG.theme.accent;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = CAFE_CONFIG.theme.accent + "15";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = CAFE_CONFIG.theme.accent + "50";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <span
                style={{
                  fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                  fontSize: "10px",
                  letterSpacing: "0.45em",
                  color: CAFE_CONFIG.theme.accent,
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Explore Menu
              </span>
            </button>
          </div>

        </div>
      </motion.div>

      {/* ── TABLE BADGE (bottom left) ── */}
      {table && (
        <div
          className="h-table-badge absolute z-30 left-6 md:left-10"
          style={{ bottom: "clamp(24px, 5vh, 40px)" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{
              border: `1px solid ${CAFE_CONFIG.theme.accent}35`,
              borderRadius: "4px",
              backgroundColor: CAFE_CONFIG.theme.accent + "0D",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: CAFE_CONFIG.theme.accent,
              }}
            />
            <span
              style={{
                fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: CAFE_CONFIG.theme.accent,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Table {table}
            </span>
          </div>
          <span
            style={{
              display: "block",
              marginTop: "6px",
              paddingLeft: "2px",
              fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
              fontSize: "8px",
              letterSpacing: "0.3em",
              color: CAFE_CONFIG.theme.textMuted,
              textTransform: "uppercase",
            }}
          >
            Scan to order
          </span>
        </div>
      )}

      {/* ── SCROLL INDICATOR (bottom right) ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="h-scroll absolute z-30 right-6 md:right-10 hidden md:flex flex-col items-center gap-3"
            style={{ bottom: "clamp(24px, 5vh, 40px)" }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
          >
            <span
              style={{
                fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                fontSize: "8px",
                letterSpacing: "0.5em",
                color: CAFE_CONFIG.theme.textMuted,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ scaleY: [1, 0.35, 1], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "1px",
                height: "48px",
                background: `linear-gradient(to bottom, ${CAFE_CONFIG.theme.accent}, transparent)`,
                transformOrigin: "top",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
