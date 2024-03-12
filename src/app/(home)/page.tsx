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

  return (
    <>
      <HeroSection
        title="Chasing Studio"
        subTitle="Where your memories come to life. Capture your moments with our professional photography services."
        photos={coverPhotos}
      />
      <Intro
        title="Who are we?"
        description="我們是Chasing
            Studio，致力於以創意和精準捕捉生活中最珍貴的時刻。我們相信每張照片都蘊含著獨特的故事，專業服務涵蓋肖像、活動、車照和商業項目等廣泛範疇。
            我們深知創造永恆記憶的重要性，這些記憶將被世代傳承。我們的團隊由經驗豐富的攝影師組成，將技術專業與藝術視野相結合，提供令人驚嘆的影像作品，超出客戶的期望。
            我們堅持追求卓越和客戶滿意度，為每位客戶提供無縫和愉快的體驗。從初次諮詢到最終交付影像，我們始終重視清晰溝通、細心呵護和個性化服務。
            無論您是慶祝特殊的里程碑、推出新產品還是保存珍貴的回憶，Chasing
            Studio都會幫助您實現您的願景。立即與我們聯繫，討論您的攝影需求，讓我們捕捉您生活中最重要的時刻。"
      />

      {/* Sections */}
      <Gallery photos={photos} />
      <Blogs blogs={blogs} />
      <Contact />
    </>
  )
}
