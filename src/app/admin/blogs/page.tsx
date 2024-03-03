import React, { Fragment } from "react"
import SiteGrid from "@/components/SiteGrid"
import AdminGrid from "@/admin/AdminGrid"
import DeleteButton from "@/admin/DeleteButton"
import EditButton from "@/admin/EditButton"
import FormWithConfirm from "@/components/FormWithConfirm"
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus"
import MorePhotos from "@/photo/MorePhotos"
import {
  PaginationParams,
  getPaginationForSearchParams,
} from "@/site/pagination"
import { syncPhotoExifDataAction, deletePhotoAction } from "@/photo/actions"
import IconGrSync from "@/site/IconGrSync"
import {
  pathForAdminBlogEdit,
  pathForAdminBlogs,
  PATH_ADMIN_BLOGS,
} from "@/site/paths"
import clsx from "clsx"
import Link from "next/link"
import ImageTiny from "@/components/ImageTiny"
import { formatDBDate } from "@/utility/date"
import { dataUrl as blurData } from "@/lib/utils"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import { LuPencil } from "react-icons/lu"
import { getBlogsCached, getBlogsCountIncludingHiddenCached } from "@/cache"
import { Blog } from "@/blog"

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
              Write a new article
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
                      "border border-gray-200 dark:border-gray-800"
                    )}
                    id={blog.id}
                    blog={blog}
                  />

                  {/* title/author/date */}
                  <div className="flex flex-col lg:flex-row">
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.id}`}
                      className="lg:w-[50%] flex items-center gap-2"
                    >
                      <span
                        className={clsx(
                          "inline-flex items-center gap-2",
                          blog.hidden && "text-dim"
                        )}
                      >
                        {`${blog.title} - ${blog.author.name}`}
                        {blog.hidden && (
                          <AiOutlineEyeInvisible
                            className="translate-y-[0.25px]"
                            size={16}
                          />
                        )}
                      </span>
                    </Link>
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
                    <EditButton href={pathForAdminBlogEdit(blog.id)} />
                    <FormWithConfirm
                      action={syncPhotoExifDataAction} //TODO: edit action
                      confirmText={
                        "Are you sure you want to overwrite article " +
                        `for "${blog.title}" from source file? ` +
                        "This action cannot be undone."
                      }
                    >
                      <input type="hidden" name="id" value={blog.id} />
                      <SubmitButtonWithStatus
                        icon={<IconGrSync className="translate-y-[-0.5px]" />}
                        onFormSubmitToastMessage={`
                          "${blog.title}" article synced
                        `}
                      />
                    </FormWithConfirm>
                    <FormWithConfirm
                      action={deletePhotoAction} //TODO: delete action
                      confirmText={
                        // eslint-disable-next-line max-len
                        `Are you sure you want to delete "${blog.title}?"`
                      }
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
