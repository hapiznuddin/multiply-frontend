"use client";

import useSound from "use-sound";
import { useState, useEffect, useMemo, useCallback } from "react";

export const useGameSound = () => {
  const [isMuted, setIsMuted] = useState(false);

  // Memoize options to prevent useSound from re-initializing on every render
  const correctOptions = useMemo(() => ({ volume: 0.5 }), []);
  const wrongOptions = useMemo(() => ({ volume: 0.3 }), []);
  const achievementOptions = useMemo(() => ({ volume: 0.6 }), []);
  const tickOptions = useMemo(() => ({ volume: 0.4 }), []);
  const bgOptions = useMemo(() => ({ volume: 0.05, loop: true }), []);

  const [playCorrect] = useSound("/sounds/correct.mp3", correctOptions);
  const [playWrong] = useSound("/sounds/wrong.mp3", wrongOptions);
  const [playAchievement] = useSound(
    "/sounds/achievement.mp3",
    achievementOptions
  );
  const [playTick] = useSound("/sounds/tick.mp3", tickOptions);

  const [playBg, { stop: stopBg, sound }] = useSound(
    "/sounds/background.mp3",
    bgOptions
  );

  const isBgPlaying = sound?.playing() || false;

  useEffect(() => {
    if (isMuted) {
      stopBg();
    } 
  }, [isMuted, stopBg]);

  // Memoize wrappers
  const playCorrectWrapper = useCallback(
    () => !isMuted && playCorrect(),
    [isMuted, playCorrect]
  );
  const playWrongWrapper = useCallback(
    () => !isMuted && playWrong(),
    [isMuted, playWrong]
  );
  const playAchievementWrapper = useCallback(
    () => !isMuted && playAchievement(),
    [isMuted, playAchievement]
  );
  const playTickWrapper = useCallback(
    () => !isMuted && playTick(),
    [isMuted, playTick]
  );

  // IMPORTANT: This wrapper depends on isMuted.
  // If isMuted changes, this reference changes.
  // If consumer uses this in useEffect, it will re-run.
  const playBgWrapper = useCallback(() => {
    if (!isMuted) {
      playBg();
    }
  }, [isMuted, playBg]);

  const toggleMute = useCallback(() => setIsMuted((prev) => !prev), []);

  return {
    playCorrect: playCorrectWrapper,
    playWrong: playWrongWrapper,
    playAchievement: playAchievementWrapper,
    playTick: playTickWrapper,
    playBg: playBgWrapper,
    stopBg,
    isBgPlaying,
    isMuted,
    toggleMute,
  };
};
