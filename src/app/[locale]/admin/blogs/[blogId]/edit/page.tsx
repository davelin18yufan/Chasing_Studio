import BlogForm from "../../BlogForm"
import { getBlogCached } from "@/cache"

export default async  function AdminEditBlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)

  return (
    <>
      <h2 className="text-2xl font-bold">Writing</h2>
      <BlogForm type="edit" blog={blog} />
    </>
  )
}
