import { auth } from "@/auth"
import { getImageCacheHeadersForAuth, getCoverPhotosCached } from "@/cache"
import {
  IMAGE_OG_DIMENSION_SMALL,
} from "@/photo/image-response"
import { getIBMPlexMonoMedium } from "@/site/font"
import { ImageResponse } from "next/og"
import HeroSection from "./components/HeroSection"
import { SITE_DESCRIPTION, SITE_DOMAIN_OR_TITLE } from "@/site/config"

export const runtime = "edge"

export async function GET() {
  const [photos, headers, { fonts }] = await Promise.all([
    getCoverPhotosCached(),
    getImageCacheHeadersForAuth(await auth()),
    getIBMPlexMonoMedium(),
  ])
  const urls = photos.map(({ id, url }: { id: string; url: string }) => ({
    id,
    url,
  }))
  const { width, height } = IMAGE_OG_DIMENSION_SMALL

  return new ImageResponse(
    (
      <HeroSection
        title={SITE_DOMAIN_OR_TITLE}
        subTitle={SITE_DESCRIPTION || ""}
        photos={urls}
      />
    ),
    { width, height, headers, fonts }
  )
}
