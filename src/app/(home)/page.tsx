import { getPhotosCached, getPhotosCountCached } from '@/cache';
import { generateOgImageMetaForPhotos } from '@/photo';
import { Metadata } from 'next';
import Link from "next/link"
import Image from "next/image"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export const runtime = 'edge';

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
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="relative overflow-hidden -top-2">
          <div className="container flex flex-col items-center px-4 space-y-2 md:px-6 lg:space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Chasing Studio
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
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
            <p className="max-w-3xl mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Protograph Studio offers a range of design services, from
              user-friendly interfaces to stunning visual identities. Let us
              bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-12 lg:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Gallery
            </h2>
          </div>
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
      <div className="py-12 lg:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Blog
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Keep up with the latest trends in design and technology.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 px-4 md:gap-8 md:px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Link
                className="text-2xl font-bold leading-tighter text-gray-900 hover:underline dark:text-gray-100"
                href="#"
              >
                The Art of Typography in Web Design
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posted on August 23, 2023
              </p>
            </div>
            <p className="text-lg leading-loose text-gray-900 md:text-xl/relaxed dark:text-gray-100">
              Typography is an essential part of web design. It not only
              communicates the content of a website but also reflects the
              personality and style of the brand. In this article, we will
              explore the art of typography in web design and discuss how
              designers can use fonts to create beautiful and effective
              websites.
            </p>
            <div className="mt-6">
              <Link
                className="inline-flex items-center font-semibold underline hover:underline"
                href="#"
              >
                Read More
                <span className="inline-block ml-1.5">
                  <ChevronRightIcon className="w-4 h-4" />
                </span>
              </Link>
            </div>
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
              Ready to get started? Send us a message and we'll be in touch.
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

function ChevronRightIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

