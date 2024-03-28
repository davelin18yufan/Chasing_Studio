import PhotoForm from "@/photo/PhotoForm"
import AdminChildPage from "@/components/AdminChildPage"
import { PATH_ADMIN, PATH_ADMIN_UPLOADS } from "@/site/paths"
import { extractExifDataFromBlobPath } from "@/photo/server"
import { redirect } from "@/site/navigation"
import { getTranslations } from "next-intl/server"

interface Params {
  searchParams: { path: string }
}

export default async function UploadPage({ searchParams: { path } }: Params) {
  const { blobId, photoFormExif } = await extractExifDataFromBlobPath(
    path
  )
  const t = await getTranslations("Admin.photo")

  if (!photoFormExif) {
    redirect(PATH_ADMIN)
  }

  return (
    <AdminChildPage
      backPath={PATH_ADMIN_UPLOADS}
      backLabel={t("form.uploadLabel")}
      breadcrumb={blobId}
    >
      <PhotoForm initialPhotoForm={photoFormExif || {}} />
    </AdminChildPage>
  )
}
