import BlogCard from "./BlogCard"
import { Blog } from "@/blog"
import { useTranslations } from "next-intl"

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  const t = useTranslations("Home.blogs")
  return (
    <section className="px-3 py-10 lg:py-16 lg:px-6">
      <div className="container grid gap-4 px-4 md:gap-8 md:px-6">
        <div className="mx-auto grid max-w-3xl gap-2 lg:max-w-5xl">
          <div className="space-y-2">
            <h2 className="title">{t("title")}</h2>
            <p className="subTitle">{t("subTitle")}</p>
          </div>
          <div className="grid gap-4 md:gap-6">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
