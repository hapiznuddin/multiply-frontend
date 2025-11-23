type Params = {
  id: number;
};

export default function DetailQuiz({ params }: { params: Params }) {
  console.log(params);
  return (
    <>
      <div>detail quiz</div>
      <p>{params?.id}</p>
    </>
  );
}
