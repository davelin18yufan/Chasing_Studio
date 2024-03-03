import Image from "next/image"
import Link from "next/link"
import ShareToolbar from "@/components/ShareToolbar"
import BlogContent from "./BlogContent"
import { getBlogCached } from "@/cache"
import { redirect } from "next/navigation"

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)

  if(!blog) return redirect("/blogs")

  return (
    <main className="container">
      {/* cover */}
      <div
        className={`${
          blog.coverPhoto?.src ?? "hidden"
        } w-full relative aspect-video`}
      >
        <Image
          alt="Cover photo"
          className=" overflow-hidden rounded-lg object-fill"
          src={blog.coverPhoto?.src || ""}
          fill
        />
      </div>

        {/* Article */}
      <div className="max-w-2xl mx-auto my-12">
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-medium">
            <span>Created by</span>
            <Link href={blog.author.url || ""}>
              <p className="font-semibold text-xl">{blog.author.name}</p>
            </Link>
          </div>

          {/* share toolbar */}
          <ShareToolbar />
        </div>
        <p className="text-sm text-dim mb-6">14 min read · Feb 5, 2024</p>

        {/* content */}
        {/* readOnly editor wrapped in comment provider */}
        <BlogContent blog={blog} />
      </div>
    </main>
  )
}
