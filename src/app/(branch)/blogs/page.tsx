import { getBlogsCached, getBlogsCountCached } from "@/cache"
import GridBlogs from "./GridBlogs"
import SetsBlogs from "./SetsBlogs"
import {
  PaginationParams,
  getPaginationForSearchParams,
} from "@/site/pagination"
import { Metadata } from "next"
import { MAX_BLOGS_TO_SHOW_OG } from "@/blog"
import { ABSOLUTE_PATH_FOR_BLOGS } from "@/site/paths"

export async function generateMetadata(): Promise<Metadata> {
  const blogs = await getBlogsCached({ limit: MAX_BLOGS_TO_SHOW_OG })

  if (blogs.length > 0) {
    return {
      openGraph: {
        images: ABSOLUTE_PATH_FOR_BLOGS,
      }, 
      twitter: {
        card: "summary_large_image",
        images: ABSOLUTE_PATH_FOR_BLOGS,
      },
    }
  } else return {}
}

export default async function BlogPage({ searchParams }: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams, 12)

  const [blogs, count] = await Promise.all([
    getBlogsCached({ limit }),
    getBlogsCountCached(),
  ])

  const showMore = count > blogs.length

  return (
    <section className="container px-4 md:px-6 lg:px-8 gap-4">
      <GridBlogs blogs={blogs} />

      <div className="w-full h-0.5 bg-primary my-4" />

      <SetsBlogs blogs={blogs} offset={offset} showMore={showMore} />
    </section>
  )
}
