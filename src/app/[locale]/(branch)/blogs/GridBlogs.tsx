/* eslint-disable max-len */
import { dataUrl } from "@/lib/utils"
import Image from "next/image"
import { Link } from "@/site/navigation"
import clsx from "clsx/lite"
import { Blog, getSerializeTextFromSlate } from "@/blog"
import { pathForBlog } from "@/site/paths"
import { formatBlogDate } from "@/utility/date"
import { useTranslations } from "next-intl"

function BlogCard({ blog, height }: { blog: Blog; height?: string }) {
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const text = textObj.map((t) => t.text)
  return (
    <Link
      className={`rounded-lg shadow w-full overflow-hidden relative ${height}`}
      href={pathForBlog(blog.id)}
    >
      <Image
        src={blog.coverPhoto.src}
        alt={blog.title}
        sizes="(max-width: 768px) 100vw, 33vw"
        width={500}
        height={400}
        className="w-full md:h-full object-cover"
        placeholder="blur"
        blurDataURL={dataUrl}
      />

      {/* title/description */}
      <div
        className={clsx(
          "absolute top-0 left-0",
          "w-full h-full flex flex-col justify-end",
          "p-4 z-10",
          " bg-filter text-shironeri"
        )}
      >
        <h2 className="text-lg md:text-xl font-bold mb-2">{blog.title}</h2>
        <div
          className={clsx(
            "flex items-center justify-between",
            "md:text-sm text-shironezumi mb-2 bg-transparent"
          )}
        >
          <p className="line-clamp-1">{blog.author.name}</p>
          <span>{formatBlogDate(blog.createdAt)}</span>
        </div>
        <p className="text-hainezumi line-clamp-2">{text.join(" ")}</p>
      </div>
    </Link>
  )
}

export default function GridBlogs({ blogs }: { blogs: Blog[] }) {
  const t = useTranslations("Blog")
  return (
    <section>
      <h1 className="title pb-3">{t("latest")}</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:h-[600px]">
        <BlogCard blog={blogs[0]} />

        <div
          className={clsx(
            "overflow-hidden",
            "flex flex-col justify-center items-center",
            "gap-4 max-md:max-h-[50vh]"
          )}
        >
          <BlogCard blog={blogs[1]} height="md:basis-2/5" />
          <BlogCard blog={blogs[2]} height="md:basis-3/5" />
        </div>
        <div
          className={clsx(
            "overflow-hidden",
            "flex flex-col justify-center items-center",
            "gap-4 max-md:max-h-[50vh]"
          )}
        >
          <BlogCard blog={blogs[3]} height="md:basis-3/5" />
          <BlogCard blog={blogs[4]} height="md:basis-2/5" />
        </div>
      </div>
    </section>
  )
}
