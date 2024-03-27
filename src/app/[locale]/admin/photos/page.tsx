import { Fragment } from "react"
import PhotoUpload from "@/photo/PhotoUpload"
import Link from "next/link"
import PhotoTiny from "@/photo/PhotoTiny"
import { clsx } from "clsx/lite"
import FormWithConfirm from "@/components/FormWithConfirm"
import SiteGrid from "@/components/SiteGrid"
import { deletePhotoAction, syncPhotoExifDataAction } from "@/photo/actions"
import {
  pathForAdminPhotos,
  pathForPhoto,
  pathForAdminPhotoEdit,
} from "@/site/paths"
import { titleForPhoto } from "@/photo"
import MorePhotos from "@/photo/MorePhotos"
import {
  getStoragePhotoUrlsNoStore,
  getPhotosCached,
  getPhotosCountIncludingHiddenCached,
} from "@/cache"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import {
  PaginationParams,
  getPaginationForSearchParams,
} from "@/site/pagination"
import AdminGrid from "@/admin/AdminGrid"
import DeleteButton from "@/admin/DeleteButton"
import EditButton from "@/admin/EditButton"
import StorageUrls from "@/admin/StorageUrls"
import { PRO_MODE_ENABLED } from "@/site/config"
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus"
import IconGrSync from "@/site/IconGrSync"
import { getTranslations } from "next-intl/server"

const DEBUG_PHOTO_BLOBS = false

export default async function AdminPhotosPage({
  searchParams,
}: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams)

  const [photos, count, blobPhotoUrls] = await Promise.all([
    getPhotosCached({ includeHidden: true, sortBy: "createdAt", limit }),
    getPhotosCountIncludingHiddenCached(),
    DEBUG_PHOTO_BLOBS ? getStoragePhotoUrlsNoStore() : [],
  ])

  const showMorePhotos = count > photos.length
  const t = await getTranslations("Admin")

  return (
    <SiteGrid
      contentMain={
        <div className="space-y-8">
          <PhotoUpload shouldResize={!PRO_MODE_ENABLED} />
          {blobPhotoUrls.length > 0 && (
            <div
              className={clsx(
                "border-b pb-6",
                "border-shironezumi dark:border-gray-700"
              )}
            >
              <StorageUrls
                title={`Photo Blobs (${blobPhotoUrls.length})`}
                urls={blobPhotoUrls}
              />
            </div>
          )}
          <div className="space-y-4">
            <AdminGrid>
              {photos.map((photo) => (
                <Fragment key={photo.id}>
                  <PhotoTiny
                    className={clsx(
                      "rounded-sm overflow-hidden",
                      "border border-shironezumi dark:border-gray-800"
                    )}
                    photo={photo}
                  />
                  <div className="flex flex-col lg:flex-row">
                    <Link
                      key={photo.id}
                      href={pathForPhoto(photo)}
                      className="lg:w-[50%] flex items-center gap-2"
                    >
                      <span
                        className={clsx(
                          "inline-flex items-center gap-2",
                          photo.hidden && "text-dim"
                        )}
                      >
                        <span>{photo.title || t("actions.untitled")}</span>
                        {photo.hidden && (
                          <AiOutlineEyeInvisible
                            className="translate-y-[0.25px]"
                            size={16}
                          />
                        )}
                      </span>
                      {photo.priorityOrder !== null && (
                        <span
                          className={clsx(
                            "text-xs leading-none px-1.5 py-1 rounded-sm",
                            "dark:text-hainezumi",
                            "bg-gofun dark:bg-gray-800"
                          )}
                        >
                          {photo.priorityOrder}
                        </span>
                      )}
                    </Link>
                    <div className={clsx("lg:w-[50%] uppercase", "text-dim")}>
                      {photo.takenAtNaive}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "flex flex-nowrap",
                      "gap-2 sm:gap-3 items-center"
                    )}
                  >
                    <EditButton
                      href={pathForAdminPhotoEdit(photo)}
                      label={t("actions.editButton")}
                    />
                    <FormWithConfirm
                      action={syncPhotoExifDataAction}
                      confirmText={
                        t("actions.syncPhotoConfirmText", {
                          title: titleForPhoto(photo),
                        })
                      }
                    >
                      <input type="hidden" name="id" value={photo.id} />
                      <SubmitButtonWithStatus
                        icon={<IconGrSync className="translate-y-[-0.5px]" />}
                        onFormSubmitToastMessage={t("actions.toast.syncPhoto", {
                          title: titleForPhoto(photo),
                        })}
                      />
                    </FormWithConfirm>
                    <FormWithConfirm
                      action={deletePhotoAction}
                      confirmText={t("actions.deletePhotoConfirmText", {
                        title: titleForPhoto(photo),
                      })}
                    >
                      <input type="hidden" name="id" value={photo.id} />
                      <input type="hidden" name="url" value={photo.url} />
                      <DeleteButton />
                    </FormWithConfirm>
                  </div>
                </Fragment>
              ))}
            </AdminGrid>
            {showMorePhotos && (
              <MorePhotos path={pathForAdminPhotos(offset + 1)} />
            )}
          </div>
        </div>
      }
    />
  )
}
