import { auth } from "@/auth"
import { MAX_BLOGS_TO_SHOW_OG } from "@/blog"
import { getBlogsCached, getImageCacheHeadersForAuth } from "@/cache"
import { IMAGE_OG_DIMENSION_SMALL } from "@/photo/image-response"
import { getIBMPlexMonoMedium } from "@/site/font"
import GridBlogs from "../blogs/GridBlogs"
import { ImageResponse } from "next/og"

export const runtime = "edge"


export async function GET() {
  const [blogs, headers, { fonts }] = await Promise.all([
    getBlogsCached({ limit: MAX_BLOGS_TO_SHOW_OG }),
    getImageCacheHeadersForAuth(await auth()),
    getIBMPlexMonoMedium(),
  ])

  // get w/h based on aspectRatio default 16/ 9
  const { width, height } = IMAGE_OG_DIMENSION_SMALL
  return new ImageResponse(<GridBlogs blogs={blogs} />, {
    width,
    height,
    headers,
    fonts,
  })
}
