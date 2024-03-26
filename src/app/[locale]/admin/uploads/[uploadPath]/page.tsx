import PhotoForm from "@/photo/PhotoForm"
import AdminChildPage from "@/components/AdminChildPage"
import { PATH_ADMIN, PATH_ADMIN_UPLOADS } from "@/site/paths"
import { extractExifDataFromBlobPath } from "@/photo/server"
import { redirect } from "@/site/navigation"
import { getTranslations } from "next-intl/server"

interface Params {
  params: { uploadPath: string }
}

export default async function UploadPage({ params: { uploadPath } }: Params) {
  const { blobId, photoFormExif } = await extractExifDataFromBlobPath(
    uploadPath
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
