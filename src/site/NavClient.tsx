"use client"

import { clsx } from "clsx/lite"
import { usePathname } from "@/site/navigation"
import Image from "next/image"
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher"
import {
  PATH_ROOT,
  isPathGallery,
  isPathGrid,
  isPathProtected,
  isPathSets,
} from "@/site/paths"
import { Button } from "@/components/ui/button"
import { Link } from "@/site/navigation"
import { navbarLinks } from "@/constants"
import { FaEarthEurope } from "react-icons/fa6"
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ThemeSwitcher from "./ThemeSwitcher"
import LocaleSwitcher from "./LocaleSwitcher"
import NavMobile from "./NavMobile"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useState, useRef } from "react"
import { useTranslations } from "next-intl"

export default function NavClient({ showAdmin }: { showAdmin?: boolean }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  const previousScrollY = useRef<number>(0)
  const t = useTranslations("Admin.nav")

  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return "full-frame"
    } else if (isPathGrid(pathname)) {
      return "grid"
    } else if (isPathSets(pathname)) {
      return "sets"
    } else if (isPathProtected(pathname)) {
      return "admin"
    }
  }
  useMotionValueEvent(scrollY, "change", (latest) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (latest > previousScrollY.current || latest === 0) {
      // if scroll down hide nav
      setVisible(false)
    } else {
      setVisible(true)
    }
    // update previous value
    previousScrollY.current = latest
  })
  return (
    <header
      className={clsx(
        "flex items-center justify-end bg-content sm:justify-between py-2 pr-8",
        "fixed top-0 w-full opacity-80 z-50",
        "origin-top transition-all",
        pathname === PATH_ROOT && "scale-y-0",
        visible && "scale-y-100"
      )}
    >
      <Link
        className={clsx(
          "hidden sm:block cursor-pointer",
          "w-[220px] h-[70px] relative"
        )}
        href={PATH_ROOT}
      >
        <Image
          src="/logo_horizontal.png"
          alt="logo"
          fill
          sizes="250px"
          className="invert-colors hidden xs:block object-fill"
          priority
        />
      </Link>
      <nav
        className={clsx(
          "hidden sm:flex",
          "gap-1 p-2 overflow-hidden",
          "text-sm font-medium rounded-md  text-gray-700"
        )}
      >
        {isPathGallery(pathname) && (
          <div
            className={clsx(
              "flex flex-grow",
              "items-center justify-end",
              "gap-4"
            )}
          >
            <ViewSwitcher
              currentSelection={switcherSelectionForPath()}
              showAdmin={showAdmin}
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
                data-content={t(item.label.toLowerCase())}
                className={clsx(
                  "navItem",
                  isActive &&
                    "text-kachi bg-shironezumi dark:bg-shironezumi dark:text-kachi hover:transform-none"
                )}
              >
                {t(item.label.toLowerCase())}
              </Button>
            </Link>
          )
        })}
        <Menubar className="relative border-none bg-transparent shadow-none">
          <MenubarMenu>
            <MenubarTrigger
              className={clsx(
                "border-none shadow-none cursor-pointer",
                "dark:text-shironeri hover:opacity-80"
              )}
            >
              <FaEarthEurope />
            </MenubarTrigger>
            <MenubarContent className="bg-content min-w-[120px] mr-1.5">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>

      <NavMobile
        isPathGallery={isPathGallery(pathname)}
        currentSelection={switcherSelectionForPath()}
        showAdmin={showAdmin}
      />
    </header>
  )
}
