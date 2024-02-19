import BlogCard from "./BlogCard";

export default function Blogs() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container grid gap-4 px-4 md:gap-8 md:px-6">
        <div className="mx-auto grid max-w-3xl gap-2 lg:max-w-5xl">
          <div className="space-y-2">
            <h2 className="title">Blogs</h2>
            <p className="subTitle">
              Stories and ideas from the team behind the platform. Get insights
              into the latest trends in web development, cloud computing, and
              more.
            </p>
          </div>
          <div className="grid gap-4 md:gap-6">
            <BlogCard showButton={false} />
            <BlogCard showButton={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
