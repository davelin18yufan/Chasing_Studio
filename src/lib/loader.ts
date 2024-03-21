"use client"

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width?: string | number
  quality?: string | number
}) {
  return `_next/image?url=${encodeURIComponent(src)}?w=${width}&q=${
    quality || 75
  }`
}
