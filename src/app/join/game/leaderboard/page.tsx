import { getLeaderboard } from "./action";
import Leaderboard from "./leaderboard";

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  const { id } = await searchParams;
  const { data } = await getLeaderboard(id);
  console.log(data);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <Leaderboard data={data} />
    </div>
  );
}
