import { auth } from "@/auth"
import { getImageCacheHeadersForAuth, getCoverPhotosCached } from "@/cache"
import { IMAGE_OG_DIMENSION_SMALL } from "@/photo/image-response"
import { getIBMPlexMonoMedium } from "@/site/font"
import { ImageResponse } from "next/og"
import ImageContainer from "@/photo/image-response/components/ImageContainer"
import ImageCaption from "@/photo/image-response/components/ImageCaption"
import { SITE_DOMAIN_OR_TITLE } from "@/site/config"
import ImagePhotoGrid from "@/photo/image-response/components/ImagePhotoGrid"

export const runtime = "edge"

export async function GET() {
  const [photos, headers, { fontFamily, fonts }] = await Promise.all([
    getCoverPhotosCached(),
    getImageCacheHeadersForAuth(await auth()),
    getIBMPlexMonoMedium(),
  ])
  const { width, height } = IMAGE_OG_DIMENSION_SMALL

  return new ImageResponse(
    (
      <ImageContainer {...{ width, height }}>
        {/* <ImagePhotoGrid
          {...{
            photos,
            width,
            height,
          }}
        /> */}
        <ImageCaption {...{ width, height, fontFamily }}>
          {SITE_DOMAIN_OR_TITLE}
        </ImageCaption>
      </ImageContainer>
    ),
    { width, height, headers, fonts }
  )
}
