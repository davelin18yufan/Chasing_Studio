import PhotoOGTile from "@/photo/PhotoOGTile";
import { absolutePathForPhoto, pathForPhoto } from "@/site/paths";
import { Photo } from ".";
import ShareModal from "@/components/ShareModal";
import { Camera } from "@/camera";
import { FilmSimulation } from "@/simulation";
import { useTranslations } from "next-intl"

export default function PhotoShareModal({
  photo,
  tag,
  camera,
  simulation,
}: {
  photo: Photo
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
}) {
  const t = useTranslations("Photo")
  return (
    <ShareModal
      title={t("share")}
      pathShare={absolutePathForPhoto(photo, tag, camera, simulation)}
      pathClose={pathForPhoto(photo, tag, camera, simulation)}
    >
      <PhotoOGTile photo={photo} />
    </ShareModal>
  );
};
