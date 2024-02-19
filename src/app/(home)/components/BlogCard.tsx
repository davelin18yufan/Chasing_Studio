"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import EditAndDeleteBtn from "@/site/EditAndDeleteBtn"

import { isPathAdmin } from "@/site/paths"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  showButton: boolean
}


export default function BlogCard({ showButton }: Props) {
  const pathname = usePathname()
  const allowEdit = showButton && isPathAdmin(pathname)

  return (
    <Link href="/article/id">
      <Card className="border-transparent hover:bg-gray-300 hover:shadow-lg dark:hover:bg-slate-700 dark:border-gray-200/50 rounded-md outline-none relative">
        {allowEdit && (
          <div className='absolute top-0 right-0 px-4 py-2'>
            <EditAndDeleteBtn/>
          </div>
        )}
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
            <CardDescription className="text-sm text-main line-clamp-2">
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
