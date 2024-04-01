import BlogForm from "../../BlogForm"
import { getBlogCached } from "@/cache"
import { getTranslations } from "next-intl/server"

export default async function AdminEditBlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)
  const t = await getTranslations("Admin.blog")

  return (
    <>
      <h2 className="text-2xl font-bold">{t("editTitle")}</h2>
      <BlogForm type="edit" blog={blog} />
    </>
  )
}
