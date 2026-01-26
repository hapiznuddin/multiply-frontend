import { getLeaderboard, getParticipantAchievements } from "./action";
import Leaderboard from "./leaderboard";

interface Participant {
  id: number;
  participant_name: string;
  score: number;
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  const { id } = await searchParams;
  const { data: leaderboardData = [] } = await getLeaderboard(id);

  // For each participant, try to fetch their achievements
  const enrichedLeaderboard = await Promise.all(
    leaderboardData.map(async (p: Participant) => {
      const { data: achievements } = await getParticipantAchievements(p.id); // p.id is room_participant_id
      return {
        ...p,
        achievements: achievements || [],
      };
    })
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690] py-20">
      <div className="pattern" />
      <Leaderboard data={enrichedLeaderboard} />
    </div>
  );
}
