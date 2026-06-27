"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const nameLines = CAFE_CONFIG.name.split(" ");
  const taglineChars = CAFE_CONFIG.tagline.split("");

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from(".ornament", {
          scaleX: 0,
          opacity: 0,
          duration: 1,
          ease: "expo.out"
        })
        .from(".hero-char", {
          y: 80,
          opacity: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out"
        }, "-=0.5")
        .from(".hero-rule", {
          scaleX: 0,
          duration: 0.8,
          ease: "expo.out"
        }, "-=0.8")
        .from(".hero-tagline-char", {
          opacity: 0,
          duration: 0.1,
          stagger: 0.03,
          ease: "none"
        }, "-=0.4")
        .from(".hero-bottom", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out"
        }, "-=0.6");
      }, containerRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-bg">
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <Image
          src={CAFE_CONFIG.heroImage}
          alt={CAFE_CONFIG.name}
          fill
          priority
          unoptimized
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg/95" />
        <div className="grain-overlay opacity-40" />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-10">
        <span className="text-accent text-[9px] tracking-[0.5em] uppercase font-body">EST. 2024</span>
        <div className="flex gap-4">
          {CAFE_CONFIG.social.instagram && (
            <a href={CAFE_CONFIG.social.instagram} className="text-white hover:text-accent transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          )}
        </div>
      </div>

      <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="ornament w-16 h-[1px] bg-accent mb-12 origin-center" />
        <h1 className="text-center mb-6">
          {nameLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <span className="hero-char inline-block text-[15vw] md:text-[12vw] font-heading text-accent leading-[0.9]">
                {line}
              </span>
            </div>
          ))}
        </h1>
        <div className="hero-rule w-32 h-[1px] bg-accent/40 mb-6 origin-center" />
        <p className="flex flex-wrap justify-center text-textMuted text-[10px] md:text-sm tracking-[0.5em] uppercase text-center max-w-sm">
          {taglineChars.map((char, i) => (
            <span key={i} className="hero-tagline-char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </motion.div>

      <div className="absolute bottom-24 left-0 right-0 z-20 px-8 flex flex-col items-center">
        <div className="hero-bottom w-full flex justify-between items-end max-w-7xl">
          <div className="flex flex-col gap-2">
            {table && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-accent font-body text-[10px] tracking-widest uppercase">Table {table}</span>
              </div>
            )}
            <span className="text-textMuted text-[8px] tracking-[0.3em] uppercase">Scan to order</span>
          </div>

          <div className="group relative">
            <Link href={`/menu${table ? `?table=${table}` : ""}`} className="text-text font-body text-xs tracking-[0.4em] uppercase transition-colors hover:text-accent pointer-events-auto">
              Explore Menu →
            </Link>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
          </div>

          <div className="hidden md:flex flex-col items-center gap-4 opacity-40">
            <span className="text-[9px] tracking-[0.4em] vertical-text uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
