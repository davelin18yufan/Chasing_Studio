import MorePhotos from "@/photo/MorePhotos"
import BlogCard from "../(home)/components/BlogCard"
import { Blog } from "@/blog"
import { pathForBlogs } from "@/site/paths"

export default function SetsBlogs({
  blogs,
  offset,
  showMore
}: {
  blogs: Blog[]
  offset: number
  showMore: boolean
}) {
  return (
    <>
      <h2 className="title py-6">All Posts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {blogs.map((blog) => 
          <BlogCard blog={blog} key={blog.id}/>
        )}
      </div>
      {showMore && <MorePhotos path={pathForBlogs(offset + 1)} />}
    </>
  )
}
