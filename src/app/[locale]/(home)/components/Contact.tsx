"use client"

import { useState } from "react"
import AnimateItems from "@/components/AnimateItems"
import { Button } from "@/components/ui/button"
import { relativeLinks } from "@/constants"
import Link from "next/link"
import {
  FaInstagramSquare,
  FaLine,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa"

import clsx from "clsx/lite"
import ContactModal from "./ContactModal"
import PortfolioButton from "@/components/PortfolioButton"
import { pathForAdminPhotos } from "@/site/paths"
import { FaLocationArrow } from "react-icons/fa6"
import { IconType } from "react-icons/lib"

const icons: Record<string, IconType> = {
  FaLine,
  FaInstagramSquare,
  FaFacebook,
  FaYoutube,
}

export default function Contact() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section
        className={clsx(
          "py-10 lg:py-12 px-3 lg:px-4",
          "bg-footer bg-blend-multiply bg-no-repeat bg-cover",
          " dark:bg-gray-800/50 relative"
        )}
      >
        <div className="space-y-4 max-w-6xl mx-auto">
          <AnimateItems
            type="bottom"
            scaleOffset={0.95}
            className="flex flex-col items-center mb-6 gap-4"
            items={[
              <Button
                className="text-invert group *:transition-all *:duration-200"
                onClick={() => setOpen(true)}
                key="contactBtn"
              >
                <span className="group-hover:mr-2">Contact Us</span>
                <div className="group-hover:rotate-45">
                  <FaLocationArrow size={18} />
                </div>
              </Button>,
              <div className="flex justify-center space-x-4" key="links">
                {relativeLinks.map((link) => {
                  const IconComponent = icons[link.icon]
                  return (
                    <Link
                      href={link.url}
                      key={link.label}
                      className="text-main text-2xl icon-hover"
                    >
                      <IconComponent size={20} />
                    </Link>
                  )
                })}
              </div>,
              <p className="text-xs text-center" key="copyRight">
                &copy;Copyright Chasing Studio. All Rights Reserved.
              </p>,
            ]}
          />
        </div>
        <Link href={pathForAdminPhotos()} className="absolute left-3 bottom-3">
          Admin
        </Link>
      </section>

      <PortfolioButton positionClass="fixed right-10 bottom-6" />
      <ContactModal open={open} setOpen={setOpen} />
    </>
  )
}
