import { locales, localePrefix, defaultLocale } from "@/site/navigation"
import { isPathProtected } from "@/site/paths"
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import createMiddleware from "next-intl/middleware"

export const KEY_CREDENTIALS_SIGN_IN_ERROR = "CredentialsSignin"
export const KEY_CREDENTIALS_SIGN_IN_ERROR_URL =
  "https://errors.authjs.dev#credentialssignin"
export const KEY_CALLBACK_URL = "callbackUrl"

// since we're using auth function in every route, 
// pass this middleware in auth
export const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: false,
})

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      async authorize({ email, password }) {
        if (
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_EMAIL === email &&
          process.env.ADMIN_PASSWORD &&
          process.env.ADMIN_PASSWORD === password
        ) {
          const user: User = { email, name: "Chasing Studio" }
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isUrlProtected = isPathProtected(pathname)
      const isUserLoggedIn = !!auth?.user
      const isRequestAuthorized = !isUrlProtected || isUserLoggedIn

      // if not redirect to login page then return intl page
      if (isRequestAuthorized) return intlMiddleware(request)
      
      return isRequestAuthorized
    },
  },
  pages: {
    signIn: "/sign-in",
  },
})

