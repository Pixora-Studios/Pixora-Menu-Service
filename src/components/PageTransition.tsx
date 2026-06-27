"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "./useReducedMotion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -20,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
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
  );
}
