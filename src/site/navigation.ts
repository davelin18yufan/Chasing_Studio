import { createSharedPathnamesNavigation } from "next-intl/navigation"

export const locales = ["en", "jp", "zh"] as const
export const localePrefix = "as-needed"
export const defaultLocale = "zh"
export const localeItems = [
  { name: "English", icon: "EN", code: "en", iso: "en-US", dir: "ltr" },
  { name: "中文", icon: "中", code: "zh", iso: "zh-TW", dir: "ltr" },
  { name: "日本語", icon: "日", code: "jp", iso: "ja-JP", dir: "ltr" },
]

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
