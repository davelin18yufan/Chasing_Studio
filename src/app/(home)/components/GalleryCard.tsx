import Image from "next/image"
import Link from "next/link"
import clsx from "clsx/lite"

interface Props {
  id:string,
  alt: string
  src: string
  title?: string
  tags: string[]
  size: number
  className?: string
}

export default function GalleryCard({
  alt,
  src,
  title,
  size,
  tags,
  id,
  className,
}: Props) {
  return (
    <Link
      className="relative group overflow-hidden rounded-xl aspect-square"
      href={`/p/${id}`}
    >
      <Image
        alt={alt}
        className={`galleryCardImg`}
        height={size}
        src={src}
        width={size}
      />
      <div
        className={clsx(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center",
          "text-main opacity-100 transition group-hover:opacity-50"
        )}
      >
        <h3 className="text-xl font-bold ">{title}</h3>
        {tags.map((tag, i) => (
          <p className="text-sm" key={i}>
            {tag}
          </p>
        ))}
      </div>
    </Link>
  )
}
