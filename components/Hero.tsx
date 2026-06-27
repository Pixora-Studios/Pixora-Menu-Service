"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const nameWords = CAFE_CONFIG.name.split(" ");

  useEffect(() => {
    // Dynamic GSAP Import
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Text Reveal
        gsap.from(".hero-word", {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.5
        });

        gsap.from(".hero-tagline", {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
          delay: 1.2
        });

        // Parallax Effect
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }, containerRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end">
      {/* Background Image with Ken Burns */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={CAFE_CONFIG.heroImage}
          alt={CAFE_CONFIG.name}
          fill
          priority
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-16 h-16 border border-accent/30 flex items-center justify-center rounded-full">
              <span className="text-accent font-heading text-2xl">{CAFE_CONFIG.shortName[0]}</span>
            </div>
          </motion.div>

          <h1 ref={titleRef} className="flex flex-wrap justify-center md:justify-start gap-x-4 mb-6">
            {nameWords.map((word, i) => (
              <span key={i} className="overflow-hidden">
                <span className="hero-word inline-block text-6xl md:text-9xl font-heading text-text leading-none">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-tagline text-accent text-sm md:text-lg tracking-[0.5em] uppercase mb-12">
            {CAFE_CONFIG.tagline}
          </p>

          <motion.a
            href="/menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 overflow-hidden"
          >
            <span className="relative z-10 text-text uppercase tracking-widest text-xs font-body">Explore Menu</span>
            <div className="absolute inset-0 border border-accent/50 group-hover:border-accent transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-500"></div>
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] vertical-text">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent animate-bounce"></div>
      </div>
    </section>
  );
}
