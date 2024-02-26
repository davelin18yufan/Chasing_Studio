import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// PLACEHOLDER LOADER
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`

// transform flatten form value into nested
// Ex. {title: '', author.name: '', author.url: ''}
//  -> {title: '', author: { name: '', url: ''}}
export const transformKey = (
  obj: { [key: string]: any },
  initialValue: any
) => {
  const output = { ...initialValue }
  for (const key in obj) {
    const keys = key.split(".")
    const value = obj[key]
    let temp = output
    for (let i = 0; i < keys.length; i++) {
      const nestedKey = keys[i]
      if (i === keys.length - 1) {
        // last key -> assign value
        temp[nestedKey] = value
      } else {
        temp[nestedKey] = temp[nestedKey] || {} // in case it's empty
        temp = temp[nestedKey] // assign nested obj and keep looping
      }
    }
  }
  return output
}

// extract images from content
export const getSerializeImgFromSlate = (
  node: any,
  output: {
    id: string
    type: string
    url: string
  }[] = []
) => {
  if (Array.isArray(node)) {
    node.forEach((n) => getSerializeImgFromSlate(n, output))
  }

  if (node.type === "img" && node.url) {
    output.push({ id: node.id || "", type: "img", url: node.url })
  }

  return output
}
