"use client"

import { clsx } from "clsx/lite"
import SiteGrid from "../components/SiteGrid"
import { Link, usePathname } from "./navigation"
import { SHOW_REPO_LINK } from "@/site/config"
import RepoLink from "../components/RepoLink"
import {
  isPathAdmin,
  isPathRoot,
  isPathSignIn,
  pathForAdminPhotos,
} from "./paths"
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus"
import { signOutAction } from "@/auth/actions"
import Spinner from "@/components/Spinner"
import AnimateItems from "@/components/AnimateItems"

export default function FooterClient({
  userEmail,
}: {
  userEmail?: string | null | undefined
}) {
  const pathname = usePathname()

  const showFooter = !isPathSignIn(pathname) && !isPathRoot(pathname)

  const shouldAnimate = !isPathAdmin(pathname)
  
  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={!shouldAnimate ? "none" : "bottom"}
          distanceOffset={10}
          items={
            showFooter
              ? [
                  <div
                    key="footer"
                    className={clsx(
                      "flex items-center",
                      "text-dim min-h-[4rem] px-3"
                    )}
                  >
                    <div className="flex gap-x-4 gap-y-1 flex-grow flex-wrap h-4">
                      {isPathAdmin(pathname) ? (
                        <>
                          {userEmail === undefined && <Spinner />}
                          {userEmail && (
                            <>
                              <div>{userEmail}</div>
                              <form action={signOutAction}>
                                <SubmitButtonWithStatus styleAsLink>
                                  Sign out
                                </SubmitButtonWithStatus>
                              </form>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <Link href={pathForAdminPhotos()}>Admin</Link>
                          {SHOW_REPO_LINK && <RepoLink />}
                        </>
                      )}
                    </div>
                  </div>,
                ]
              : []
          }
        />
      }
    />
  )
}
