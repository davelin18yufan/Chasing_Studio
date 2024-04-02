import Image from "next/image"
import ShareToolbar from "@/components/ShareToolbar"
import BlogContent from "./BlogContent"
import { getBlogCached } from "@/cache"
import { redirect, Link } from "@/site/navigation"
import { Metadata } from "next"
import { getSerializeTextFromSlate } from "@/blog"
import { absolutePathForBlogImage } from "@/site/paths"
import { formatBlogDate } from "@/utility/date"
import { readingTime } from "@/lib/utils"
import { getTranslations, getLocale } from "next-intl/server"

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
      images: absolutePathForBlogImage(blog.id),
      description: text.join(" "),
    },
    twitter: {
      title: blog.title,
      description: text.join(" "),
      images: absolutePathForBlogImage(blog.id),
      card: "summary_large_image",
    },
  }
}

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  const [blog, t, locale] = await Promise.all([
    getBlogCached(blogId),
    getTranslations("Blog"),
    getLocale(),
  ])

  if (!blog) return redirect("/blogs")

  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const text = textObj.map((t) => t.text)

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
            <span>{t("createdBy")}</span>
            {blog.author.url ? (
              <Link href={blog.author.url || ""}>
                <p className="font-semibold text-xl">{blog.author.name}</p>
              </Link>
            ) : (
              <p className="font-semibold text-xl">{blog.author.name}</p>
            )}
          </div>

          {/* share toolbar */}
          <ShareToolbar blogId={blogId}/>
        </div>
        <p className="text-sm text-dim mb-6">
          {`${readingTime(text.join(""), locale)} ${t("readingTime")}`} ·{" "}
          {formatBlogDate(blog.createdAt)}
        </p>

        {/* content */}
        {/* readOnly editor wrapped in comment provider */}
        <BlogContent blog={blog} />
      </div>
    </main>
  )
}
