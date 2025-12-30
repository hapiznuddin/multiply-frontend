"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Zap, Target, ShieldCheck } from "lucide-react";
import { Achievement } from "@/app/types/quizType";

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const getNotificationIcon = (iconName: string | null) => {
  const className = "w-8 h-8 text-amber-600";
  switch (iconName) {
    case "target":
      return <Target className={className} />;
    case "flame":
      return <Flame className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "trophy":
      return <Trophy className={className} />;
    case "shield-check":
      return <ShieldCheck className={className} />;
    default:
      return <Trophy className={className} />;
  }
};

export const AchievementNotification: React.FC<
  AchievementNotificationProps
> = ({ achievement, onClose }) => {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(onClose, 4000);
          }}
          className="fixed top-1/2 right-4 z-9999 bg-white text-black p-4 rounded-xl shadow-2xl border-l-4 border-amber-500 flex items-center gap-4 max-w-sm"
        >
          <div className="bg-amber-100 p-2 rounded-lg">
            {getNotificationIcon(achievement.icon)}
          </div>
          <div>
            <h4 className="font-bold text-lg">Achievement Unlocked!</h4>
            <p className="font-bold text-amber-600">{achievement.name}</p>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
