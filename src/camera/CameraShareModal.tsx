import { absolutePathForCamera, pathForCamera } from "@/site/paths";
import { Photo, PhotoDateRange } from "../photo";
import ShareModal from "@/components/ShareModal";
import CameraOGTile from "./CameraOGTile";
import { Camera } from ".";
import { useTranslations } from "next-intl";

export default function CameraShareModal({
  camera,
  photos,
  count,
  dateRange,
}: {
  camera: Camera
  photos: Photo[]
  count: number
  dateRange: PhotoDateRange,
}) {
  const t = useTranslations("Photo")
  return (
    <ShareModal
      title={t("share")}
      pathShare={absolutePathForCamera(camera)}
      pathClose={pathForCamera(camera)}
    >
      <CameraOGTile {...{ camera, photos, count, dateRange }} />
    </ShareModal>
  );
};
