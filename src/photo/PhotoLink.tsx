"use client"

import { ReactNode } from "react"
import { Photo } from "@/photo"
import { Link } from "@/site/navigation"
import { AnimationConfig } from "../components/AnimateItems"
import { useAppState } from "@/contexts"
import { pathForPhoto } from "@/site/paths"
import { Camera } from "@/camera"
import { FilmSimulation } from "@/simulation"

export default function PhotoLink({
  photo,
  tag,
  camera,
  simulation,
  prefetch,
  nextPhotoAnimation,
  children,
}: {
  photo?: Photo
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
  prefetch?: boolean
  nextPhotoAnimation?: AnimationConfig
  children: ReactNode
}) {
  const { setNextPhotoAnimation } = useAppState()

  return photo ? (
    <Link
      href={pathForPhoto(photo, tag, camera, simulation)}
      prefetch={prefetch}
      onClick={() => {
        if (nextPhotoAnimation) {
          setNextPhotoAnimation?.(nextPhotoAnimation)
        }
      }}
      scroll={false}
    >
      {children}
    </Link>
  ) : (
    <span className="text-hainezumi dark:text-gray-700 cursor-default">
      {children}
    </span>
  )
}
