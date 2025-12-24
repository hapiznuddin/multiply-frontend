"use client";

import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface QuestionTimerProps {
  duration: number;
  onComplete: () => void;
  isPlaying: boolean;
  timerKey: number;
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({
  duration,
  onComplete,
  isPlaying,
  timerKey,
}) => {
  return (
    <div className="flex justify-center items-center">
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={duration}
        colors={["#22c55e", "#eab308", "#ef4444", "#ef4444"]}
        colorsTime={[duration, duration * 0.5, duration * 0.2, 0]}
        size={50}
        strokeWidth={6}
        onComplete={onComplete}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-white">
              {remainingTime}
            </span>
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};
