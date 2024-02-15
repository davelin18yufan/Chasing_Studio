import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function BlogCard() {
  return (
    <Link href="/">
      <Card className="hover:bg-gray-300 hover:shadow-lg dark:hover:bg-slate-700 dark:border-gray-100/50  outline-none">
        <CardContent className="flex items-start p-4 md:p-6">
          <Image
            alt="Image"
            className="rounded aspect-square overflow-hidden object-cover invert-colors"
            height="120"
            src="/favicons/logo_vertical.png"
            width="120"
          />
          <div className="grid gap-1 ml-4 md:ml-6 lg:gap-2">
            <CardTitle className="text-lg font-bold leading-none">
              Introducing the New Platform Experience
            </CardTitle>
            <CardDescription className="text-sm text-main">
              Stories and ideas from the team behind the platform. Get insights
              into the latest trends in web development, cloud computing, and
              more.
            </CardDescription>
            <p className="text-sm text-medium ">
              The Vercel Team · August 24, 2023
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}