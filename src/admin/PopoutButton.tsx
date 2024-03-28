import { MdOutlineScreenShare } from "react-icons/md"
import { Link } from "@/site/navigation"

export default function PopoutButton({
  href,
  label,
}: {
  href: string
  label?: string
}) {
  return (
    <Link
      title={label}
      href={href}
      className="button bg-transparent"
      target="_blank"
    >
      <MdOutlineScreenShare className="translate-y-[-0.5px]" />
    </Link>
  )
}
