"use client"

import { useState, useEffect } from "react"
import Switcher from "@/components/Switcher"
import SwitcherItem from "@/components/SwitcherItem"
import { usePathname, useRouter, localeItems } from "./navigation"
import { useLocale } from "next-intl"

export default function LocaleSwitcher() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Switcher>
      {localeItems.map((item) => (
        <SwitcherItem
          icon={<div className="text-xs">{item.icon}</div>}
          onClick={() => router.push(pathname, { locale: item.code })}
          active={currentLocale === item.code}
          key={item.iso}
          className="flex-1"
          title={item.name}
        />
      ))}
    </Switcher>
  )
}
