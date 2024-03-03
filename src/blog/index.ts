import { dataUrl } from "@/lib/utils"

export interface BlogDB {
  id: string
  cover_photo_id?: string | undefined
  cover_photo_src?: string | undefined
  cover_photo_aspect_ratio?: string | undefined
  hidden: boolean
  title: string
  content: string
  tags?: string[]
  author_name: string
  author_portfolio: string
  view_number: number
  created_at: Date
  updated_at: Date
}

export interface Blog {
  id: string
  coverPhoto?: {
    id: string
    src: string
    aspectRatio?: number
    blurData?: string
  }
  author: {
    name: string
    url?: string
  }
  title: string
  content: string
  tags?: string[]
  hidden: boolean // for more loading
  views: number
  updatedAt: Date
  createdAt: Date
}

export const parseBlogFromDB = (blog: BlogDB): Blog =>
  ({
    id: blog.id,
    author: {
      name: blog.author_name,
      url: blog.author_portfolio,
    },
    coverPhoto: {
      id: blog.cover_photo_id || "",
      src: blog.cover_photo_src || "",
      aspectRatio: Number(blog.cover_photo_aspect_ratio) || 16 / 9,
      blurData: dataUrl,
    },
    title: blog.title,
    tags: blog.tags || [],
    content: blog.content,
    hidden: blog.hidden,
    views: blog.view_number,
    createdAt: new Date(blog.created_at),
    updatedAt: new Date(blog.updated_at),
  })
