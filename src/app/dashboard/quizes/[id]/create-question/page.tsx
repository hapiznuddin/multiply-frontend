import InputQuestion from "./input-question";

export default async function CreateQuestion({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { title: string; description: string };
}) {
  const { id } = await params;
  const { title } = await searchParams;
  return (
    <div className="p-4 flex flex-col gap-4">
      <InputQuestion id={id} title={title} />
    </div>
  );
}
