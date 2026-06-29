"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "./useReducedMotion";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: shouldReduceMotion ? 0 : 10,
    },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  if (!isMounted) {
    return (
      <div className="bg-background min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variants}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
