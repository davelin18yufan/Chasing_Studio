import { formatBlogDate } from "@/utility/date"

export const MAX_BLOGS_TO_SHOW_OG = 6
export const MAX_BLOGS_TO_SHOW_PER_TAG = 6

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

interface Author {
  name: string
  url?: string
}

interface CoverPhoto {
  id?: string
  src: string
  aspectRatio?: number
}

export interface BlogBase {
  title: string
  author: Author
  coverPhoto: CoverPhoto
  content: string
  tags?: string[]
  hidden: boolean
}

export interface Blog extends BlogBase {
  id: string
  views: number
  createdAt: Date
  updatedAt: Date
}

export const titleForBlog = (blog: Blog) => blog.title || "Untitled"

export const descriptionForBlog = (blog: Blog) =>
  formatBlogDate(blog.createdAt).toUpperCase()

export const parseBlogFromDB = (blog: BlogDB): Blog => ({
  id: blog.id,
  author: {
    name: blog.author_name,
    url: blog.author_portfolio,
  },
  coverPhoto: {
    id: blog.cover_photo_id || "",
    src: blog.cover_photo_src || "",
    aspectRatio: Number(blog.cover_photo_aspect_ratio) || 1.5,
  },
  title: blog.title,
  tags: blog.tags || [],
  content: blog.content,
  hidden: blog.hidden,
  views: blog.view_number,
  createdAt: new Date(blog.created_at),
  updatedAt: new Date(blog.updated_at),
})

export const getTagLabelForCount = (
  count: number,
  singularLabel: string,
  pluralLabel: string
) => (count === 1 ? singularLabel : pluralLabel)

export const getTagQuantityText = (
  count: number,
  label: string,
  includeParentheses = true
) => (includeParentheses ? `(${count} ${label})` : `${count} ${label}`)

// extract text from content
export const getSerializeTextFromSlate = (
  node: any,
  output: {
    id: string
    type: string
    text: string
  }[] = []
) => {
  if (Array.isArray(node)) {
    node.forEach((n) => getSerializeTextFromSlate(n, output))
  }

  if (node.type === "p" && !node.url) {
    const text = node.children.map((child: any) => child.text).join("")
    output.push({ id: node.id || "", type: "p", text })
  }

  return output
}
