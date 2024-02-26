import { dummyBlog } from "@/app/admin/blogs/[blogId]/edit/page"
import Image from "next/image"
import Link from "next/link"
import ShareToolbar from "@/components/ShareToolbar"
import BlogContent from "./BlogContent"

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  //TODO: get blog

  return (
    <main className="container">
      {/* cover */}
      <div
        className={`${
          dummyBlog.coverPhoto?.src ?? "hidden"
        } w-full relative aspect-video`}
      >
        <Image
          alt="Cover photo"
          className=" overflow-hidden rounded-lg object-fill"
          src={dummyBlog.coverPhoto?.src || ""}
          fill
        />
      </div>

        {/* Article */}
      <div className="max-w-2xl mx-auto my-12">
        <h1 className="text-5xl font-bold mb-4">{dummyBlog.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-medium">
            <span>Created by</span>
            <Link href={dummyBlog.author.url || ""}>
              <p className="font-semibold text-xl">{dummyBlog.author.name}</p>
            </Link>
          </div>

          {/* share toolbar */}
          <ShareToolbar />
        </div>
        <p className="text-sm text-dim mb-6">14 min read · Feb 5, 2024</p>

        {/* content */}
        {/* readOnly editor wrapped in comment provider */}
        <BlogContent blog={dummyBlog} />
      </div>
    </main>
  )
}
