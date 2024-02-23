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
import { pathForAdminBlogEdit, pathForAdminBlogs, PATH_ADMIN_BLOGS } from "@/site/paths"
import clsx from "clsx"
import Link from "next/link"
import ImageTiny from "@/components/ImageTiny"
import { formatDateFromPostgresString } from "@/utility/date"
import { dataUrl } from "@/lib/utils"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import { LuPencil } from "react-icons/lu"

const dummyblogs = [
  {
    id: "yJwzOFdB",
    coverPhotoSrc: "https://source.unsplash.com/random/600x400",
    coverPhotoAspectRatio: 1.499414,
    coverPhotoBlurData: dataUrl,
    title: "Blog title",
    content: "Hello world!!!",
    author: { name: "Dave", url: "http://localhost:3000" },
    tags: ["q50"],
    hidden: false,
    updatedAt: "2024-01-30 3:44:01",
    createdAt: "2024-01-30 3:44:01",
  },
]

export interface Blog {
  id: string
  coverPhoto?: {
    src: string
    aspectRatio?: number
    blurData?: string
  }
  author: { name: string; url?: string }
  title: string
  content: string
  tags?: string[]
  hidden: boolean // low opacity for lists display
  updatedAt: Date | string
  createdAt: Date | string
}

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
        src={blog.coverPhoto?.src || ''}
        aspectRatio={blog.coverPhoto?.aspectRatio || (2.0 / 1.0)}
        blurData={blog?.coverPhoto?.blurData}
        alt={blog.title}
      />
    </Link>
  )
}

export default async function AdminArticlePage({ searchParams }: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams)

  // TODO: calculate length
  const count = 1 //getPhotosCountIncludingHiddenCached
  const showMoreBlogs = count > dummyblogs.length

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
              {dummyblogs.map((blog) => (
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
                      {formatDateFromPostgresString(blog.updatedAt)}
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
                        value={blog.coverPhotoSrc}
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
