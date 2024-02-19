import { getPhotosCached } from "@/cache"
import GalleryCard from "./GalleryCard"

export default async function GallerySection() {
  const photos = await getPhotosCached({ limit: 6 })
  return (
    <section className="py-12 lg:py-20">
      <div className="container grid items-center justify-center gap-4 px-4 text-center mb-4 md:px-6">
        <h2 className="title">Gallery</h2>
      </div>
      <div className="mx-auto grid max-w-5xl items-start gap-4 px-4 md:gap-8 md:px-6 lg:gap-10">
        <div className="grid grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3">
          {photos?.map((item) => (
            <GalleryCard
              key={item.id}
              alt={item.title || "img"}
              title={item.title}
              src={item.url}
              size={600}
              tags={item.tags}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
