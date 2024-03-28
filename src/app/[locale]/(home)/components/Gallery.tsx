import GalleryCard from "./GalleryCard"
import { Photo } from "@/photo"
import clsx from "clsx/lite"
import { useTranslations } from "next-intl"

export default function GallerySection({ photos }: { photos: Photo[] }) {
  const t = useTranslations("Home.gallery")
  return (
    <section className="px-3 py-10 lg:py-16 lg:px-6">
      <div
        className={clsx(
          "container grid items-center justify-center ",
          "gap-4 px-4 text-center",
          "mb-6 md:px-6"
        )}
      >
        <h2 className="title">{t("title")}</h2>
      </div>
      <div
        className={clsx(
          "mx-auto max-w-5xl",
          "grid items-start gap-4",
          "px-4 md:gap-8 md:px-6 lg:gap-10"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-2 items-stretch justify-center",
            "gap-4 md:grid-cols-3"
          )}
        >
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
