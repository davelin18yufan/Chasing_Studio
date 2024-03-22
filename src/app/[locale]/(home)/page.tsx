import {
  getBlogsCached,
  getCoverPhotosCached,
  getPhotosCached,
} from "@/cache"
import HeroSection from "./components/HeroSection"
import Intro from "./components/Intro"
import Gallery from "./components/Gallery"
import Blogs from "./components/Blogs"
import Contact from "./components/Contact"
import { BASE_URL } from "@/site/config"
import { Metadata } from "next"
import { MAX_BLOGS_TO_SHOW_PER_TAG } from "@/blog"
import { MAX_PHOTOS_TO_SHOW_PER_TAG } from "@/photo/image-response"
import { getTranslations } from "next-intl/server"

export const runtime = "edge"

export async function generateMetadata(): Promise<Metadata> {
  // show hero section
  return {
    openGraph: {
      images: `${BASE_URL}/api/og`,
    },
    twitter: {
      card: "summary_large_image",
      images: `${BASE_URL}/api/og`,
    },
  }
}

export default async function HomePage() {
  const [coverPhotos, blogs, photos] = await Promise.all([
    getCoverPhotosCached(),
    getBlogsCached({ limit: MAX_BLOGS_TO_SHOW_PER_TAG }),
    getPhotosCached({ limit: MAX_PHOTOS_TO_SHOW_PER_TAG }),
  ])
  const t = await getTranslations()

  return (
    <>
      <HeroSection
        title="Chasing Studio"
        photos={coverPhotos}
      />
      <Intro
        title={t("Home.intro.title")}
        description={t("Home.intro.description")}
      />

      {/* Sections */}
      <Gallery photos={photos} />
      <Blogs blogs={blogs} />
      <Contact />
    </>
  )
}
