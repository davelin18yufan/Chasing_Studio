import FormWithConfirm from "@/components/FormWithConfirm"
import SiteGrid from "@/components/SiteGrid"
import { deleteTagGloballyAction } from "@/photo/actions"
import AdminGrid from "@/admin/AdminGrid"
import { Fragment } from "react"
import DeleteButton from "@/admin/DeleteButton"
import { getUniqueBlogTagsCached, getUniqueTagsHiddenCached } from "@/cache"
import PhotoTag from "@/tag/PhotoTag"
import { formatTag, isTagFavs, sortTagsObject } from "@/tag"
import EditButton from "@/admin/EditButton"
import { pathForAdminTagEdit } from "@/site/paths"
import { clsx } from "clsx/lite"
import FavsTag from "@/tag/FavsTag"
import { getTagQuantityText, getTagLabelForCount } from "@/blog"
import { mergeTags } from "@/lib/utils"
import { getTranslations, getLocale } from "next-intl/server"

export default async function AdminTagsPage() {
  const [photoTags, blogTags, t, locale] = await Promise.all([
    getUniqueTagsHiddenCached(),
    getUniqueBlogTagsCached(true),
    getTranslations("Admin"),
    getLocale(),
  ])
  const tags = mergeTags(photoTags, blogTags)

  const renderQuantityText = (count: number, label: string) =>
    getTagQuantityText(
      count,
      getTagLabelForCount(
        count,
        label,
        `${locale === "en" ? label + "s" : label}`
      ),
      false
    )
  return (
    <SiteGrid
      contentMain={
        <div className="space-y-6">
          <div className="space-y-4">
            <AdminGrid>
              {sortTagsObject(tags).map(({ tag, blogCount, photoCount }) => (
                <Fragment key={tag}>
                  <div className="pr-2 -translate-y-0.5">
                    {isTagFavs(tag) ? <FavsTag /> : <PhotoTag {...{ tag }} />}
                  </div>
                  <div className="text-dim uppercase flex gap-2">
                    {photoCount > 0 && (
                      <span>
                        {renderQuantityText(photoCount, t("nav.photo"))}
                      </span>
                    )}
                    {blogCount > 0 && (
                      <span>
                        {renderQuantityText(blogCount, t("nav.blog"))}
                      </span>
                    )}
                  </div>
                  <div
                    className={clsx(
                      "flex flex-nowrap",
                      "gap-2 sm:gap-3 items-center"
                    )}
                  >
                    <EditButton
                      href={pathForAdminTagEdit(tag)}
                      label={t("actions.editButton")}
                    />
                    <FormWithConfirm
                      action={deleteTagGloballyAction}
                      confirmText={t("actions.deleteTagConfirmText", {
                        title: formatTag(tag),
                      })}
                    >
                      <input type="hidden" name="tag" value={tag} />
                      <DeleteButton />
                    </FormWithConfirm>
                  </div>
                </Fragment>
              ))}
            </AdminGrid>
          </div>
        </div>
      }
    />
  )
}
