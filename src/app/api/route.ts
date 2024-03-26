import { getPhotosCached } from "@/cache";
import { API_PHOTO_REQUEST_LIMIT, formatPhotoForApi } from "@/site/api";
import {
  BASE_URL,
  PUBLIC_API_ENABLED,
  SITE_TITLE,
} from "@/site/config";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  if (PUBLIC_API_ENABLED) {
    const photos = await getPhotosCached({ limit: API_PHOTO_REQUEST_LIMIT });
    return NextResponse.json({
      meta: {
        title: SITE_TITLE,
        url: BASE_URL,
      },
      photos: photos.map(formatPhotoForApi),
    })
  } else {
    return new NextResponse("API access disabled", { status: 404 })
  }
}
