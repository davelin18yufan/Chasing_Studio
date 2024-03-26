import { auth } from "./auth"
import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  PATH_ADMIN,
  PATH_ADMIN_PHOTOS,
  PREFIX_PHOTO,
  PREFIX_TAG,
} from "./site/paths"
import createMiddleware from "next-intl/middleware"
import { locales, localePrefix, defaultLocale } from "./site/navigation"

// Define your next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: false,
})

export default async function middleware(req: NextRequest, res: NextResponse) {
  // Apply next-intl middleware first
  const response = intlMiddleware(req)

  const pathname = req.nextUrl.pathname
  const locale = req.nextUrl.locale // Extract the locale from the request

  if (pathname === PATH_ADMIN) {
    return NextResponse.redirect(
      new URL(`/${locale}/${PATH_ADMIN_PHOTOS}`, req.url)
    )
  } else if (/^\/photos\/(.)+$/.test(pathname)) {
    // Accept /photos/* paths, but serve /p/*
    const matches = pathname.match(/^\/photos\/(.+)$/)
    return NextResponse.rewrite(
      new URL(`/${locale}/${PREFIX_PHOTO}/${matches?.[1]}`, req.url)
    )
  } else if (/^\/t\/(.)+$/.test(pathname)) {
    // Accept /t/* paths, but serve /tag/*
    const matches = pathname.match(/^\/t\/(.+)$/)
    return NextResponse.rewrite(
      new URL(`/${locale}/${PREFIX_TAG}/${matches?.[1]}`, req.url)
    )
  }
  
  await auth(
    req as unknown as NextApiRequest,
    response as unknown as NextApiResponse
  )
  return response
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
