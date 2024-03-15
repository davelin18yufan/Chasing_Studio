import { ReactNode } from "react"
import { clsx } from "clsx/lite"

export default function Checklist({
  title,
  icon,
  children,
}: {
  title: string
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center gap-3",
          "text-namari dark:text-hainezumi",
          "pl-[18px] mb-3"
        )}
      >
        {icon}
        <div className="text-lg">{title}</div>
      </div>
      <div
        className={clsx(
          "bg-shironeri dark:bg-black",
          "dark:text-ginnezumi",
          "border border-shironezumi dark:border-gray-800 rounded-md",
          "divide-y divide-shironezumi dark:divide-gray-800"
        )}
      >
        {children}
      </div>
    </div>
  )
}
