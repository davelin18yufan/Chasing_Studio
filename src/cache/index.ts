import {
  revalidatePath,
  revalidateTag,
  unstable_cache,
  unstable_noStore,
} from "next/cache"
import {
  GetPhotosOptions,
  getPhoto,
  getPhotos,
  getCoverPhotos,
  getPhotosCount,
  getPhotosCameraCount,
  getPhotosCountIncludingHidden,
  getPhotosTagCount,
  getUniqueCameras,
  getUniqueTags,
  getPhotosTagDateRange,
  getPhotosCameraDateRange,
  getUniqueTagsHidden,
  getUniqueFilmSimulations,
  getPhotosFilmSimulationDateRange,
  getPhotosFilmSimulationCount,
  getPhotosDateRange,
  getPhotosNearId,
} from "@/services/vercel-postgres"
import { parseCachedPhotoDates, parseCachedPhotosDates } from "@/photo"
import { getStoragePhotoUrls, getStorageUploadUrls } from "@/services/storage"
import type { Session } from "next-auth"
import { createCameraKey } from "@/camera"
import { PATHS_ADMIN } from "@/site/paths"
import { cache } from "react"
import { auth } from "@/auth"
import {
  GetBlogsOptions,
  getBlog,
  getBlogs,
  getBlogsCount,
  getBlogsTagsCount,
  getUniqueBlogTags,
} from "@/services/blog"
import { parseBlogFromDB } from "@/blog"

// Table key
const KEY_PHOTOS = "photos"
const KEY_BLOGS = "blogs"
const KEY_PHOTO = "photo"
const KEY_BLOG = "blog"
// Field keys
const KEY_TAGS = "tags"
const KEY_CAMERAS = "cameras"
const KEY_FILM_SIMULATIONS = "film-simulations"
// Type keys
const KEY_COUNT = "count"
const KEY_HIDDEN = "hidden"
const KEY_DATE_RANGE = "date-range"

//* Extract key out of options
// Reformat into (key)-{value}
const getPhotosCacheKeyForOption = (
  options: GetPhotosOptions,
  option: keyof GetPhotosOptions
): string | null => {
  switch (option) {
  // Complex keys
  case "camera": {
    const value = options[option]
    return value ? `${option}-${createCameraKey(value)}` : null
  }
  case "takenBefore":
  case "takenAfterInclusive": {
    const value = options[option]
    return value ? `${option}-${value.toISOString()}` : null
  }
  // Primitive keys
  default:
    const value = options[option]
    return value !== undefined ? `${option}-${value}` : null
  }
}

//* Reformat to array
const getPhotosCacheKeys = (options: GetPhotosOptions = {}) => {
  const tags: string[] = []

  Object.keys(options).forEach((key) => {
    const tag = getPhotosCacheKeyForOption(
      options,
      key as keyof GetPhotosOptions
    )
    if (tag) {
      tags.push(tag)
    }
  })

  return tags
}

const getBlogsCacheKeys = (options: GetBlogsOptions = {}) => {
  const keys: string[] = []
  Object.keys(options).forEach((key) => {
    if (key) {
      keys.push(key)
    }
  })
  return keys
}

//* Revalidate by keys
export const revalidatePhotosKey = () => revalidateTag(KEY_PHOTOS)

export const revalidateBlogsKey = () => revalidateTag(KEY_BLOGS)

export const revalidateBlogKey = () => revalidateTag(KEY_BLOG)

export const revalidateTagsKey = () => revalidateTag(KEY_TAGS)

export const revalidateCamerasKey = () => revalidateTag(KEY_CAMERAS)

export const revalidateFilmSimulationsKey = () =>
  revalidateTag(KEY_FILM_SIMULATIONS)

export const revalidateAllKeys = () => {
  revalidatePhotosKey()
  revalidateBlogsKey()
  revalidateBlogKey()
  revalidateTagsKey()
  revalidateCamerasKey()
  revalidateFilmSimulationsKey()
}

export const revalidateAllKeysAndPaths = () => {
  revalidateAllKeys()
  revalidatePath("/", "layout")
}

export const revalidateAdminPaths = () => {
  PATHS_ADMIN.forEach((path) => revalidatePath(path))
}

//* Cache

// Get the photos cache key-value pairs and using unstable-cache
// const data = unstable_cache(fetchData, keyParts, options)()
export const getPhotosCached = (...args: Parameters<typeof getPhotos>) =>
  unstable_cache(getPhotos, [KEY_PHOTOS, ...getPhotosCacheKeys(...args)])(
    ...args
  ).then(parseCachedPhotosDates)

export const getBlogsCached = async (...args: Parameters<typeof getBlogs>) => {
  const blogs = await unstable_cache(getBlogs, [
    KEY_BLOGS,
    ...getBlogsCacheKeys(...args),
  ])(...args)
  // db date to new Date()
  return blogs.map(parseBlogFromDB)
}

