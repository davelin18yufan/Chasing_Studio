import GalleryCard from "./GalleryCard"
import { Photo } from "@/photo"

export default function GallerySection({ photos }: { photos: Photo[] }) {
  return (
    <section className="py-10 lg:py-16">
      <div className="container grid items-center justify-center gap-4 px-4 text-center mb-4 md:px-6">
        <h2 className="title">Gallery</h2>
      </div>
      <div className="mx-auto grid max-w-5xl items-start gap-4 px-4 md:gap-8 md:px-6 lg:gap-10">
        <div className="grid grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3">
          {photos?.map((p) => (
            <GalleryCard
              key={p.id}
              title={p.title}
              src={p.url}
              size={225}
              tags={p.tags}
              id={p.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
