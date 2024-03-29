import { getPhotoCached } from "@/cache"
import PhotoShareModal from "@/photo/PhotoShareModal"
import { FilmSimulation } from "@/simulation"
import { PATH_ROOT } from "@/site/paths"
import { redirect } from "@/site/navigation"

export default async function Share({
  params: { photoId, simulation },
}: {
  params: { photoId: string; simulation: FilmSimulation }
}) {
  const photo = await getPhotoCached(photoId)

  if (!photo) {
    return redirect(PATH_ROOT)
  }

  return <PhotoShareModal {...{ photo, simulation }} />
}
