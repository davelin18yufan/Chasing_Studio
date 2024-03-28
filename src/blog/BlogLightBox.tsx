import { clsx } from "clsx/lite"
import { Blog } from "."
import { Link } from "@/site/navigation"
import Image from "next/image"
import { pathForAdminBlogEdit } from "@/site/paths"
import { useTranslations } from "next-intl"

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={pathForAdminBlogEdit(blog.id)}
      className={clsx("relative block", "w-full h-16", "overflow-hidden ")}
    >
      <Image
        src={blog.coverPhoto.src}
        alt={blog.title}
        fill
        className={clsx(
          "object-cover rounded-lg",
          "blur-sm opacity-80 hover:opacity-100 hover:blur-none",
          "transition-all duration-300 ease-out "
        )}
      />
      <div
        className={clsx(
          "flex justify-between items-center",
          "px-2 gap-10",
          "absolute left-0 top-[50%] -translate-y-2",
          "w-full z-10",
          "text-gofun bg-transparent pointer-events-none",
          "bg-clip-text text-transparent bg-gradient-to-r from-stone-300 to-teal-700"
        )}
      >
        <h4 className="text-xl font-bold">{blog.title}</h4>
        <p className="font-bold">{blog.author.name}</p>
      </div>
    </Link>
  )
}

export default function BlogLightbox({
  count,
  blogs,
  maxBlogToShow = 6,
  moreLink,
}: {
  count: number
  blogs: Blog[]
  maxBlogToShow?: number
  moreLink: string
}) {
  const blogCountToShow =
    maxBlogToShow < count ? maxBlogToShow - 1 : maxBlogToShow

  const countNotShown = count - blogCountToShow

  const showOverageTile = countNotShown > 0
  const t = useTranslations("Photo")

  return (
    <div
      className={clsx(
        "border dark:border-gray-800 p-1.5 lg:p-2 rounded-md",
        "bg-gray-50 dark:bg-gray-950",
        " grid grid-cols-1 md:grid-cols-2 gap-2 items-center"
      )}
    >
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}

      {!showOverageTile ? (
        <Link
          href={moreLink}
          className={clsx(
            "flex items-center justify-center",
            "gap-2 w-full",
            blogs.length % 2 === 0 && "col-span-2"
          )}
        >
          <div className="text-[1.1rem] lg:text-[1.5rem]">+{countNotShown}</div>
          <div className="text-dim">{t("more")}</div>
        </Link>
      ) : undefined}
    </div>
  )
}
