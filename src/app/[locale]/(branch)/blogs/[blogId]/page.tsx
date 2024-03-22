import Image from "next/image"
import Link from "next/link"
import ShareToolbar from "@/components/ShareToolbar"
import BlogContent from "./BlogContent"
import { getBlogCached } from "@/cache"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import { getSerializeTextFromSlate } from "@/blog"
import { absolutePathForBlog } from "@/site/paths"
import { formatBlogDate } from "@/utility/date"

export async function generateMetadata({
  params: { blogId },
}: {
  params: { blogId: string }
}): Promise<Metadata> {
  const blog = await getBlogCached(blogId)

  if (!blog) {
    return {}
  }
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const text = textObj.map((t) => t.text)

  return {
    title: blog.title,
    description: text.join(" "),
    openGraph: {
      title: blog.title,
      images: absolutePathForBlog(blog.id),
      description: text.join(" "),
    },
    twitter: {
      title: blog.title,
      description: text.join(" "),
      images: absolutePathForBlog(blog.id),
      card: "summary_large_image",
    },
  }
}

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const blog = await getBlogCached(blogId)

  if(!blog) return redirect("/blogs")

  return (
    <main className="w-full">
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
        <h1 className="text-5xl font-bold mb-4 capitalize">{blog.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-medium">
            <span>Created by</span>
            {blog.author.url ? (
              <Link href={blog.author.url || ""}>
                <p className="font-semibold text-xl">{blog.author.name}</p>
              </Link>
            ) : (
              <p className="font-semibold text-xl">{blog.author.name}</p>
            )}
          </div>

          {/* share toolbar */}
          <ShareToolbar />
        </div>
        <p className="text-sm text-dim mb-6">
          14 min read · {formatBlogDate(blog.createdAt)}
        </p>

        {/* content */}
        {/* readOnly editor wrapped in comment provider */}
        <BlogContent blog={blog} />
      </div>
    </main>
  )
}
