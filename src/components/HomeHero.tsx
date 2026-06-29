"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cafeConfig } from "@/config/cafe";
import { useReducedMotion } from "./useReducedMotion";

export default function HomeHero() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const handleMenuClick = () => {
    // Shared-element style transition logic
    // We navigate to /menu, the PageTransition component will handle the exit/enter
    router.push("/menu");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-center min-h-[100dvh] px-8 text-center overflow-hidden bg-background"
    >
      {/* Background Blobs */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-secondary opacity-[0.12] blur-[80px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-64 h-64 bg-primary opacity-[0.12] blur-[80px] rounded-full" />
        </>
      )}

      {/* Pill Badge */}
      <motion.div
        variants={itemVariants}
        className="glass-morphism px-4 py-1.5 rounded-full mb-8"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted">
          ✦ Est. 2024
        </span>
      </motion.div>

      {/* Logo */}
      <motion.div variants={itemVariants} className="relative w-24 h-24 mb-6">
        <Image
          src={cafeConfig.logo}
          alt={cafeConfig.name}
          fill
          className="object-contain drop-shadow-clay"
          sizes="96px"
        />
      </motion.div>

      {/* Cafe Name */}
      <motion.h2
        variants={itemVariants}
        className="text-5xl font-playfair font-bold text-text-primary mb-4 leading-tight"
      >
        {cafeConfig.name}
      </motion.h2>

      {/* Anthem */}
      <motion.p
        variants={itemVariants}
        className="text-base font-sans italic text-text-muted mb-8 leading-relaxed max-w-[280px]"
      >
        {cafeConfig.anthem}
      </motion.p>

      {/* Decorative Divider */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 mb-12 w-full max-w-[200px]"
      >
        <div className="h-[1px] flex-1 bg-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <div className="h-[1px] flex-1 bg-primary/30" />
      </motion.div>

      {/* View Menu Button */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.95 }}
        onClick={handleMenuClick}
        layoutId="menu-button"
        className="w-full py-4 bg-primary text-white rounded-full font-medium shadow-clay relative z-10"
      >
        View Menu
      </motion.button>
    </motion.div>
  );
}
