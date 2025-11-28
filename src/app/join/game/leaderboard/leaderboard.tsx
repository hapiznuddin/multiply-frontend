export default function Leaderboard({
  data,
}: {
  data: {
    id: number;
    participant_name: string;
    score: number;
  }[];
}) {
  return (
    <div>
      <h1>Leaderboard</h1>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <p>{item.participant_name}</p>
            <p>{item.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
