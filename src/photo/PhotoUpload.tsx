"use client"

import { useState } from "react"
import { uploadPhotoFromClient } from "@/services/storage"
import { useRouter } from "@/site/navigation"
import { PATH_ADMIN_UPLOADS, pathForAdminUploadUrl } from "@/site/paths"
import ImageInput from "../components/ImageInput"
import { MAX_IMAGE_SIZE } from "@/services/next-image"
import { clsx } from "clsx/lite"
import { useTranslations } from "next-intl"

export default function PhotoUpload({
  shouldResize,
  debug,
  path = "photo",
}: {
  shouldResize?: boolean
  debug?: boolean
  path?: "photo" | "blog"
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string>()
  const [debugDownload, setDebugDownload] = useState<{
    href: string
    fileName: string
  }>()

  const router = useRouter()
  const t = useTranslations("Admin.actions")

  return (
    <div className={clsx("space-y-4", isUploading && "cursor-not-allowed")}>
      <div className="flex items-center gap-8">
        <form className="flex items-center min-w-0 button-hover rounded-md">
          <ImageInput
            maxSize={shouldResize ? MAX_IMAGE_SIZE : undefined}
            loading={isUploading}
            onStart={() => {
              setIsUploading(true)
              setUploadError("")
            }}
            onBlobReady={async ({
              blob,
              extension,
              hasMultipleUploads,
              isLastBlob,
            }) => {
              if (debug) {
                setDebugDownload({
                  href: URL.createObjectURL(blob),
                  fileName: `debug.${extension}`,
                })
                setIsUploading(false)
                setUploadError("")
              } else {
                return uploadPhotoFromClient(blob, extension)
                  .then((url) => {
                    if (isLastBlob) {
                      // Refresh page to update upload list,
                      // relevant to upload count in nav
                      router.refresh()
                      if (hasMultipleUploads) {
                        // Redirect to view multiple uploads
                        router.push(PATH_ADMIN_UPLOADS)
                      } else {
                        // Redirect to photo detail page
                        if (path === "photo")
                          router.push(pathForAdminUploadUrl(url))
                      }
                    }
                  })
                  .catch((error) => {
                    setIsUploading(false)
                    setUploadError(`Upload Error: ${error.message}`)
                  })
              }
            }}
            debug={debug}
          />
        </form>
      </div>
      {debug && debugDownload && (
        <a
          className="block"
          href={debugDownload.href}
          download={debugDownload.fileName}
        >
          {t("download")}
        </a>
      )}
      {uploadError && <div className="text-error">{uploadError}</div>}
    </div>
  )
}
