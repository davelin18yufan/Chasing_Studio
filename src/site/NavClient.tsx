"use client"

import { clsx } from "clsx/lite"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import SiteGrid from "../components/SiteGrid"
import { SITE_DOMAIN_OR_TITLE } from "@/site/config"
import ViewSwitcher, { SwitcherSelection } from "@/site/ViewSwitcher"
import {
  PATH_ROOT,
  isPathAdmin,
  isPathGrid,
  isPathProtected,
  isPathSets,
  isPathSignIn,
} from "@/site/paths"
import AnimateItems from "../components/AnimateItems"

export default function NavClient({ showAdmin }: { showAdmin?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()

  const showNav = !isPathSignIn(pathname)

  const shouldAnimate = !isPathAdmin(pathname)

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

  return (
    <nav className='relative'>
      <SiteGrid
        contentMain={
          <AnimateItems
            animateOnFirstLoadOnly
            type={!shouldAnimate ? "none" : "bottom"}
            distanceOffset={10}
            items={
              showNav
                ? [
                    <div
                      key="nav"
                      className={clsx(
                        "flex items-center",
                        "w-full min-h-[4rem]",
                        "leading-none",
                        ""
                      )}
                    >
                      <div className="hidden xs:block cursor-pointer">
                        <Image
                          src="/logo_horizontal.png"
                          alt="logo"
                          width={250}
                          height={230}
                          className="invert-colors "
                          onClick={() => router.push("/")}
                        />
                      </div>
                      <div className="flex flex-grow items-center justify-end gap-4">
                        <ViewSwitcher
                          currentSelection={switcherSelectionForPath()}
                          showAdmin={showAdmin}
                        />
                      </div>
                    </div>,
                  ]
                : []
            }
          />
        }
      />
      <div className='absolute right-10 top-1'>
        導覽列
      </div>
    </nav>
  )
}
