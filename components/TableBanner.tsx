"use client";

import { motion } from "framer-motion";

export default function TableBanner({ table }: { table: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex justify-center"
    >
      <div className="bg-accent/10 border border-accent/30 rounded-full px-6 py-2 backdrop-blur-sm">
        <span className="text-accent font-body text-xs font-bold uppercase tracking-[0.2em]">
          Table {table}
        </span>
      </div>
    </motion.div>
  );
}
