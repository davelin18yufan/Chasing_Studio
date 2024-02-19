import GridBlogs from "./GridBlogs"
import SetsBlogs from "./SetsBlogs"

export default function page() {
  return (
    <section className="container px-4 md:px-6 lg:px-8 gap-4">
      <GridBlogs />

      <div className='w-full h-0.5 bg-primary my-4'/>

      <SetsBlogs />
    </section>
  )
}
