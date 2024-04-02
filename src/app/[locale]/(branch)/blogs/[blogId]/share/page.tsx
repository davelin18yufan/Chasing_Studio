import { getBlogCached } from "@/cache"
import { PATH_BLOGS } from "@/site/paths"
import { redirect } from "@/site/navigation"
import BlogShareModal from "@/blog/BlogShareModal"

export default async function Share({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)

  if (!blog) {
    return redirect(PATH_BLOGS)
  }

  return <BlogShareModal blog={blog} />
}
