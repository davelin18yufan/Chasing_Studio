import { absolutePathForTag, pathForTag } from "@/site/paths"
import { Photo, PhotoDateRange } from "../photo"
import ShareModal from "@/components/ShareModal"
import TagOGTile from "./TagOGTile"
import { useTranslations } from "next-intl"

export default function TagShareModal({
  tag,
  photos,
  count,
  dateRange,
}: {
  tag: string
  photos: Photo[]
  count?: number
  dateRange?: PhotoDateRange
}) {
  const t = useTranslations("Photo")
  return (
    <ShareModal
      title={t("share")}
      pathShare={absolutePathForTag(tag)}
      pathClose={pathForTag(tag)}
    >
      <TagOGTile {...{ tag, photos, count, dateRange }} />
    </ShareModal>
  )
}
