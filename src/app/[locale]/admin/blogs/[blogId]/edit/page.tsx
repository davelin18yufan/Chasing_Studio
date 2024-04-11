import BlogForm from "../../BlogForm"
import { getBlogNoStore } from "@/cache"
import { getTranslations } from "next-intl/server"

export default async function AdminEditBlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogNoStore(blogId)
  const t = await getTranslations("Admin.blog")

  return (
    <>
      <h2 className="text-2xl font-bold">{t("editTitle")}</h2>
      <BlogForm type="edit" blog={blog} />
    </>
  )
}
