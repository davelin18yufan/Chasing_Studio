import AdminNav from "@/admin/AdminNav"
import {
  getStorageUploadUrlsNoStore,
  getPhotosCountIncludingHiddenCached,
  getUniqueTagsCached,
  getBlogsCountCached,
} from "@/cache"
import {
  PATH_ADMIN_BLOGS,
  PATH_ADMIN_PHOTOS,
  PATH_ADMIN_TAGS,
  PATH_ADMIN_UPLOADS,
} from "@/site/paths"
import clsx from "clsx/lite"
import { getTranslations } from "next-intl/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations("Admin.nav")
  const [countPhotos, countUploads, countTags, countBlogs] = await Promise.all([
    getPhotosCountIncludingHiddenCached(),
    getStorageUploadUrlsNoStore()
      .then((urls) => urls.length)
      .catch((e) => {
        console.error(`Error getting blob upload urls: ${e}`)
        return 0
      }),
    getUniqueTagsCached().then((tags) => tags.length),
    getBlogsCountCached(true),
  ])

  const navItemPhotos = {
    label: t("photos"),
    href: PATH_ADMIN_PHOTOS,
    count: countPhotos,
  }

  const navItemUploads = {
    label: t("uploads"),
    href: PATH_ADMIN_UPLOADS,
    count: countUploads,
  }

  const navItemTags = {
    label: t("tags"),
    href: PATH_ADMIN_TAGS,
    count: countTags,
  }

  const navItemBlogs = {
    label: t("blogs"),
    href: PATH_ADMIN_BLOGS,
    count: countBlogs, // count blogs
  }

  const navItems = [navItemPhotos]

  if (countUploads > 0) navItems.push(navItemUploads)

  if (countTags > 0) navItems.push(navItemTags)

  if (countBlogs > 0) navItems.push(navItemBlogs)

  return (
    <div
      className={clsx("mt-4 space-y-5", "pt-20 px-3 pb-3", "lg:px-6 lg:pb-6")}
    >
      <AdminNav items={navItems} />
      {children}
    </div>
  )
}
