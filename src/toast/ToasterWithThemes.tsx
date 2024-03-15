"use client"

import { clsx } from "clsx/lite"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export default function ToasterWithThemes() {
  const { theme } = useTheme()
  return (
    <Toaster
      theme={theme as "system" | "light" | "dark"}
      toastOptions={{
        classNames: {
          toast: clsx(
            "font-mono font-normal",
            "!text-kachi dark:!text-gofun",
            "!bg-shironeri dark:!bg-black",
            "!border-shironezumi dark:!border-gray-800"
          ),
        },
      }}
    />
  )
}
