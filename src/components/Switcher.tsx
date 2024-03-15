import { ReactNode } from "react"
import { clsx } from "clsx/lite"

export default function Switcher({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        "flex divide-x",
        "divide-hainezumi dark:divide-gray-800",
        "border rounded-[0.25rem]",
        "border-hainezumi dark:border-gray-800",
        "overflow-hidden",
        "shadow-sm"
      )}
    >
      {children}
    </div>
  )
}
