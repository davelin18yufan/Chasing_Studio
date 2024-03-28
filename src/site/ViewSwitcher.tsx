import Switcher from "@/components/Switcher";
import SwitcherItem from "@/components/SwitcherItem";
import IconFullFrame from "@/site/IconFullFrame";
import IconGrid from "@/site/IconGrid";
import { PATH_ADMIN_PHOTOS, PATH_GRID, PATH_ROOT, PATH_SETS } from "@/site/paths";
import { BiLockAlt } from "react-icons/bi";
import IconSets from "./IconSets";
import { useTranslations } from "next-intl";

export type SwitcherSelection = "full-frame" | "grid" | "sets" | "admin";

export default function ViewSwitcher({
  currentSelection,
  showAdmin,
}: {
  currentSelection?: SwitcherSelection
  showAdmin?: boolean
}) {
  const t = useTranslations("Admin.nav")
  return (
    <Switcher>
      <SwitcherItem
        icon={<IconFullFrame />}
        href={PATH_ROOT}
        active={currentSelection === "full-frame"}
        noPadding
        title={t("view.fullFrame")}
      />
      <SwitcherItem
        icon={<IconGrid />}
        href={PATH_GRID}
        active={currentSelection === "grid"}
        noPadding
        title={t("view.grid")}
      />
      <SwitcherItem
        className="md:hidden"
        icon={<IconSets />}
        href={PATH_SETS}
        active={currentSelection === "sets"}
        noPadding
        title={t("view.sets")}
      />
      {showAdmin && (
        <SwitcherItem
          icon={<BiLockAlt size={16} className="translate-y-[-0.5px]" />}
          href={PATH_ADMIN_PHOTOS}
          active={currentSelection === "admin"}
          title={t("view.admin")}
        />
      )}
    </Switcher>
  )
}
