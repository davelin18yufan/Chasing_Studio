import Link from "next/link"
import { clsx } from "clsx/lite"

export default function SwitcherItem({
  icon,
  href,
  className: classNameProp,
  onClick,
  active,
  noPadding,
}: {
  icon: JSX.Element
  href?: string
  className?: string
  onClick?: () => void
  active?: boolean
  noPadding?: boolean
}) {
  const className = clsx(
    classNameProp,
    "py-0.5 px-1.5",
    "cursor-pointer",
    "hover:bg-gray-50 active:bg-gofun active:text-ginnezumi",
    // eslint-disable-next-line max-len
    "dark:hover:bg-gray-950 dark:active:bg-kachi/75 dark:active:text-namari",
    active
      ? "text-black dark:text-shironeri"
      : "text-hainezumi dark:text-gray-700"
  )

  const renderIcon = () =>
    noPadding ? (
      icon
    ) : (
      <div className="w-[28px] h-[24px] flex items-center justify-center">
        {icon}
      </div>
    )

  return href ? (
    <Link {...{ href, className }}>{renderIcon()}</Link>
  ) : (
    <div {...{ onClick, className }}>{renderIcon()}</div>
  )
}
