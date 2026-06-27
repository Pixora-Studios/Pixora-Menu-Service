"use client";

import { useEffect, useRef, useState } from "react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shortNameLetters = CAFE_CONFIG.shortName.split("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = CAFE_CONFIG.loader.duration;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 1000);
        }, 500);
      }
    };

    interval = setInterval(updateProgress, 50);

    // GSAP dynamic import
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline();

      tl.fromTo(".letter",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "expo.out" }
      );

      tl.fromTo(".loader-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.5"
      );

      tl.fromTo(".tagline",
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=1"
      );
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundColor: CAFE_CONFIG.theme.bg }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Grain Texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/noise.png')]"></div>

          <div className="relative flex flex-col items-center">
            <div className="flex overflow-hidden mb-4">
              {shortNameLetters.map((letter, i) => (
                <span
                  key={i}
                  className="letter inline-block text-[15vw] md:text-[12vw] font-heading text-accent leading-none"
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="loader-line w-64 h-[1px] bg-accent/40 origin-center mb-6"></div>

            <p className="tagline text-textMuted font-body text-xs md:text-sm tracking-[0.4em] uppercase text-center px-4">
              {CAFE_CONFIG.loader.text}
            </p>
          </div>

          <div className="absolute bottom-12 right-12 font-heading text-accent text-4xl md:text-6xl tabular-nums opacity-50">
            {progress.toString().padStart(3, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
