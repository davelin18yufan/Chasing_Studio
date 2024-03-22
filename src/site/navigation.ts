import { createSharedPathnamesNavigation } from "next-intl/navigation"

export const locales = ["en", "ja", "ko", "zh"] as const
export const localePrefix = "as-needed"
export const defaultLocale = "zh"
export const localeItems = [
  { name: "English", code: "en", iso: "en-US", dir: "ltr" },
  { name: "中文", code: "zh-TW", iso: "zh-TW", dir: "ltr" },
  { name: "日本語", code: "ja", iso: "ja-JP", dir: "ltr" },
  { name: "한국인", code: "ko", iso: "ko-KR", dir: "ltr" },
]

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
