"use client";

import { useEffect, useRef, useState } from "react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const counterRef = useRef({ value: 0 });

  const shortNameLetters = CAFE_CONFIG.shortName.split("");
  const taglineChars = CAFE_CONFIG.loader.text.split("");

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const tl = gsap.timeline();

      // Phase 2: Gold line and NOIR reveal
      tl.to(".loader-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.6
      });

      tl.fromTo(".letter",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.8,
          ease: "expo.out"
        },
        "-=0.6"
      );

      // Phase 3: Tagline typing & Counter
      tl.fromTo(".tagline-char",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.02,
          duration: 0.05,
          ease: "none"
        },
        "-=0.4"
      );

      // Monospace Counter Animation
      gsap.to(counterRef.current, {
        value: 100,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          setDisplayProgress(Math.floor(counterRef.current.value));
        },
        onComplete: () => {
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              setShowCurtain(true);
              setTimeout(onComplete, 1200);
            }, 800);
          }, 400);
        }
      });
    };

    initGSAP();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <AnimatePresence>
        {!showCurtain && (
          <motion.div
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-bg pointer-events-auto"
          >
            <div className="grain-overlay" />
            <div className="scanlines" />

            {/* Pulsing Radial Glow */}
            <div className="absolute w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[100px] glow-pulse pointer-events-none" />

            <div className="relative flex flex-col items-center">
              <div className="flex overflow-hidden mb-8">
                {shortNameLetters.map((letter, i) => (
                  <span key={i} className="letter inline-block text-[18vw] md:text-[15vw] font-heading text-accent leading-none">
                    {letter}
                  </span>
                ))}
              </div>
              <div className="loader-line w-[60vw] md:w-[30vw] h-[1px] bg-accent/40 origin-center scale-x-0 mb-8"></div>
              <p className="flex flex-wrap justify-center max-w-md px-4">
                {taglineChars.map((char, i) => (
                  <span key={i} className="tagline-char text-textMuted font-body text-[10px] tracking-[0.4em] uppercase">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </div>

            <div className="absolute bottom-12 right-12 font-body font-mono text-accent text-3xl tabular-nums opacity-60">
              {displayProgress.toString().padStart(3, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCurtain && (
          <>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-bg z-[110]"
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-bg z-[110]"
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
