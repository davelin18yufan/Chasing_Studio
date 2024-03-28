"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Switcher from "@/components/Switcher"
import SwitcherItem from "@/components/SwitcherItem"
import { BiDesktop, BiMoon, BiSun } from "react-icons/bi"
import { useTranslations } from "next-intl"

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const t = useTranslations("Admin.nav")

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Switcher>
      <SwitcherItem
        icon={<BiDesktop size={16} />}
        onClick={() => setTheme("system")}
        active={theme === "system"}
        className="flex-1"
        title={t("theme.system")}
      />
      <SwitcherItem
        icon={<BiSun size={18} />}
        onClick={() => setTheme("light")}
        active={theme === "light"}
        className="flex-1"
        title={t("theme.light")}
      />
      <SwitcherItem
        icon={<BiMoon size={16} />}
        onClick={() => setTheme("dark")}
        active={theme === "dark"}
        className="flex-1"
        title={t("theme.dark")}
      />
    </Switcher>
  )
}
