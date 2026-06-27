"use client";

import { motion } from "framer-motion";

export default function TableBanner({ table }: { table: string }) {
  const isNumeric = !isNaN(Number(table));
  const displayText = isNumeric ? `Table ${table}` : table;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center mb-8"
    >
      <div className="border border-accent/40 bg-accent/5 px-8 py-3 rounded-full backdrop-blur-md">
        <span className="text-accent font-body text-xs tracking-[0.4em] uppercase font-bold">
          {displayText}
        </span>
      </div>
    </motion.div>
  );
}
