"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function TransitionOverlay({ isTriggered, onComplete }: { isTriggered: boolean, onComplete: () => void }) {
  return (
    <AnimatePresence>
      {isTriggered && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          {/* Sweep Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-accent z-[220] origin-center"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {/* Black Fill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-bg z-[210]"
            transition={{ duration: 0.3, delay: 0.2 }}
            onAnimationComplete={() => {
              if (isTriggered) {
                setTimeout(onComplete, 300);
              }
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
