import { MergeTags, Tags } from "@/tag"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// PLACEHOLDER LOADER
export const shimmer = (w: number, h: number) =>
  // eslint-disable-next-line max-len
  `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" 
    from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
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

// Merge different types of Tags and reformat
export const mergeTags = (photoTags: Tags, blogTags: Tags): MergeTags => {
  // merge into hashmap
  const mergeTagsMap = new Map<string, MergeTags[0]>()

  for (let { tag, count } of photoTags) {
    tag = tag.toLowerCase()
    const existingTag = mergeTagsMap.get(tag)

    if (!existingTag) {
      mergeTagsMap.set(tag, { tag, photoCount: count, blogCount: 0 })
    } else {
      existingTag.photoCount += count
    }
  }

  for (let { tag, count } of blogTags) {
    tag = tag.toLowerCase()
    const existingTag = mergeTagsMap.get(tag)

    if (!existingTag) {
      mergeTagsMap.set(tag, { tag, photoCount: 0, blogCount: count })
    } else {
      existingTag.blogCount += count
    }
  }

  return Array.from(mergeTagsMap.values())
}

// calculate reading duration
export const readingTime = (text: string, locale?: string) => {
  // words per minute (based on study)
  const wpm = (locale === "zh" || !locale) ? 158 : 225
  // calculating total words
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time
}

export const debouncedFn = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    clearTimeout(timer ?? undefined)

    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, delay)
  }
}