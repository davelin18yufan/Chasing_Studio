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
  return `${src}?w=${width}&q=${quality || 75}`
}
