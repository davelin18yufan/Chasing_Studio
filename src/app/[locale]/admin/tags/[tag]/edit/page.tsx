import AdminChildPage from "@/components/AdminChildPage"
import { redirect } from "@/site/navigation"
import {
  getBlogsCached,
  getBlogsTagCountCached,
  getPhotosCached,
  getPhotosTagCountCached,
} from "@/cache"
import TagForm from "@/tag/TagForm"
import { PATH_ADMIN, PATH_ADMIN_TAGS, pathForTag } from "@/site/paths"
import PhotoTag from "@/tag/PhotoTag"
import PhotoLightbox from "@/photo/PhotoLightbox"
import BlogLightBox from "@/blog/BlogLightBox"
import FavsTag from "@/tag/FavsTag"
import { isTagFavs } from "@/tag"
import { getTagQuantityText, getTagLabelForCount } from "@/blog"

const MAX_PHOTO_TO_SHOW = 6
const MAX_BLOG_TO_SHOW = 5

interface Props {
  params: { tag: string }
}

export default async function TagPageEdit({ params: { tag } }: Props) {
  const [photoCount, photos] = await Promise.all([
    getPhotosTagCountCached(tag),
    getPhotosCached({ tag, limit: MAX_PHOTO_TO_SHOW }),
  ])

  const [blogCount, blogs] = await Promise.all([
    getBlogsTagCountCached(tag),
    getBlogsCached({ tag, limit: MAX_BLOG_TO_SHOW }),
  ])

  if (photoCount === 0 && blogCount === 0) {
    redirect(PATH_ADMIN)
  }

  const renderQuantityText = (count: number, label: string) =>
    getTagQuantityText(
      count,
      getTagLabelForCount(count, label, `${label}s`),
      false
    )

  return (
    <AdminChildPage
      backPath={PATH_ADMIN_TAGS}
      backLabel="Tags"
      breadcrumb={
        <div className="flex items-center gap-2">
          {isTagFavs(tag) ? (
            <div className="[&>*>*>*>svg]:translate-y-[0.5px]">
              <FavsTag />
            </div>
          ) : (
            <div className="[&>*>*>*>svg]:translate-y-[1.5px]">
              <PhotoTag {...{ tag }} />
            </div>
          )}
          <div className="text-dim uppercase">
            <span className="hidden xs:flex gap-2">
              {photoCount > 0 && (
                <span>{renderQuantityText(photoCount, "Photo")}</span>
              )}
              {blogCount > 0 && (
                <span>{renderQuantityText(blogCount, "Blog")}</span>
              )}
            </span>
          </div>
        </div>
      }
    >
      <TagForm {...{ tag, photos }}>
        {photos.length > 0 && (
          <PhotoLightbox
            {...{ count: photoCount, photos }}
            maxPhotosToShow={MAX_PHOTO_TO_SHOW}
            moreLink={pathForTag(tag)}
          />
        )}
        {blogs.length > 0 && (
          <BlogLightBox
            blogs={blogs}
            count={blogCount}
            moreLink={pathForTag(tag)}
          />
        )}
      </TagForm>
    </AdminChildPage>
  )
}
