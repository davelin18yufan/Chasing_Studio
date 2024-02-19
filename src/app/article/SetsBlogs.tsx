import BlogCard from "../(home)/components/BlogCard"

export default function SetsBlogs() {
  return (
    <>
      <h2 className="title py-6">All Posts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </>
  )
}
