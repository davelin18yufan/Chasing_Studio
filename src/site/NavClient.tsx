"use client"

import { clsx } from "clsx/lite"
import { usePathname } from "next/navigation"
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
import Link from "next/link"
import { navbarLinks } from "@/constants"
import { FaEarthEurope } from "react-icons/fa6"
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ThemeSwitcher from "./ThemeSwitcher"
import NavMobile from "./NavMobile"

export default function NavClient({ showAdmin }: { showAdmin?: boolean }) {
  const pathname = usePathname()

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
    <header className="flex items-center justify-end bg-content sm:justify-between p-2 fixed top-0 w-full opacity-80">
      <Link className="hidden sm:block cursor-pointer" href="/">
        <Image
          src="/logo_horizontal.png"
          alt="logo"
          width={250}
          height={130}
          className="invert-colors hidden xs:block"
        />
      </Link>
      <nav className="hidden sm:flex gap-1 p-2 text-sm font-medium rounded-md  text-gray-700">
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
        {navbarLinks.map((item) => (
          <Link href={item.route} key={item.label}>
            <Button className="navItem">{item.label}</Button>
          </Link>
        ))}
        <Menubar className="relative border-none bg-transparent shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="navItem cursor-pointer">
              <FaEarthEurope />
            </MenubarTrigger>
            <MenubarContent className="bg-content min-w-[120px] mr-1.5">
              <ThemeSwitcher />
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
