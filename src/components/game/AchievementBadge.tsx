"use client";

import React from "react";
import {
  Trophy,
  Zap,
  Target,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/embededVideo";

interface AchievementBadgeProps {
  name: string;
  icon?: string;
  badgeType: "bronze" | "silver" | "gold" | "platinum";
  className?: string;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case "target":
      return <Target className="w-4 h-4" />;
    case "flame":
      return <Flame className="w-4 h-4" />;
    case "zap":
      return <Zap className="w-4 h-4" />;
    case "trophy":
      return <Trophy className="w-4 h-4" />;
    case "shield-check":
      return <ShieldCheck className="w-4 h-4" />;
    default:
      return <Trophy className="w-4 h-4" />;
  }
};

const getBadgeStyles = (type: string) => {
  switch (type) {
    case "bronze":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "silver":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "gold":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "platinum":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  icon,
  badgeType,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium",
        getBadgeStyles(badgeType),
        className
      )}
      title={name}
    >
      {icon && getBadgeIcon(icon)}
      <span>{name}</span>
    </div>
  );
};
