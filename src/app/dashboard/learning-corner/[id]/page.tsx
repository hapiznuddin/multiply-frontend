import { Separator } from "@/components/ui/separator";
import { getModuleIdAction } from "./action";
import { getEmbedUrl } from "@/lib/embededVideo";
import DeleteButton from "./DeleteButton";
export default async function DetailModule({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data } = await getModuleIdAction(id);
  console.log(data);

  const embedUrl = data?.video_url ? getEmbedUrl(data.video_url) : "";

  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p>Created by {data?.user?.name}</p>
        </div>
        <DeleteButton id={data?.id} />
      </div>
      <Separator />
      <div className="flex flex-col gap-2 w-full px-4">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-bold">Module Video</h2>
          {embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full aspect-video rounded-lg mx-auto"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center bg-muted w-full h-32">
              <p className="text-muted-foreground">Invalid Video URL</p>
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-bold">Module Content</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data?.content || "" }}
          />
        </div>
      </div>
    </div>
  );
}
