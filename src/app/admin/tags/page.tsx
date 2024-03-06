import FormWithConfirm from "@/components/FormWithConfirm"
import SiteGrid from "@/components/SiteGrid"
import { deletePhotoTagGloballyAction } from "@/photo/actions"
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
import { getItemQuantityText, getItemLabelForCount } from "@/blog"
import { mergeTags } from "@/lib/utils"

export default async function AdminTagsPage() {
  const [photoTags, blogTags] = await Promise.all([
    getUniqueTagsHiddenCached(),
    getUniqueBlogTagsCached(true),
  ])
  const tags = mergeTags(photoTags, blogTags)

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
                      <p>
                        {getItemQuantityText(
                          photoCount,
                          getItemLabelForCount(photoCount, "Photo", "Photos"),
                          false
                        )}
                      </p>
                    )}
                    {blogCount > 0 && (
                      <p>
                        {getItemQuantityText(
                          blogCount,
                          getItemLabelForCount(blogCount, "Blog", "Blogs"),
                          false
                        )}
                      </p>
                    )}
                  </div>
                  <div
                    className={clsx(
                      "flex flex-nowrap",
                      "gap-2 sm:gap-3 items-center"
                    )}
                  >
                    <EditButton href={pathForAdminTagEdit(tag)} />
                    <FormWithConfirm
                      action={deletePhotoTagGloballyAction}
                      confirmText={
                        // eslint-disable-next-line max-len
                        `Are you sure you want to remove "${formatTag(tag)}"?`
                      }
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