export const getCoverPhotosCached = (
  ...args: Parameters<typeof getCoverPhotos>
) =>
  unstable_cache(getCoverPhotos, [KEY_PHOTOS, ...getPhotosCacheKeys(...args)])(
    ...args
  ).then(parseCachedPhotosDates)

export const getPhotosNearIdCached = (
  ...args: Parameters<typeof getPhotosNearId>
) =>
  unstable_cache(getPhotosNearId, [KEY_PHOTOS])(...args).then(
    parseCachedPhotosDates
  )

export const getPhotosDateRangeCached = unstable_cache(getPhotosDateRange, [
  KEY_PHOTOS,
  KEY_DATE_RANGE,
])

//* Count
export const getPhotosCountCached = unstable_cache(getPhotosCount, [
  KEY_PHOTOS,
  KEY_COUNT,
])

export const getPhotosCountIncludingHiddenCached = unstable_cache(
  getPhotosCountIncludingHidden,
  [KEY_PHOTOS, KEY_COUNT, KEY_HIDDEN]
)

export const getBlogsCountCached = unstable_cache(getBlogsCount, [
  KEY_BLOGS,
  KEY_COUNT,
])

export const getBlogsCountIncludingHiddenCached = (
  ...args: Parameters<typeof getBlogsCount>
) => unstable_cache(getBlogsCount, [KEY_BLOGS, KEY_COUNT, KEY_HIDDEN])(...args)

export const getPhotosTagCountCached = unstable_cache(getPhotosTagCount, [
  KEY_PHOTOS,
  KEY_TAGS,
])

export const getBlogsTagCountCached = unstable_cache(getBlogsTagsCount, [
  KEY_BLOGS,
  KEY_TAGS,
])

export const getPhotosCameraCountCached = (
  ...args: Parameters<typeof getPhotosCameraCount>
) =>
  unstable_cache(getPhotosCameraCount, [
    KEY_PHOTOS,
    KEY_COUNT,
    createCameraKey(...args),
  ])(...args)

export const getPhotosFilmSimulationCountCached = unstable_cache(
  getPhotosFilmSimulationCount,
  [KEY_PHOTOS, KEY_FILM_SIMULATIONS, KEY_COUNT]
)

export const getPhotosTagDateRangeCached = unstable_cache(
  getPhotosTagDateRange,
  [KEY_PHOTOS, KEY_TAGS, KEY_DATE_RANGE]
)

export const getPhotosCameraDateRangeCached = unstable_cache(
  getPhotosCameraDateRange,
  [KEY_PHOTOS, KEY_CAMERAS, KEY_DATE_RANGE]
)

export const getPhotosFilmSimulationDateRangeCached = unstable_cache(
  getPhotosFilmSimulationDateRange,
  [KEY_PHOTOS, KEY_FILM_SIMULATIONS, KEY_DATE_RANGE]
)

export const getPhotoCached = (...args: Parameters<typeof getPhoto>) =>
  unstable_cache(getPhoto, [KEY_PHOTOS, KEY_PHOTO])(...args).then((photo) =>
    photo ? parseCachedPhotoDates(photo) : undefined
  )

export const getBlogCached = (...args: Parameters<typeof getBlog>) =>
  unstable_cache(getBlog, [KEY_BLOGS, KEY_BLOG])(...args)

export const getUniqueBlogTagsCached = (
  ...args: Parameters<typeof getUniqueBlogTags>
) => unstable_cache(getUniqueBlogTags, [KEY_BLOGS, KEY_TAGS])(...args)

export const getUniqueTagsCached = unstable_cache(getUniqueTags, [
  KEY_PHOTOS,
  KEY_TAGS,
])

export const getUniqueTagsHiddenCached = unstable_cache(getUniqueTagsHidden, [
  KEY_PHOTOS,
  KEY_TAGS,
  KEY_HIDDEN,
])

export const getUniqueCamerasCached = unstable_cache(getUniqueCameras, [
  KEY_PHOTOS,
  KEY_CAMERAS,
])

export const getUniqueFilmSimulationsCached = unstable_cache(
  getUniqueFilmSimulations,
  [KEY_PHOTOS, KEY_FILM_SIMULATIONS]
)

export const authCached = cache(auth)

//* No Store
export const getPhotoNoStore = (...args: Parameters<typeof getPhoto>) => {
  unstable_noStore()
  return getPhoto(...args)
}

export const getBlogNoStore = (...args: Parameters<typeof getBlog>) => {
  unstable_noStore()
  return getBlog(...args)
}

export const getStorageUploadUrlsNoStore: typeof getStorageUploadUrls = (
  ...args
) => {
  unstable_noStore()
  return getStorageUploadUrls(...args)
}

export const getStoragePhotoUrlsNoStore: typeof getStoragePhotoUrls = (
  ...args
) => {
  unstable_noStore()
  return getStoragePhotoUrls(...args)
}

//* generate header by session
export const getImageCacheHeadersForAuth = (session: Session | null) => {
  return {
    "Cache-Control": !session?.user
      ? "s-maxage=3600, stale-while-revalidate=59"
      : "s-maxage=1, stale-while-revalidate=59",
  }
}
