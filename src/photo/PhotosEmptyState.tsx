import InfoBlock from "@/components/InfoBlock"
import SiteGrid from "@/components/SiteGrid"
import { IS_SITE_READY } from "@/site/config"
import { PATH_ADMIN_CONFIGURATION, PATH_ADMIN_PHOTOS } from "@/site/paths"
import SiteChecklist from "@/site/SiteChecklist"
import { clsx } from "clsx/lite"
import { Link } from "@/site/navigation"
import { FaArrowRight } from "react-icons/fa"
import { HiOutlinePhotograph } from "react-icons/hi"
import { useTranslations } from "next-intl"

export default function PhotosEmptyState() {
  const t = useTranslations("Photo.empty")
  return (
    <SiteGrid
      contentMain={
        <InfoBlock
          className="min-h-[20rem] sm:min-h-[30rem] px-8"
          padding="loose"
        >
          <HiOutlinePhotograph className="text-medium" size={24} />
          <div
            className={clsx(
              "font-bold text-2xl",
              "text-gray-700 dark:text-shironezumi"
            )}
          >
            {!IS_SITE_READY ? "Finish Setup" : "Setup Complete!"}
          </div>
          {!IS_SITE_READY ? (
            <SiteChecklist />
          ) : (
            <div className="max-w-md text-center space-y-6">
              <div className="space-y-2">
                <div>{t("title")}:</div>
                <Link href={PATH_ADMIN_PHOTOS} className="button primary">
                  <span>{t("admin")}</span>
                  <FaArrowRight size={10} />
                </Link>
              </div>
              <div>
                {t("config")}{" "}
                <Link
                  href={PATH_ADMIN_CONFIGURATION}
                  className="text-main hover:underline"
                >
                  /admin/configuration
                </Link>
              </div>
            </div>
          )}
        </InfoBlock>
      }
    />
  )
}
