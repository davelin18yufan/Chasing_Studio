"use client"

import clsx from "clsx/lite"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Photo } from "@/photo"
import { useScroll, useMotionValueEvent } from "framer-motion"

function GridImgWrapper({
  children,
  gridClasses,
}: {
  children: React.ReactNode
  gridClasses: string
}) {
  return (
    <ul className={clsx("h-full", gridClasses, "relative overflow-hidden")}>
      {children}
    </ul>
  )
}

function GridImg({
  src,
  alt,
  show,
  delay,
  absolute,
}: {
  src: string
  alt: string
  show: boolean
  delay: number
  absolute?: boolean
}) {
  return (
    <li
      key={alt}
      className={clsx(
        "fadeInImg", // dynamic transition
        show && "z-10 fadeIn",
        absolute && "absolute top-0 left-0"
      )}
      style={{ transitionDelay: `${delay}ms` }}
      // dynamic transition class might replace the default timing,
      // using style for top priority
    >
      <div className="w-full h-full relative">
        <Image
          src={src}
          alt={alt}
          className="object-cover"
          fill
          sizes="50vw"
          priority
          loader={({ src, width, quality }) =>
            `_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${
              quality || 75
            }`
          }
        />
      </div>
    </li>
  )
}

export default function HeroSection({
  title,
  photos,
}: {
  title: string
  photos: Photo[]
}) {
  const [index, setIndex] = useState(0)
  const [titleHeight, setTitleHeight] = useState(87) // initial height
  const { scrollY } = useScroll()
  const titleRef = useRef<HTMLDivElement>(null)

  // switch pictures every 4 secs.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useMotionValueEvent(scrollY, "change", (scrollPosition) => {
    // using container relative height to change style
    const windowHeight = window.innerHeight
    if (!titleRef.current) return
    const containerRect = titleRef.current.getBoundingClientRect()

    // calculate overflow - exceeding screen height
    const overflowDistance = Math.max(
      0,
      scrollPosition - (windowHeight / 2 - containerRect.height)
    )
    setTitleHeight(Math.max(0, 87 - overflowDistance))
  })

  return (
    <section id="cover" className={clsx("w-full h-screen", "relative")}>
      {/* Photos */}
      <div
        className={clsx(
          "absolute top-0 left-0",
          "w-full h-full",
          "grid grid-cols-2 md:grid-cols-4 grid-rows-4",
          "justify-center items-center"
        )}
      >
        <GridImgWrapper gridClasses="col-start-1 col-span-1 md:row-span-2">
          <GridImg
            src={photos[0].url}
            alt={photos[0].id}
            show={index === 0}
            delay={200}
          />
          <GridImg
            src={photos[1].url}
            alt={photos[1].id}
            show={index === 1}
            delay={200}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper gridClasses="col-start-2 col-span-1 md:row-span-2">
          <GridImg
            src={photos[2].url}
            alt={photos[2].id}
            show={index === 0}
            delay={500}
          />
          <GridImg
            src={photos[3].url}
            alt={photos[3].id}
            show={index === 1}
            delay={500}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper
          gridClasses={clsx(
            "col-span-2 md:col-start-1",
            "md:row-span-2 md:row-start-3"
          )}
        >
          <GridImg
            src={photos[4].url}
            alt={photos[4].id}
            show={index === 0}
            delay={300}
          />
          <GridImg
            src={photos[5].url}
            alt={photos[5].id}
            show={index === 1}
            delay={300}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper
          gridClasses={clsx(
            "col-span-2",
            "row-start-3 row-span-2 md:row-start-1 md:row-span-4"
          )}
        >
          <GridImg
            src={photos[6].url}
            alt={photos[6].id}
            show={index === 0}
            delay={0}
          />
          <GridImg
            src={photos[7].url}
            alt={photos[7].id}
            show={index === 1}
            delay={0}
            absolute={true}
          />
        </GridImgWrapper>
      </div>

      {/* Title */}
      <div className="relative heroTitle">
        <div
          className={clsx(
            "sticky top-1/2 -translate-y-1/2",
            "text-center leading-tight md:leading-[1.2] z-20"
          )}
          ref={titleRef}
          style={{
            // eslint-disable-next-line max-len
            filter: `invert(${(titleHeight / 87) * 100}%) 
              grayscale(${(titleHeight / 87) * 100}%) 
              brightness(${(titleHeight / 87) * 100 + 100}%)`,
          }}
        >
          <h2
            className={clsx(
              "text-6xl md:text-max font-extrabold",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-shinbashi to-tokusa"
            )}
          >
            {title}
          </h2>
        </div>
      </div>
    </section>
  )
}
