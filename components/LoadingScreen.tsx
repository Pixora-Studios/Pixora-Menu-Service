"use client";

import { useEffect, useRef, useState } from "react";
import { CAFE_CONFIG } from "@/config/cafe.config";
import { motion, AnimatePresence } from "framer-motion";

type Props = { onComplete: () => void };

export default function LoadingScreen({ onComplete }: Props) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "curtain" | "done">("loading");
  const counterRef = useRef({ value: 0 });
  const hasRun = useRef(false);

  const letters = CAFE_CONFIG.shortName.split("");
  const taglineChars = CAFE_CONFIG.loader.text.split("");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      const { gsap } = await import("gsap");

      // Reset state
      gsap.set(".nl-letter", { y: 32, opacity: 0, filter: "blur(8px)" });
      gsap.set(".nl-tagline-char", { opacity: 0 });
      gsap.set(".nl-line", { scaleX: 0, transformOrigin: "center" });
      gsap.set(".nl-counter", { opacity: 0 });
      gsap.set(".nl-badge", { opacity: 0 });

      const tl = gsap.timeline();

      // Gold line sweep
      tl.to(".nl-line", {
        scaleX: 1,
        duration: 1.0,
        ease: "power3.inOut",
        delay: 0.3,
      });

      // Letters bloom up
      tl.to(
        ".nl-letter",
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.09,
          duration: 0.9,
          ease: "expo.out",
        },
        "-=0.7"
      );

      // Tagline typewriter
      tl.to(
        ".nl-tagline-char",
        {
          opacity: 1,
          stagger: 0.03,
          duration: 0.04,
          ease: "none",
        },
        "-=0.4"
      );

      // Fade in counter & badge
      tl.to(".nl-counter", { opacity: 0.65, duration: 0.4 }, "-=1.4");
      tl.to(".nl-badge", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=1.2");

      // Progress counter — runs in parallel with timeline
      gsap.to(counterRef.current, {
        value: 100,
        duration: 2.6,
        ease: "power1.inOut",
        onUpdate() {
          setDisplayProgress(Math.floor(counterRef.current.value));
        },
        onComplete() {
          setTimeout(() => {
            setPhase("curtain");
            setTimeout(() => {
              setPhase("done");
              onComplete();
            }, 1300);
          }, 300);
        },
      });
    };

    run();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
            style={{ backgroundColor: CAFE_CONFIG.theme.bg }}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
              }}
            />

            {/* Ambient glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "60vw",
                height: "60vw",
                background: `radial-gradient(circle, ${CAFE_CONFIG.theme.accent}0F 0%, transparent 70%)`,
                animation: "pulse 4s ease-in-out infinite",
              }}
            />

            {/* Center content */}
            <div className="relative flex flex-col items-center">
              {/* Brand name */}
              <div className="flex overflow-hidden mb-7" aria-label={CAFE_CONFIG.shortName}>
                {letters.map((letter, i) => (
                  <span
                    key={i}
                    className="nl-letter inline-block leading-none select-none"
                    style={{
                      fontFamily: `'${CAFE_CONFIG.fonts.heading}', serif`,
                      fontSize: "clamp(72px, 18vw, 130px)",
                      fontWeight: 300,
                      color: CAFE_CONFIG.theme.accent,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Horizontal rule */}
              <div
                className="nl-line mb-6"
                style={{
                  width: "min(240px, 50vw)",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${CAFE_CONFIG.theme.accent}, transparent)`,
                }}
              />

              {/* Tagline */}
              <p className="flex flex-wrap justify-center px-6">
                {taglineChars.map((char, i) => (
                  <span
                    key={i}
                    className="nl-tagline-char"
                    style={{
                      fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                      fontSize: "10px",
                      letterSpacing: "0.45em",
                      color: CAFE_CONFIG.theme.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </div>

            {/* Progress counter */}
            <div
              className="nl-counter absolute bottom-10 right-10 tabular-nums"
              style={{
                fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 300,
                color: CAFE_CONFIG.theme.accent,
                letterSpacing: "0.05em",
              }}
            >
              {displayProgress.toString().padStart(3, "0")}
            </div>

            {/* Subtle bottom-left badge */}
            <div
              className="nl-badge absolute bottom-11 left-10"
              style={{
                fontFamily: `'${CAFE_CONFIG.fonts.body}', sans-serif`,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: CAFE_CONFIG.theme.border,
                textTransform: "uppercase",
              }}
            >
              Est. 2024&nbsp;&nbsp;·&nbsp;&nbsp;Handcrafted
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtain reveal */}
      <AnimatePresence>
        {phase === "curtain" && (
          <>
            <motion.div
              key="curtain-top"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-0 left-0 right-0 h-1/2 z-[110]"
              style={{ backgroundColor: CAFE_CONFIG.theme.bg }}
            />
            <motion.div
              key="curtain-bot"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="absolute bottom-0 left-0 right-0 h-1/2 z-[110]"
              style={{ backgroundColor: CAFE_CONFIG.theme.bg }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Pulse keyframe injected once */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}