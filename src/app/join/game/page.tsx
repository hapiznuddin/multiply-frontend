import { getGameQuestions } from "./action";
import GameQuestion from "./game-question";

export default async function Game({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  const { id } = await searchParams;
  const { data } = await getGameQuestions(id);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <GameQuestion questions={data.questions} roomId={id} room={data.room} />
    </div>
  );
}
