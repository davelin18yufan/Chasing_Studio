import { auth } from "./auth"
import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  PATH_ADMIN,
  PATH_ADMIN_PHOTOS,
  PREFIX_PHOTO,
  PREFIX_TAG,
} from "./site/paths"

export default async function middleware(req: NextRequest, res: NextResponse) {
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
  
  // intl middleware in this global fn
  // check every route, update session and return intl page
  return auth(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse
  )
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
