import BlogForm from "../BlogForm"

export default function AdminCreateBlogPage() {
  return (
    <>
      <h2 className="text-2xl font-bold">Writing</h2>
      <BlogForm type="create" />
    </>
  )
}
