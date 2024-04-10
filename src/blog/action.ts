"use server"

import { revalidateAllKeysAndPaths } from "@/cache"
import {
  sqlDeleteBlog,
  sqlInsertBlog,
  sqlToggleHidden,
  sqlUpdateBlog,
} from "@/services/blog"
import { convertUploadToPhoto, deleteStorageUrl } from "@/services/storage"
import { PATH_ADMIN_BLOGS } from "@/site/paths"
import { generateNanoid } from "@/utility/nanoid"
import { redirect } from "@/site/navigation"
import { BlogBase } from "."

interface CreateBlogAction extends Omit<BlogBase, "tags"> {
  tags: string
}

interface UpdateBlogAction extends Omit<BlogBase, "tags"> {
  id: string
  tags: string
}

export async function createBlogAction(formData: CreateBlogAction) {
  const { title, author, coverPhoto, content, tags, hidden } = formData
  const blogId = generateNanoid()
  const coverPhotoId = generateNanoid()
  // convert upload file name and path
  if (!coverPhoto.src) {
    throw new Error("Could not found uploaded cover photo")
  }

  // copy to new url and delete stale blob
  //* convert url will ignore add-to-photo stage
  const updatedUrl = await convertUploadToPhoto(coverPhoto.src, coverPhotoId)

  if (updatedUrl) coverPhoto.src = updatedUrl // replace

  // put formData into sqlInsertBlog
  await sqlInsertBlog({
    id: blogId,
    coverPhoto: {
      id: coverPhotoId,
      src: coverPhoto.src,
      aspectRatio: coverPhoto.aspectRatio,
    },
    author,
    title,
    content,
    hidden,
    views: 0,
    tags: tags.toLowerCase().split(","),
  })

  revalidateAllKeysAndPaths()
  redirect(PATH_ADMIN_BLOGS)
}

export async function updateBlogAction(formData: UpdateBlogAction) {
  const { id, title, author, coverPhoto, content, tags, hidden } = formData

  if (!coverPhoto.src) throw new Error("Could not found uploaded cover photo")

  // convert url will ignore add to photo stage
  const updatedUrl = await convertUploadToPhoto(coverPhoto.src, id)
  
  if (updatedUrl) coverPhoto.src = updatedUrl // replace

  await sqlUpdateBlog({
    id,
    coverPhoto: {
      id: coverPhoto.id || generateNanoid(),
      src: coverPhoto.src,
      aspectRatio: coverPhoto.aspectRatio,
    },
    author,
    title,
    content,
    hidden,
    views: 0,
    tags: tags.toLowerCase().split(","),
    updatedAt: new Date(),
  })

  revalidateAllKeysAndPaths()
  redirect(PATH_ADMIN_BLOGS)
}

export async function toggleBlogHidden(formData: FormData) {
  const id = formData.get("id") as string

  await sqlToggleHidden(id)

  revalidateAllKeysAndPaths()
}

export async function deleteBlogAction(formData: FormData) {
  const id = formData.get("id") as string
  const url = formData.get("url") as string

  // delete storage
  deleteStorageUrl(url)
  // delete database
  sqlDeleteBlog(id)

  revalidateAllKeysAndPaths()
}
