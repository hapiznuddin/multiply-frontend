'use client';
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Leaderboard({
  data,
}: {
  data: {
    id: number;
    participant_name: string;
    score: number;
  }[];
}) {
  // Sort data by score descending just in case
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 bg-white/10 backdrop-blur-xs shadow-md rounded-xl mx-auto py-12 px-6 w-full max-w-2xl border-2 border-white/20 text-white">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold text-center">Leaderboard</h1>
      </div>
      <ScrollArea className="h-120">
        <div className="flex flex-col gap-2 px-4">
        {sortedData.map((item, index) => {
          const rank = index + 1;
          let RankIcon = null;
          let rankColor = "text-gray-500";

          if (rank === 1) {
            RankIcon = (
              <Crown className="w-6 h-6 text-amber-600 fill-amber-600" />
            );
            rankColor = "text-amber-600";
          } else if (rank === 2) {
            RankIcon = (
              <Crown className="w-6 h-6 text-gray-500 fill-gray-500" />
            );
            rankColor = "text-gray-500";
          } else if (rank === 3) {
            RankIcon = (
              <Crown className="w-6 h-6 text-amber-700 fill-amber-700" />
            );
            rankColor = "text-amber-700";
          }

          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border-3 bg-card text-card-foreground shadow-sm transition-colors",
                rank === 1 && "border-amber-600 bg-amber-200",
                rank === 2 && "border-gray-400 bg-gray-100",
                rank === 3 && "border-amber-700 bg-amber-100"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center font-bold text-lg">
                  {RankIcon ? (
                    <span className="text-gray-500">
                      {RankIcon}#{rank}
                    </span>
                  ) : (
                    <span className="text-gray-500">#{rank}</span>
                  )}
                </div>
                <p className="font-medium text-lg">{item.participant_name}</p>
              </div>
              <p className={cn("font-bold text-lg", rankColor)}>
                {item.score} pts
              </p>
            </div>
          );
        })}
        </div>
      </ScrollArea>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => router.push("/")}
        className="w-full"
      >
        Back to Home
      </Button>
    </div>
  );
}
