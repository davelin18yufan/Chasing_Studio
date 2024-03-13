import Link from "next/link"
import clsx from "clsx/lite"
import "@/site/style.css"

interface Props {
  id: string
  src: string
  title?: string
  tags: string[]
  size: number
  className?: string
}

export default function GalleryCard({
  src,
  title,
  size,
  tags,
  id,
  className,
}: Props) {
  return (
    <Link
      className="relative overflow-hidden rounded-xl aspect-square galleryCard group"
      href={`/p/${id}`}
    >
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`galleryCardImg galleryCardImg1 w-[${size}]`}
      ></div>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`galleryCardImg galleryCardImg2 w-[${size}]`}
      ></div>

      <div
        className={clsx(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center",
          "text-main opacity-10 transition group-hover:opacity-100"
        )}
      >
        <h3 className="text-xl font-bold ">{title}</h3>
        {tags.map((tag, i) => (
          <p className="text-sm underline" key={i}>
            {tag}
          </p>
        ))}
      </div>
    </Link>
  )
}
