import SiteChecklistClient from "./SiteChecklistClient";
import { CONFIG_CHECKLIST_STATUS } from "@/site/config";

export default function SiteChecklist() {
  return (
    <SiteChecklistClient {...{
      ...CONFIG_CHECKLIST_STATUS,
    }} />
  );
}
