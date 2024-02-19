"use client"

import clsx from "clsx/lite"
import { useState, useEffect } from "react"
import { heroSectionImgs } from "@/constants"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection({
  title,
  subTitle,
  photos
}: {
  title: string
  subTitle: string
  photos: {id:string, url:string}[]
}) {
  const [index, setIndex] = useState(0)

  // switch pictures every 3 secs.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="cover"
      className={clsx(
        "w-full py-28 md:py-40 xl:py-52",
        "flex justify-center items-center",
        "relative"
      )}
    >
      <div className="absolute top-0 left-0 w-full min-h-[380px] md:min-h-[480px] xl:min-h-[580px] grid xs:grid-cols-2">
        {/* take two pictures */}
        {[index, (index + 1) % photos.length].map((item) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.75 }}
            className="relative"
            key={photos[item].id}
          >
            {/* sizes is used to optimize image size pre-download by the browser */}
            <Image
              src={photos[item].url}
              alt={`hero picture ${item + 1}`}
              fill
              // 2 break points
              sizes="100vw, (min-width: 390px) 50vw"
              className="rounded-md object-cover"
              priority
            />
          </motion.div>
        ))}
      </div>
      <div className="relative overflow-hidden -top-2">
        <div className="container flex flex-col items-center px-4 space-y-2 md:px-6 lg:space-y-4">
          <div className="space-y-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-violet-600">
            <h1 className="title">{title}</h1>
            <p className="mx-auto max-w-[600px] ">{subTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
