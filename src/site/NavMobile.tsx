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

export default function NavMobile({
  isPathGallery,
  showAdmin,
  currentSelection,
}: {
  isPathGallery: boolean
  showAdmin?: boolean
  currentSelection: SwitcherSelection | undefined
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoCarSport className="sm:hidden cursor-pointer w-10 h-10 p-2" />
      </SheetTrigger>
      <SheetContent className="bg-content border-none">
        <SheetHeader>
          <Link className="hidden xs:block cursor-pointer" href="/">
            <Image
              src="/logo_horizontal.png"
              alt="logo"
              width={250}
              height={230}
              className="invert-colors "
            />
          </Link>
        </SheetHeader>

        <SheetClose asChild>
          <section className="flex h-full flex-col gap-6 pt-16">
            {isPathGallery && (
              <div
                className={clsx(
                  "flex",
                  "items-center justify-center",
                )}
              >
                <ViewSwitcher
                  showAdmin={showAdmin}
                  currentSelection={currentSelection}
                />
              </div>
            )}
            {navbarLinks.map((item) => (
              <Link href={item.route} key={item.label}>
                <Button className="navItem w-full">{item.label}</Button>
              </Link>
            ))}
          </section>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
