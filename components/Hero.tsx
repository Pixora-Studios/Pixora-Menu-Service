"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, useScroll, useTransform } from "framer-motion";
import TransitionOverlay from "./TransitionOverlay";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const table = searchParams.get("table");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Split name into lines: max 2 words per line for cinematic feel
  const words = CAFE_CONFIG.name.split(" ");
  const nameLines = words.length > 2
    ? [words.slice(0, 2).join(" "), words.slice(2).join(" ")]
    : [CAFE_CONFIG.name];

  const taglineChars = CAFE_CONFIG.tagline.split("");

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
  };

  const completeNavigation = () => {
    router.push(`/menu${table ? `?table=${table}` : ""}`);
  };

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from(".ornament-line", {
          scaleX: 0,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        })
        .from(".hero-char", {
          y: 80,
          opacity: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out"
        }, "-=1.2")
        .from(".hero-rule", {
          scaleX: 0,
          duration: 1,
          ease: "expo.out"
        }, "-=0.8")
        .from(".hero-tagline-char", {
          opacity: 0,
          duration: 0.1,
          stagger: 0.03,
          ease: "none"
        }, "-=0.6")
        .from(".hero-bottom-left", { x: -30, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.8")
        .from(".hero-bottom-right", { x: 30, opacity: 0, duration: 1, ease: "expo.out" }, "-=1")
        .from(".hero-bottom-center", { y: 20, opacity: 0, duration: 1, ease: "expo.out" }, "-=1");
      }, containerRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[130vh] w-full overflow-hidden bg-bg">
      <TransitionOverlay isTriggered={isTransitioning} onComplete={completeNavigation} />

      {/* LAYER 1: Background Image */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <Image
          src={CAFE_CONFIG.heroImage}
          alt={CAFE_CONFIG.name}
          fill
          priority
          unoptimized
          className="object-cover animate-ken-burns"
        />
        {/* LAYER 2: Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/95" />
        {/* LAYER 3: Noise Grain */}
        <div className="grain-overlay opacity-40" />
      </motion.div>

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-10 py-12">
        <span className="text-accent text-[9px] tracking-[0.5em] uppercase font-body font-bold">EST. 2024</span>
        <div className="flex gap-6">
          {CAFE_CONFIG.social.instagram && (
            <a href={CAFE_CONFIG.social.instagram} className="text-white/80 hover:text-accent transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* MIDDLE CONTENT */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="ornament-line w-16 h-[1.5px] bg-accent mb-12 origin-center" />

        <h1 className="text-center mb-10">
          {nameLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <span className="hero-char inline-block text-[16vw] md:text-[13vw] font-heading text-accent leading-[0.85]">
                {line}
              </span>
            </div>
          ))}
        </h1>

        <div className="hero-rule w-40 h-[1px] bg-accent/40 mb-8 origin-center" />

        <p className="flex flex-wrap justify-center text-white/90 text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-center max-w-sm font-body">
          {taglineChars.map((char, i) => (
            <span key={i} className="hero-tagline-char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </motion.div>

      {/* BOTTOM SECTION */}
      <div className="absolute bottom-24 left-0 right-0 z-20 px-10">
        <div className="relative w-full h-24 max-w-7xl mx-auto flex items-end">
          {/* Left side: TABLE pill */}
          <div className="hero-bottom-left flex flex-col gap-3">
            {table && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-xl shadow-2xl">
                <span className="text-accent font-body text-[10px] tracking-[0.2em] uppercase font-bold">Table {table}</span>
              </div>
            )}
            <span className="text-textMuted text-[8px] tracking-[0.35em] uppercase pl-1">Scan to order</span>
          </div>

          {/* Center bottom: EXPLORE MENU */}
          <div className="hero-bottom-center absolute left-1/2 -translate-x-1/2 bottom-0 group">
            <button
              onClick={handleExplore}
              className="text-white font-body text-[11px] tracking-[0.45em] uppercase transition-colors hover:text-accent pointer-events-auto pb-1"
            >
              Explore Menu →
            </button>
            <div className="w-0 h-[1px] bg-accent transition-all duration-700 group-hover:w-full mx-auto" />
          </div>

          {/* Right side: Vertical text SCROLL */}
          <div className="hero-bottom-right ml-auto hidden md:flex flex-col items-center gap-6 opacity-30">
            <span className="text-[9px] tracking-[0.5em] vertical-text uppercase">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
