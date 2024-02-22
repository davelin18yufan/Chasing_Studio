import { dataUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

function BlogCard({ height }: { height?: string }) {
  return (
    <Link
      className={`rounded-lg shadow overflow-hidden relative ${height}`}
      href={`/article/id`} // id
    >
      <Image
        src="https://source.unsplash.com/random/600x400"
        alt="Blog image"
        sizes="(max-width: 768px) 100vw, 33vw"
        width={500}
        height={400}
        className="w-full md:h-full object-cover"
        placeholder="blur"
        blurDataURL={dataUrl}
      />

      {/* title/description */}
      <div className="absolute w-full h-full flex flex-col justify-end top-0 left-0 p-4 bg-filter text-white z-10 ">
        <h2 className="text-lg md:text-xl font-bold mb-2">
          Partial prerendering: Building towards a new default rendering model
        </h2>
        <div className="flex items-center justify-between md:text-sm text-gray-200 mb-2 bg-transparent">
          <p className="line-clamp-1">Sebastian Markbåge</p>
          <span>Nov. 9th 2023</span>
        </div>
        <p className="text-gray-300 line-clamp-2">
          Explore how partial prerendering can improve performance and user
          experience by optimizing the rendering path of web applications.
        </p>
      </div>
    </Link>
  )
}

export default function GridBlogs() {
  return (
    <section>
      <h1 className="title py-6">Latest Post</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:h-[600px]">
        <BlogCard />

        <div className="overflow-hidden flex flex-col justify-center items-center gap-4 max-md:max-h-[50vh]">
          <BlogCard height="md:basis-2/5" />
          <BlogCard height="md:basis-3/5" />
        </div>

        <div className="overflow-hidden flex flex-col justify-center items-center gap-4 max-md:max-h-[50vh]">
          <BlogCard height="md:basis-3/5" />
          <BlogCard height="md:basis-2/5" />
        </div>
      </div>
    </section>
  )
}
