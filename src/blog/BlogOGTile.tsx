import { absolutePathForBlogImage, pathForBlog } from "@/site/paths"
import OGTile from "@/components/OGTile"
import { Blog, descriptionForBlog, titleForBlog } from "."

export type OGLoadingState = "unloaded" | "loading" | "loaded" | "failed"

export default function BlogOGTile({
  blog,
  loadingState: loadingStateExternal,
  riseOnHover,
  onLoad,
  onFail,
  retryTime,
}: {
  blog: Blog
  loadingState?: OGLoadingState
  onLoad?: () => void
  onFail?: () => void
  riseOnHover?: boolean
  retryTime?: number
}) {
  return (
    <OGTile
      {...{
        title: titleForBlog(blog),
        description: descriptionForBlog(blog),
        path: pathForBlog(blog.id),
        pathImageAbsolute: absolutePathForBlogImage(blog.id),
        loadingState: loadingStateExternal,
        onLoad,
        onFail,
        riseOnHover,
        retryTime,
      }}
    />
  )
}
