"use client"

import React from "react"
import { clsx } from "clsx/lite"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher"
import { IoCarSport } from "react-icons/io5"
import Link from "next/link"
import Image from "next/image"
import { navbarLinks } from "@/constants"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function NavMobile({
  isPathGallery,
  showAdmin,
  currentSelection,
}: {
  isPathGallery: boolean
  showAdmin?: boolean
  currentSelection: SwitcherSelection | undefined
}) {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="sm:hidden cursor-pointer icon-hover">
          <IoCarSport className="w-10 h-10" />
        </div>
      </SheetTrigger>
      <SheetContent className="bg-content" side="right">
        <SheetHeader>
          <Link className="hidden xs:block cursor-pointer" href="/">
            <Image
              src="/logo_horizontal.png"
              alt="logo"
              width={250}
              height={230}
              className="invert-colors "
              priority
            />
          </Link>
        </SheetHeader>

        <SheetClose asChild>
          <section className="flex h-full flex-col gap-6 pt-16">
            {isPathGallery && (
              <div className={clsx("flex", "items-center justify-center")}>
                <ViewSwitcher
                  showAdmin={showAdmin}
                  currentSelection={currentSelection}
                />
              </div>
            )}
            {navbarLinks.map((item) => {
              const isActive =
                (pathname.includes(item.route) && item.route.length > 1) ||
                pathname === item.route
              return (
                <Link href={item.route} key={item.label}>
                  <Button
                    className={`navItem w-full ${
                      isActive && "text-gray-900 bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </section>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
