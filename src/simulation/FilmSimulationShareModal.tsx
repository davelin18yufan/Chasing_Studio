import {
  absolutePathForFilmSimulation,
  pathForFilmSimulation,
} from "@/site/paths";
import { Photo, PhotoDateRange } from "../photo";
import ShareModal from "@/components/ShareModal";
import FilmSimulationOGTile from "./FilmSimulationOGTile";
import { FilmSimulation } from ".";
import { useTranslations } from "next-intl";

export default function FilmSimulationShareModal({
  simulation,
  photos,
  count,
  dateRange,
}: {
  simulation: FilmSimulation
  photos: Photo[]
  count?: number
  dateRange?: PhotoDateRange
}) {
  const t = useTranslations("Photo")
  return (
    <ShareModal
      title={t("share")}
      pathShare={absolutePathForFilmSimulation(simulation)}
      pathClose={pathForFilmSimulation(simulation)}
    >
      <FilmSimulationOGTile {...{ simulation, photos, count, dateRange }} />
    </ShareModal>
  );
};
