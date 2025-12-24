"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  if (streak < 2) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={streak}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        className="flex items-center gap-2 bg-orange-500 px-3 py-1 rounded-full shadow-lg border-2 border-orange-300"
      >
        <span className="text-lg">🔥</span>
        <span className="font-bold text-white text-sm">{streak}x COMBO!</span>
      </motion.div>
    </AnimatePresence>
  );
};
