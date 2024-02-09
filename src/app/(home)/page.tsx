// import { getPhotosCached, getPhotosCountCached } from "@/cache"
// import { generateOgImageMetaForPhotos } from "@/photo"
// import { Metadata } from "next"
// import Link from "next/link"
import Image from "next/image"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"

export const runtime = "edge"

// export async function generateMetadata(): Promise<Metadata> {
//   // Make homepage queries resilient to error on first time setup
//   const photos = await getPhotosCached({ limit: MAX_PHOTOS_TO_SHOW_OG })
//     .catch(() => []);
//   return generateOgImageMetaForPhotos(photos);
// }

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-home-hero bg-no-repeat bg-cover opacity-0.5">
        <div className="relative overflow-hidden -top-2">
          <div className="container flex flex-col items-center px-4 space-y-2 md:px-6 lg:space-y-4 animate-fadeIn">
            <div className="space-y-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-violet-600">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Chasing Studio
              </h1>
              <p className="mx-auto max-w-[600px] ">
                Where your memories come to life. Capture your moments with our
                professional photography services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <div className="relative py-12 lg:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Overview
            </h2>
            <div className="max-w-3xl mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              <p>
                我們是Chasing
                Studio，致力於以創意和精準捕捉生活中最珍貴的時刻。我們相信每張照片都蘊含著獨特的故事，專業服務涵蓋肖像、活動、婚禮和商業項目等廣泛範疇。
              </p>
              <p>
                在 Chasing
                Studio，我們深知創造永恆記憶的重要性，這些記憶將被世代傳承。我們的團隊由經驗豐富的攝影師組成，將技術專業與藝術視野相結合，提供令人驚嘆的影像作品，超出客戶的期望。
              </p>
              <p>
                我們堅持追求卓越和客戶滿意度，為每位客戶提供無縫和愉快的體驗。從初次諮詢到最終交付影像，我們始終重視清晰溝通、細心呵護和個性化服務。
                無論您是慶祝特殊的里程碑、推出新產品還是保存珍貴的回憶，Chasing
                Studio都會幫助您實現您的願景。立即與我們聯繫，討論您的攝影需求，讓我們捕捉您生活中最重要的時刻。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-12 lg:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center mb-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Gallery
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-4 px-4 md:gap-8 md:px-6 lg:gap-10">
          <div className="grid grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3">
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 1"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project One
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 2"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project Two
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 3"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project Three
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 4"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project Four
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 5"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project Five
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square">
              <Image
                alt="Project 6"
                className="object-cover object-center w-full transition-transform group-hover:scale-105"
                height="600"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width="600"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-900/20 transition-colors dark:bg-gray-900/20">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline dark:text-gray-100">
                  Project Six
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Description
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog */}
      <div className="bg-gray-50 dark:bg-gray-950 py-12 lg:py-16">
        <div className="container grid gap-4 px-4 md:gap-8 md:px-6">
          <div className="mx-auto grid max-w-3xl gap-2 lg:max-w-5xl">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                From the Blog
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                Stories and ideas from the team behind the platform. Get
                insights into the latest trends in web development, cloud
                computing, and more.
              </p>
            </div>
            {/* <div className="grid gap-4 md:gap-6">
                <Card>
                  <CardContent className="flex items-start p-4 md:p-6">
                    <img
                      alt="Image"
                      className="rounded aspect-square overflow-hidden object-cover"
                      height="120"
                      src="/placeholder.svg"
                      width="120"
                    />
                    <div className="grid gap-1 ml-4 md:ml-6 lg:gap-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Article
                      </p>
                      <h3 className="font-bold leading-none">
                        Introducing the New Platform Experience
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        The Vercel Team · August 24, 2023
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-start p-4 md:p-6">
                    <img
                      alt="Image"
                      className="rounded aspect-square overflow-hidden object-cover"
                      height="120"
                      src="/placeholder.svg"
                      width="120"
                    />
                    <div className="grid gap-1 ml-4 md:ml-6 lg:gap-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Article
                      </p>
                      <h3 className="font-bold leading-none">
                        Building Jamstack Applications with Next.js
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sarah Johnson · August 24, 2023
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-start p-4 md:p-6">
                    <img
                      alt="Image"
                      className="rounded aspect-square overflow-hidden object-cover"
                      height="120"
                      src="/placeholder.svg"
                      width="120"
                    />
                    <div className="grid gap-1 ml-4 md:ml-6 lg:gap-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Article
                      </p>
                      <h3 className="font-bold leading-none">
                        The Future of Web Development: Innovations and Trends
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Alex Chen · August 24, 2023
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div> */}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-12 lg:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Ready to get started? Send us a message and we will be in touch.
            </p>
          </div>
          <div className="mx-auto max-w-sm space-y-4">
            {/* <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="name">
                    Name
                  </Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="message">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  required
                  rows="4"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form> */}
          </div>
        </div>
      </div>
    </>
  )
}
