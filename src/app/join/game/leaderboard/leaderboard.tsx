"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/embededVideo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AchievementBadge } from "@/components/game/AchievementBadge";
import { Achievement } from "@/app/types/quizType";

export default function Leaderboard({
  data,
}: {
  data: {
    id: number; // This is room_participant_id from backend index
    participant_name: string;
    score: number;
    achievements?: Achievement[];
  }[];
}) {
  // Sort data by score descending just in case
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl mx-auto py-10 px-6 w-full max-w-4xl border-2 border-white/20 text-white">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-black text-center text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
          RANKINGS
        </h1>
        <p className="text-white/60 font-bold tracking-widest uppercase">
          The Hall of Fame
        </p>
      </div>
      <ScrollArea className="h-120 px-4 w-full">
        <div className="flex flex-col gap-3">
          {sortedData.map((item, index) => {
            const rank = index + 1;
            let RankIcon = null;
            let rankColor = "text-white/80";

            if (rank === 1) {
              RankIcon = (
                <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              );
              rankColor = "text-yellow-400";
            } else if (rank === 2) {
              RankIcon = (
                <Crown className="w-7 h-7 text-gray-300 fill-gray-300" />
              );
              rankColor = "text-gray-300";
            } else if (rank === 3) {
              RankIcon = (
                <Crown className="w-6 h-6 text-orange-400 fill-orange-400" />
              );
              rankColor = "text-orange-400";
            }

            return (
              <div
                key={item.id}
                className={cn(
                  "relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300",
                  rank === 1
                    ? "bg-white/20 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                    : rank === 2
                    ? "bg-white/10 border-gray-400/30"
                    : rank === 3
                    ? "bg-white/10 border-orange-400/30"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 flex justify-center font-black text-2xl italic">
                    {RankIcon || (
                      <span className="text-white/30 text-xl">#{rank}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-black text-xl tracking-tight">
                      {item.participant_name}
                    </p>
                    {item.achievements && item.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.achievements.map((ach) => (
                          <AchievementBadge
                            key={ach.id}
                            name={ach.name}
                            badgeType={ach.badge_type}
                            icon={ach.icon || undefined}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-black text-2xl", rankColor)}>
                    {item.score}
                  </p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                    Points
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/join")}
          className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 text-white font-bold h-14 rounded-2xl"
        >
          Main Lagi
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            localStorage.removeItem("guest_token");
            localStorage.removeItem("room_participant_id");
            router.push("/");
          }}
          className="flex-1 bg-linear-to-r from-orange-500 to-yellow-400 text-white font-black h-14 rounded-2xl shadow-lg"
        >
          Exit Room
        </Button>
      </div>
    </div>
  );
}
