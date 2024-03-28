import AdminGrid from "@/admin/AdminGrid"
import DeleteButton from "@/admin/DeleteButton"
import EditButton from "@/admin/EditButton"
import PopoutButton from "@/admin/PopoutButton"
import { Blog } from "@/blog"
import { deleteBlogAction, toggleBlogHidden } from "@/blog/action"
import { getBlogsCached, getBlogsCountIncludingHiddenCached } from "@/cache"
import FormWithConfirm from "@/components/FormWithConfirm"
import ImageTiny from "@/components/ImageTiny"
import SiteGrid from "@/components/SiteGrid"
import { Button } from "@/components/ui/button"
import { dataUrl as blurData } from "@/lib/utils"
import MorePhotos from "@/photo/MorePhotos"
import {
  PaginationParams,
  getPaginationForSearchParams,
} from "@/site/pagination"
import {
  PATH_ADMIN_BLOGS,
  pathForAdminBlogEdit,
  pathForAdminBlogs,
  pathForBlog,
} from "@/site/paths"
import { formatDBDate } from "@/utility/date"
import clsx from "clsx"
import { Link } from "@/site/navigation"
import React, { Fragment } from "react"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { LuPencil } from "react-icons/lu"
import { getTranslations } from "next-intl/server"

function PhotoTiny({
  className,
  id,
  blog,
}: {
  className: string
  id: string
  blog: Blog
}) {
  return (
    <Link
      href={`/blogs/${id}`}
      className={clsx(className, "active:brightness-75", "min-w-[50px]")}
    >
      <ImageTiny
        src={blog.coverPhoto?.src || ""}
        aspectRatio={blog.coverPhoto?.aspectRatio || 16.0 / 9.0}
        blurData={blurData}
        alt={blog.title}
      />
    </Link>
  )
}

export default async function AdminArticlePage({
  searchParams,
}: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams)
  const [blogs, count] = await Promise.all([
    getBlogsCached({ includeHidden: true, limit }),
    getBlogsCountIncludingHiddenCached(),
  ])

  const showMoreBlogs = count > blogs.length
  const t = await getTranslations("Admin")

  return (
    <SiteGrid
      contentMain={
        <div className="space-y-8">
          <Button className="bg-primary text-invert p-4 button-hover">
            <Link
              href={`${PATH_ADMIN_BLOGS}/create`}
              className="flex justify-center items-center gap-2 text-lg hover:text-invert"
            >
              <LuPencil />
              {t("blog.createTitle")}
            </Link>
          </Button>

          <div className="space-y-4">
            <AdminGrid>
              {blogs.map((blog) => (
                <Fragment key={blog.id}>
                  {/* cover photo */}
                  <PhotoTiny
                    className={clsx(
                      "rounded-sm overflow-hidden",
                      "border border-shironezumi dark:border-gray-800"
                    )}
                    id={blog.id}
                    blog={blog}
                  />

                  {/* title/author/date */}
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-1 justify-start items-center">
                      <Link
                        key={blog.id}
                        href={pathForAdminBlogEdit(blog.id)}
                        className="flex items-center gap-2 w-fit mr-2"
                      >
                        <span
                          className={clsx(
                            "inline-flex items-center",
                            blog.hidden && "text-dim"
                          )}
                        >
                          {`${blog.title} - ${blog.author.name}`}
                        </span>
                      </Link>
                      <FormWithConfirm
                        action={toggleBlogHidden}
                        confirmText={
                          blog.hidden
                            ? t("actions.unhiddenBlogConfirmText")
                            : t("actions.hiddenBlogConfirmText")
                        }
                      >
                        <button
                          className={clsx(
                            "icon-hover cursor-pointer link bg-transparent",
                            blog.hidden && "text-dim"
                          )}
                        >
                          <input type="hidden" name="id" value={blog.id} />
                          {blog.hidden ? (
                            <AiOutlineEye
                              className="translate-y-[0.25px]"
                              size={16}
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              className="translate-y-[0.25px]"
                              size={16}
                            />
                          )}
                        </button>
                      </FormWithConfirm>
                    </div>
                    <div className={clsx("lg:w-[50%] uppercase", "text-dim")}>
                      {formatDBDate(blog.updatedAt)}
                    </div>
                  </div>

                  {/* action buttons */}
                  <div
                    className={clsx(
                      "flex flex-nowrap",
                      "gap-2 sm:gap-3 items-center"
                    )}
                  >
                    <EditButton
                      href={pathForAdminBlogEdit(blog.id)}
                      label={t("actions.editButton")}
                    />
                    <PopoutButton
                      href={pathForBlog(blog.id)}
                      label={t("actions.popOut")}
                    />
                    <FormWithConfirm
                      action={deleteBlogAction}
                      confirmText={t("actions.deleteBlogConfirmText", {
                        title: blog.title,
                      })}
                    >
                      <input type="hidden" name="id" value={blog.id} />
                      <input
                        type="hidden"
                        name="url"
                        value={blog.coverPhoto?.src}
                      />
                      <DeleteButton />
                    </FormWithConfirm>
                  </div>
                </Fragment>
              ))}
            </AdminGrid>

            {showMoreBlogs && (
              <MorePhotos path={pathForAdminBlogs(offset + 1)} />
            )}
          </div>
        </div>
      }
    />
  )
}
