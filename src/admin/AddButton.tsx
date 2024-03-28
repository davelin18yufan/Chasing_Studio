import { Link } from "@/site/navigation"
import { useTranslations } from "next-intl"
import { BiImageAdd } from "react-icons/bi"

export default function AddButton({
  href,
  label = "Add",
}: {
  href: string
  label?: string
}) {
  const t = useTranslations("Admin.actions")
  return (
    <Link title={label} href={href} className="button">
      <BiImageAdd size={18} className="translate-y-[1px]" />
      <span className="hidden sm:inline-block">{t("create")}</span>
    </Link>
  )
}
