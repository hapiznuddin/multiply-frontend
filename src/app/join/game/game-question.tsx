"use client";

import { Question, Room, Achievement } from "@/app/types/quizType";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAnswer, exitRoom } from "./action";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);
import { QuestionTimer } from "@/components/game/QuestionTimer";
import { StreakDisplay } from "@/components/game/StreakDisplay";
import { AchievementNotification } from "@/components/game/AchievementNotification";
import { useGameSound } from "@/hooks/useSound";
import { Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

export default function GameQuestion({
  questions,
  roomId,
  room,
}: {
  questions: Question[];
  roomId: number;
  room: Room;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string | number>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [streak, setStreak] = useState(0);
  const [unlockedAchievement, setUnlockedAchievement] =
    useState<Achievement | null>(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctAnswerId, setCorrectAnswerId] = useState<number | null>(null);
  const [tokens, setTokens] = useState<{
    guest_token: string;
    room_participant_id: number;
  } | null>(null);

  const [timerKey, setTimerKey] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const router = useRouter();
  const {
    playCorrect,
    playWrong,
    playAchievement,
    playBg,
    stopBg,
    isMuted,
    toggleMute,
  } = useGameSound();

  useEffect(() => {
    const guest_token = localStorage.getItem("guest_token");
    const room_participant_id = localStorage.getItem("room_participant_id");

    if (guest_token && room_participant_id) {
      setTokens({
        guest_token,
        room_participant_id: parseInt(room_participant_id),
      });
    } else {
      MySwal.fire({
        title: "Error",
        text: "Data sesi hilang. Harap masuk kembali melalui menu Join Room.",
        icon: "error",
      }).then(() => {
        router.push("/join");
      });
    }
  }, [router]);

  useEffect(() => {
    playBg();
    return () => stopBg();
  }, [playBg, stopBg]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleExit = async () => {
    if (!tokens) return;

    const result = await MySwal.fire({
      title: "Exit Room?",
      text: "Are you sure you want to exit? Your progress will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, exit",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const exitResult = await exitRoom(tokens.room_participant_id);

      if (exitResult.error) {
        MySwal.fire("Error", exitResult.error, "error");
      } else {
        localStorage.removeItem("guest_token");
        localStorage.removeItem("room_participant_id");
        router.push("/join");
      }
    }
  };

  const handleTimeout = () => {
    if (!showFeedback && !isSubmitting) {
      handleAnswerSubmit("TIMEOUT");
    }
  };

  const handleAnswerSubmit = async (forcedAnswer?: string | number) => {
    if (!tokens) return;

    const finalAnswer = forcedAnswer === "TIMEOUT" ? "" : answer;

    if (finalAnswer === "" && forcedAnswer !== "TIMEOUT") {
      MySwal.fire("Warning", "Harap masukan atau pilih jawaban", "warning");
      return;
    }

    setIsSubmitting(true);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    const result = await submitAnswer(roomId, {
      guest_token: tokens.guest_token,
      room_participant_id: tokens.room_participant_id,
      question_id: currentQuestion.id,
      answer: finalAnswer,
      time_taken: timeTaken,
    });

    setIsSubmitting(false);

    if (result.error) {
      MySwal.fire("Error", result.error, "error");
    } else {
      const isCorrect = result.data.answer.is_correct;
      const newScore = result.data.total_score;
      const newRank = result.data.current_rank;
      const newStreak = result.data.current_streak;
      const speedBonus = result.data.speed_bonus;
      const newAchievements = result.data.new_achievements;
      const correctId = result.data.correct_answer_id;

      setScore(newScore);
      setRank(newRank);
      setStreak(newStreak);

      if (isCorrect) {
        playCorrect();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        playWrong();
      }

      if (newAchievements && newAchievements.length > 0) {
        playAchievement();
        setUnlockedAchievement(newAchievements[0]);
      }

      if (currentQuestion.type === "multiple_choice") {
        setShowFeedback(true);
        setIsCorrectAnswer(isCorrect);
        setCorrectAnswerId(correctId);
      }

      MySwal.fire({
        title: isCorrect
          ? "Benar!"
          : forcedAnswer === "TIMEOUT"
            ? "Waktu Habis!"
            : "Kurang Tepat!",
        html: (
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-bold">Skor: {newScore}</p>
            {speedBonus > 0 ? (
              <p className="text-sm text-green-600 font-medium">
                +{speedBonus} Speed Bonus!
              </p>
            ) : (
              ""
            )}
            <p className="text-sm">Rank: #{newRank}</p>
          </div>
        ),
        icon: isCorrect ? "success" : "error",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
        timerProgressBar: true,
      }).then(() => {
        setAnswer("");
        setShowFeedback(false);
        setCorrectAnswerId(null);
        if (isLastQuestion) {
          router.push(`/join/game/leaderboard?id=${roomId}`);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setTimerKey((prev) => prev + 1);
        }
      });
    }
  };

  if (!currentQuestion) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 w-full pt-16">
      <AchievementNotification
        achievement={unlockedAchievement}
        onClose={() => setUnlockedAchievement(null)}
      />

      {/* Score and Rank Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md rounded-b-2xl px-4 py-3 border-b border-white/20">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-xs text-white/70 uppercase">Score</span>
              <span className="text-2xl font-black text-white">{score}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white/70 uppercase">Rank</span>
              <span className="text-2xl font-black text-white">
                #{rank || "-"}
              </span>
            </div>
            {room.time_limit_per_question > 0 && (
              <QuestionTimer
                key={timerKey}
                timerKey={timerKey}
                duration={room.time_limit_per_question}
                isPlaying={!showFeedback && !isSubmitting}
                onComplete={handleTimeout}
              />
            )}
            <StreakDisplay streak={streak} />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            <h2 className="text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full">
              Q{currentQuestionIndex + 1} / {questions.length}
            </h2>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleExit}
              className="bg-red-500/80 hover:bg-red-600 font-bold"
            >
              Exit
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl mx-auto py-10 px-6 w-full max-w-5xl border-2 border-white/20 text-white mt-4">
        {/* {room.time_limit_per_question > 0 && (
          <QuestionTimer
            key={timerKey}
            timerKey={timerKey}
            duration={room.time_limit_per_question}
            isPlaying={!showFeedback && !isSubmitting}
            onComplete={handleTimeout}
          />
        )} */}

        <div className="text-3xl font-black text-center leading-tight">
          {currentQuestion.question_text}
        </div>

        <div className="flex flex-col gap-4">
          {currentQuestion.type === "multiple_choice" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentQuestion.options?.map((option) => {
                const isSelected = answer === option.id;
                const isCorrectOption = correctAnswerId === option.id;

                let buttonClass = "";
                if (showFeedback) {
                  if (isSelected && isCorrectAnswer) {
                    buttonClass =
                      "bg-green-500 text-white border-green-400 scale-105 shadow-green-500/50";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass = "bg-red-500 text-white border-red-400 shake";
                  } else if (isCorrectOption) {
                    buttonClass = "bg-green-500 text-white border-green-400";
                  } else {
                    buttonClass = "opacity-40 grayscale-[0.5]";
                  }
                } else if (isSelected) {
                  buttonClass = "bg-white text-primary scale-105 shadow-xl";
                } else {
                  buttonClass =
                    "bg-white/10 border-white/10 hover:bg-white/20 hover:scale-[1.02] transition-all";
                }

                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={`text-xl font-black h-full w-full min-h-32 p-4 rounded-2xl border-4 ${buttonClass}`}
                    onClick={() => !showFeedback && setAnswer(option.id)}
                    disabled={showFeedback}
                  >
                    <p className="w-full text-wrap">{option.option_text}</p>
                  </Button>
                );
              })}
            </div>
          ) : (
            <Input
              type="text"
              placeholder="Type your answer here..."
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-white/95 text-2xl h-32 text-center text-black rounded-2xl font-bold border-4 border-white/20 focus:border-white"
            />
          )}
        </div>

        <Button
          size="lg"
          onClick={() => handleAnswerSubmit()}
          disabled={isSubmitting || showFeedback}
          variant="secondary"
          className="w-full font-black text-2xl h-16 rounded-2xl shadow-lg hover:translate-y-[-2px] active:translate-y-px transition-all bg-linear-to-r from-orange-400 to-yellow-400 text-white"
        >
          {isSubmitting
            ? "Checking..."
            : isLastQuestion
              ? "Finish"
              : "Next Question ➔"}
        </Button>
      </div>
    </div>
  );
}
