"use client"

import clsx from "clsx/lite"
import { useState, useEffect } from "react"
import { heroSectionImgs } from "@/constants"
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
      // dynamic transition class might replace the default timing, using style for top priority
    >
      <Image
        src={src}
        alt={alt}
        className="object-cover"
        fill
        sizes="50vw"
        priority
      />
    </li>
  )
}

export default function HeroSection({
  title,
  subTitle,
  photos,
}: {
  title: string
  subTitle: string
  photos: Photo[]
}) {
  const [index, setIndex] = useState(0)
  const [animation, setAnimation] = useState(false)
  const { scrollY } = useScroll()

  // switch pictures every 5 secs.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) =>latest > 435 ? setAnimation(true) : setAnimation(false))

 

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
            src="https://source.unsplash.com/random"
            alt={photos[0].id}
            show={index === 0}
            delay={200}
          />
          <GridImg
            src="/assets/photographer.png"
            alt={photos[1].id}
            show={index === 1}
            delay={200}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper gridClasses="col-start-2 col-span-1 md:row-span-2">
          <GridImg
            src="https://source.unsplash.com/random"
            alt={photos[0].id}
            show={index === 0}
            delay={500}
          />
          <GridImg
            src="/assets/photographer.png"
            alt={photos[1].id}
            show={index === 1}
            delay={500}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper gridClasses="col-span-2 md:row-span-2 md:row-start-3 md:col-start-1">
          <GridImg
            src="https://source.unsplash.com/random"
            alt={photos[0].id}
            show={index === 0}
            delay={300}
          />
          <GridImg
            src="/assets/photographer.png"
            alt={photos[1].id}
            show={index === 1}
            delay={300}
            absolute={true}
          />
        </GridImgWrapper>
        <GridImgWrapper gridClasses="col-span-2 row-start-3 row-span-2 md:row-start-1 md:row-span-4">
          <GridImg
            src="https://source.unsplash.com/random"
            alt={photos[0].id}
            show={index === 0}
            delay={0}
          />
          <GridImg
            src="/assets/photographer.png"
            alt={photos[1].id}
            show={index === 1}
            delay={0}
            absolute={true}
          />
        </GridImgWrapper>
      </div>

      {/* Title */}
      <div className="relative heroTitle">
        <div className={`sticky top-1/2 -translate-y-1/2 z-20  text-center leading-tight md:leading-[1.2] ${animation && 'animate-neon'}`}>
          <h1 className="text-6xl md:text-max font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
