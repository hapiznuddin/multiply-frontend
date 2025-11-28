"use client";

import { Question } from "@/app/types/quizType";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAnswer, exitRoom } from "./action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function GameQuestion({
  questions,
  roomId,
}: {
  questions: Question[];
  roomId: number;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string | number>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctAnswerId, setCorrectAnswerId] = useState<number | null>(null);
  const [tokens, setTokens] = useState<{
    guest_token: string;
    room_participant_id: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const guest_token = localStorage.getItem("guest_token");
    const room_participant_id = localStorage.getItem("room_participant_id");

    if (guest_token && room_participant_id) {
      setTokens({
        guest_token,
        room_participant_id: parseInt(room_participant_id),
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Missing session data. Please rejoin.",
        icon: "error",
      }).then(() => {
        router.push("/join");
      });
    }
  }, [router]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleExit = async () => {
    if (!tokens) return;

    const result = await Swal.fire({
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
        Swal.fire("Error", exitResult.error, "error");
      } else {
        // Clear localStorage
        localStorage.removeItem("guest_token");
        localStorage.removeItem("room_participant_id");

        Swal.fire({
          title: "Exited",
          text: "You have successfully exited the room.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          router.push("/join");
        });
      }
    }
  };

  const handleAnswerSubmit = async () => {
    if (!tokens) return;
    if (answer === "") {
      Swal.fire("Warning", "Please select or enter an answer", "warning");
      return;
    }

    setIsSubmitting(true);

    const result = await submitAnswer(roomId, {
      guest_token: tokens.guest_token,
      room_participant_id: tokens.room_participant_id,
      question_id: currentQuestion.id,
      answer: answer,
    });

    setIsSubmitting(false);

    if (result.error) {
      Swal.fire("Error", result.error, "error");
    } else {
      const isCorrect = result.data.answer.is_correct;
      const newScore = result.data.total_score;
      const newRank = result.data.current_rank;
      const correctId = result.data.correct_answer_id;

      // Update score and rank
      setScore(newScore);
      setRank(newRank);

      // Show visual feedback for multiple choice
      if (currentQuestion.type === "multiple_choice") {
        setShowFeedback(true);
        setIsCorrectAnswer(isCorrect);
        setCorrectAnswerId(correctId);
      }

      // Show feedback
      Swal.fire({
        title: isCorrect ? "Correct!" : "Incorrect!",
        html: `<p>Score: ${newScore}</p><p>Rank: #${newRank}</p>`,
        icon: isCorrect ? "success" : "error",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
        timerProgressBar: true,
      }).then(() => {
        setAnswer(""); // Reset answer
        setShowFeedback(false); // Reset feedback
        setCorrectAnswerId(null); // Reset correct answer
        if (isLastQuestion) {
          Swal.fire({
            title: "Completed!",
            text: `Final Score: ${newScore} | Rank: #${newRank}`,
            icon: "success",
          }).then(() => {
            router.push(`/join/game/leaderboard?id=${roomId}`);
          });
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      });
    }
  };

  if (!currentQuestion) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 bg-white/10 backdrop-blur-xs shadow-md rounded-xl mx-auto py-12 px-6 w-full max-w-2xl border-2 border-white/20 text-white">
      {/* Score and Rank Navbar */}
      <div className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3 border border-white/10">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Score</span>
            <span className="text-2xl font-bold">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Rank</span>
            <span className="text-2xl font-bold">#{rank || "-"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">
            Question {currentQuestionIndex + 1} / {questions.length}
          </h2>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600"
          >
            Exit
          </Button>
        </div>
      </div>

      <div className="text-2xl font-bold text-center">
        {currentQuestion.question_text}
      </div>

      <div className="flex flex-col gap-4">
        {currentQuestion.type === "multiple_choice" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option) => {
              const isSelected = answer === option.id;
              const isCorrectOption = correctAnswerId === option.id;

              let buttonClass = "";
              if (showFeedback) {
                if (isSelected && isCorrectAnswer) {
                  // User selected correct answer - show green
                  buttonClass =
                    "bg-green-500 text-white hover:bg-green-600 border-green-500";
                } else if (isSelected && !isCorrectAnswer) {
                  // User selected wrong answer - show red
                  buttonClass =
                    "bg-red-500 text-white hover:bg-red-600 border-red-500";
                } else if (isCorrectOption) {
                  // Show correct answer in green
                  buttonClass =
                    "bg-green-500 text-white hover:bg-green-600 border-green-500";
                } else {
                  buttonClass = "bg-transparent border-white/20 text-white/50";
                }
              } else if (isSelected) {
                buttonClass = "bg-white text-primary hover:bg-white/90";
              } else {
                buttonClass =
                  "bg-transparent border-white/20 hover:bg-white/10 text-white";
              }

              return (
                <Button
                  key={option.id}
                  variant={isSelected ? "secondary" : "outline"}
                  className={`h-auto py-4 text-lg justify-start px-6 ${buttonClass}`}
                  onClick={() => !showFeedback && setAnswer(option.id)}
                  disabled={showFeedback}
                >
                  {option.option_text}
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
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg h-12"
          />
        )}
      </div>

      <Button
        size="lg"
        onClick={handleAnswerSubmit}
        disabled={isSubmitting}
        className="w-full bg-white text-primary hover:bg-white/90 font-bold text-xl h-14 mt-4"
      >
        {isSubmitting
          ? "Submitting..."
          : isLastQuestion
          ? "Finish"
          : "Next Question"}
      </Button>
    </div>
  );
}
