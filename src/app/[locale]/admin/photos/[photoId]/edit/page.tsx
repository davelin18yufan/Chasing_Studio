import { redirect } from "@/site/navigation"
import { getPhotoNoStore } from "@/cache"
import { PATH_ADMIN } from "@/site/paths"
import PhotoEditPageClient from "@/photo/PhotoEditPageClient"

export default async function PhotoEditPage({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoNoStore(photoId)

  if (!photo) {
    return redirect(PATH_ADMIN)
  }

  return <PhotoEditPageClient {...{ photo }} />
}
