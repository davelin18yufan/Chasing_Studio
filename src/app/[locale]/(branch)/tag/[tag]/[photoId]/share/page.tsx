import { getPhotoCached } from "@/cache";
import PhotoShareModal from "@/photo/PhotoShareModal";
import { PATH_ROOT } from "@/site/paths";
import { redirect } from "@/site/navigation";

export default async function Share({
  params: { photoId, tag },
}: {
  params: { photoId: string, tag: string }
}) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { return redirect(PATH_ROOT); }

  return <PhotoShareModal {...{ photo, tag }} />;
}
