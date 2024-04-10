import ShareModal from "@/components/ShareModal"
import { absolutePathForBlogImage, pathForBlog } from "@/site/paths"
import { useTranslations } from "next-intl"
import BlogOGTile from "./BlogOGTile"
import { Blog } from "."

export default function BlogShareModal({ blog }: { blog: Blog }) {
  const t = useTranslations("Blog")
  return (
    <ShareModal
      title={t("share")}
      pathShare={absolutePathForBlogImage(blog.id)}
      pathClose={pathForBlog(blog.id)}
    >
      <BlogOGTile blog={blog}/>
    </ShareModal>
  )
}
