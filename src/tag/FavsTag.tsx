import { FaStar } from "react-icons/fa";
import EntityLink, { EntityLinkExternalProps } from "@/components/EntityLink";
import { TAG_FAVS } from ".";
import { pathForTag } from "@/site/paths";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function FavsTag({
  type,
  badged,
  contrast,
  countOnHover,
}: {
  countOnHover?: number
} & EntityLinkExternalProps) {
  const t = useTranslations()
  return (
    <EntityLink
      label={
        badged
          ? <span className="inline-flex gap-1">
            {t(TAG_FAVS)}
            <FaStar
              size={10}
              className="text-amber-500"
            />
          </span>
          : t(TAG_FAVS)}
      href={pathForTag(TAG_FAVS)}
      icon={!badged &&
        <FaStar
          size={12}
          className={clsx(
            "text-amber-500",
            "translate-x-[-1px] translate-y-[3.5px]",
          )}
        />}
      type={type}
      hoverEntity={countOnHover}
      badged={badged}
      contrast={contrast}
    />
  );
}
