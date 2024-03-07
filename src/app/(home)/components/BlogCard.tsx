"use client"

import { Blog, getSerializeTextFromSlate } from "@/blog"
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
import clsx from "clsx/lite"
import { formatBlogDate } from "@/utility/date"

interface Props {
  blog: Blog
  showButton: boolean
}

export default function BlogCard({ blog, showButton }: Props) {
  const pathname = usePathname()
  const allowEdit = showButton && isPathAdmin(pathname)
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const description = textObj.map((t) => t.text)

  return (
    <Link href="/blogs/id">
      <Card
        className={clsx(
          "border-transparent rounded-md outline-none",
          "hover:bg-gray-300 hover:shadow-lg dark:hover:bg-slate-700 dark:border-gray-200/50",
          "relative"
        )}
      >
        {allowEdit && (
          <div className="absolute top-0 right-0 px-4 py-2">
            <EditAndDeleteBtn />
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
          <div className="grid gap-1 ml-4 pt-2 md:ml-6 lg:gap-2 flex-1">
            <CardTitle className="text-lg font-bold leading-none">
              {blog.title}
            </CardTitle>
            <CardDescription className="text-sm text-main text-pretty line-clamp-2">
             {description}
            </CardDescription>
            <p className="text-sm text-medium ">
              {blog.author.name} · {formatBlogDate(blog.createdAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
