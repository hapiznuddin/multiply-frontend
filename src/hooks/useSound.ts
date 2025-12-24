"use client";

import useSound from "use-sound";
import { useState, useEffect } from "react";

export const useGameSound = () => {
  // Assets are typically in /public/sounds/
  // Given the constraints, we point to valid relative paths
  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.5 });
  const [playWrong] = useSound("/sounds/wrong.mp3", { volume: 0.3 });
  const [playAchievement] = useSound("/sounds/achievement.mp3", {
    volume: 0.6,
  });
  const [playTick] = useSound("/sounds/tick.mp3", { volume: 0.4 });
  const [playBg, { stop: stopBg, sound }] = useSound("/sounds/background.mp3", {
    volume: 0.2,
    loop: true,
  });

  const isBgPlaying = sound?.playing() || false;

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isMuted) {
      stopBg();
    }
  }, [isMuted, stopBg]);

  return {
    playCorrect: () => !isMuted && playCorrect(),
    playWrong: () => !isMuted && playWrong(),
    playAchievement: () => !isMuted && playAchievement(),
    playTick: () => !isMuted && playTick(),
    playBg: () => !isMuted && playBg(),
    stopBg,
    isBgPlaying,
    isMuted,
    toggleMute: () => setIsMuted(!isMuted),
  };
};
