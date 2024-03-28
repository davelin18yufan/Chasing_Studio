import clsx from "clsx/lite"
import { Link } from "@/site/navigation"
import { FiMoreHorizontal } from "react-icons/fi"
import { ReactNode } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MoreMenu({
  items,
  className,
  buttonClassName,
}: {
  items: { href: string; label: ReactNode }[]
  className?: string
  buttonClassName?: string
}) {
  return (
    <div className={clsx(className, "relative z-10")}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={clsx(
            buttonClassName,
            "p-1 py-1 min-h-0 border-none shadow-none outline-none",
            "text-dim"
          )}
        >
          <FiMoreHorizontal size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={clsx(
            "block outline-none h-auto",
            "text-sm",
            "rounded-md border",
            "bg-content"
          )}
        >
          {items.map(({ href, label }) => (
            <DropdownMenuItem key={href}>
              <Link
                href={href}
                className={clsx(
                  "block",
                  "rounded-[3px]",
                  "hover:text-main",
                  "hover:bg-gray-50 active:bg-gofun",
                  "hover:dark:bg-kachi/75 active:dark:bg-kachi",
                  "whitespace-nowrap"
                )}
              >
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
