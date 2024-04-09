"use client"

import { Blog, getSerializeTextFromSlate } from "@/blog"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import clsx from "clsx/lite"
import { formatBlogDate } from "@/utility/date"
import { motion, Variants } from "framer-motion"

interface Props {
  blog: Blog
}

const variants: Variants = {
  offView: {
    x: "-100",
    rotate: -90,
    scale: 0,
  },
  onView: {
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.5,
    },
  },
}

export default function BlogCard({ blog }: Props) {
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const description = textObj.map((t) => t.text)

  return (
    <motion.a
      href={`/blogs/${blog.id}`}
      initial="offView"
      whileInView="onView"
      variants={variants}
      viewport={{ once: true }}
    >
      <Card
        className={clsx(
          "border-transparent rounded-md outline-none h-40",
          "hover:bg-shironezumi hover:shadow-lg dark:hover:bg-kon ",
          "dark:border-shironezumi/50",
          "relative overflow-hidden blink"
        )}
      >
        <CardContent className="flex items-start p-4 md:p-6">
          <div className="relative min-w-28 lg:min-w-36 rounded aspect-video">
            <Image
              alt={blog.title}
              className="overflow-hidden object-cover invert-colors"
              src="/logo_vertical.png"
              sizes="120px 150px"
              fill
            />
          </div>
          <div className="grid gap-1 ml-4 pt-2 md:ml-6 lg:gap-2 flex-1">
            <CardTitle className="text-xl font-bold leading-none">
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
    </motion.a>
  )
}
