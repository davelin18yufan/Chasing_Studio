import BlogForm from "../../BlogForm"
import { getBlogCached } from "@/cache"
import { useTranslations } from "next-intl"

export default async  function AdminEditBlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)
  const t = useTranslations("Admin.blog")

  return (
    <>
      <h2 className="text-2xl font-bold">{t("editTitle")}</h2>
      <BlogForm type="edit" blog={blog} />
    </>
  )
}
