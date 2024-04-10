// eslint-disable max-len

import { Blog, BlogDB, parseBlogFromDB } from "@/blog"
import { QueryResultRow, db, sql } from "@vercel/postgres"
import { convertArrayToPostgresString } from "./vercel-postgres"
import { Tags } from "@/tag"

const BLOG_DEFAULT_LIMIT = 15 // grid 6 + sets 9

// create table
export const sqlCreateBlogsTable = () =>
  sql`
    CREATE TABLE blogs (
      id VARCHAR(8) PRIMARY KEY,
      cover_photo_id VARCHAR(8),
      cover_photo_src VARCHAR(255),
      cover_photo_aspect_ratio DECIMAL(10,2) DEFAULT 1.777777777777778,
      hidden BOOLEAN DEFAULT FALSE,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      tags VARCHAR(255)[],
      author_name VARCHAR(255) NOT NULL,
      author_portfolio TEXT,
      view_number INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`

// checking table if existed and resend query //* using in every 'get'
const safelyQueryBlogs = async <T>(callback: () => Promise<T>): Promise<T> => {
  let result: T

  try {
    result = await callback()
  } catch (e: any) {
    if (/relation "blogs" does not exist/i.test(e.message)) {
      console.log("Creating table \"blogs\" because it did not exist")
      await sqlCreateBlogsTable()
      result = await callback()
    } else if (/endpoint is in transition/i.test(e.message)) {
      // Wait 5 seconds and try again
      await new Promise((resolve) => setTimeout(resolve, 5000))
      try {
        result = await callback()
      } catch (e: any) {
        console.log(`sql get error on retry (after 5000ms): ${e.message} `)
        throw e
      }
    } else {
      console.log(`sql get error: ${e.message} `)
      throw e
    }
  }

  return result
}

export type GetBlogsOptions = {
  sortBy?: "newest" | "oldest" | "popular" | undefined
  limit?: number | undefined
  offset?: number | undefined
  tag?: string | undefined
  includeHidden?: boolean | undefined
  authorName?: string | undefined
  query?: string | undefined // searching content or title
}

//* GET
export const getBlogs = async (options: GetBlogsOptions = {}) => {
  "use server"

  const {
    sortBy = "createdBy",
    limit = BLOG_DEFAULT_LIMIT,
    tag,
    includeHidden,
    authorName,
    query,
    offset = 0, // OFFSET = (page - 1) * pageSize
  } = options

  let sqlQuery = ["SELECT * FROM blogs"]
  // using parametrize search preventing sql injection
  let values: (number | string)[] = []
  let valueIndex = 1 // index refer to value

  let where: string[] = []
  // hidden, if specified = get all
  if (!includeHidden) {
    where.push("hidden IS NOT TRUE")
  }
  // tags
  if (tag) {
    where.push(`$${valueIndex++}=ANY(tags)`)
    values.push(tag)
  }
  // author name
  if (authorName) {
    where.push(`author_name ILIKE %$${valueIndex++}%`)
    values.push(authorName)
  }
  // title + content
  if (query) {
    where.push(
      // eslint-disable-next-line max-len
      `title LIKE %||$${valueIndex++}||% OR content LIKE %||$${valueIndex++}||% OR author_name LIKE %||$${valueIndex++}||%`
    )
    values.push(query)
  }
  if (where.length > 0) {
    sqlQuery.push(`WHERE ${where.join(" AND ")}`)
  }

  // sort
  switch (sortBy) {
  case "newest":
    sqlQuery.push("ORDER BY updated_at DESC")
    break
  case "oldest":
    sqlQuery.push("ORDER BY created_at ASC")
    break
  case "popular":
    sqlQuery.push("ORDER BY view_number DESC")
    break
  default:
    sqlQuery.push("ORDER BY created_at DESC")
    break
  }

  // LIMIT + OFFSET
  sqlQuery.push(`LIMIT $${valueIndex++} OFFSET $${valueIndex++}`)
  values.push(limit, offset) // limit, offset

  const { rows } = await safelyQueryBlogs(async () => {
    const client = await db.connect()
    return client.query(sqlQuery.join(" "), values)
  })

  return rows
}

const sqlGetBlog = async (id: string) =>
  sql`SELECT * FROM blogs WHERE id=${id} LIMIT 1`
export const getBlog = async (id: string) => {
  const { rows } = await safelyQueryBlogs(() => sqlGetBlog(id))
  const blogs = rows.map((value: QueryResultRow) =>
    parseBlogFromDB(value as BlogDB)
  )
  // one element
  return blogs.length > 0 ? blogs[0] : undefined
}

const sqlGetUniqueTags = async (includeHidden: boolean) => {
  if (includeHidden) {
    return sql`
    SELECT DISTINCT unnest(tags) as tag, COUNT(*) FROM blogs
    GROUP BY tag
    ORDER BY tag ASC
  `.then(
        ({ rows }): Tags =>
          rows.map(({ tag, count }) => ({
            type: "blog",
            tag: tag as string,
            count: parseInt(count, 10),
          }))
      )
  } else {
    return sql`
      SELECT DISTINCT unnest(tags) as tag, COUNT(*) FROM blogs
      WHERE hidden IS NOT TRUE
      GROUP BY tag
      ORDER BY tag ASC
    `.then(
        ({ rows }): Tags =>
          rows.map(({ tag, count }) => ({
            type: "blog",
            tag: tag as string,
            count: parseInt(count, 10),
          }))
      )
  }
}
export const getUniqueBlogTags = (includeHidden: boolean) =>
  safelyQueryBlogs(() => sqlGetUniqueTags(includeHidden))

// *** Full-Text Search
// CREATE INDEX idx_search_globally ON blogs USING GIN
// (to_tsvector('english', title || ' ' || content || ' ' || author_name));
const sqlSearchGlobally = async (query: string) =>
  sql`
    SELECT * FROM blogs 
    WHERE to_tsvector('english', title || ' ' || content || ' ' || author_name)
     @@ to_tsquery('english', ${query})
  `
export const searchGlobally = (query: string) =>
  safelyQueryBlogs(() => sqlSearchGlobally(query))

// COUNT
const sqlGetBlogsCount = async (includeHidden = false) => {
  // vercel sql SDK will compile template string into 
  // (query, value) in postgres syntax to prevent injection
  // using client.query or hack like below
  // if using sql`SELECT * FROM ${query}`, query will be compile into $1
  if (includeHidden)
    return sql`SELECT COUNT(*) FROM blogs`.then(({ rows }) =>
      parseInt(rows[0].count, 10)
    )
  return sql`SELECT COUNT(*) FROM blogs WHERE hidden IS NOT TRUE`.then(
    ({ rows }) => parseInt(rows[0].count, 10)
  )
}
export const getBlogsCount = (includeHidden = false) =>
  safelyQueryBlogs(sqlGetBlogsCount.bind(null, includeHidden))

const sqlGetBlogsTagCount = async (tag: string) =>
  sql`
    SELECT COUNT(*) FROM blogs
    WHERE ${tag}=ANY(tags) AND
    hidden IS NOT TRUE
  `.then(({ rows }) => parseInt(rows[0].count, 10))
export const getBlogsTagsCount = (tag: string) =>
  safelyQueryBlogs(() => sqlGetBlogsTagCount(tag))

//* INSERT
export const sqlInsertBlog = async (
  blog: Omit<Blog, "createdAt" | "updatedAt">
) =>
  sql`INSERT INTO blogs (
    id,
    cover_photo_id,
    cover_photo_src,
    cover_photo_aspect_ratio,
    hidden,
    title,
    content,
    tags,
    author_name,
    author_portfolio,
    view_number
  ) 
  VALUES (
    ${blog.id},
    ${blog.coverPhoto?.id},
    ${blog.coverPhoto?.src},
    ${blog.coverPhoto?.aspectRatio},
    ${blog.hidden},
    ${blog.title},
    ${blog.content},
    ${convertArrayToPostgresString(blog.tags)},
    ${blog.author.name},
    ${blog.author.url},
    ${blog.views}
  )`

//* UPDATE
export const sqlUpdateBlog = async (blog: Omit<Blog, "createdAt">) =>
  sql`
    UPDATE blogs SET
    cover_photo_id=${blog.coverPhoto.id}
    cover_photo_src=${blog.coverPhoto?.src},
    cover_photo_aspect_ratio=${blog.coverPhoto?.aspectRatio},
    hidden=${blog.hidden},
    title=${blog.title},
    content=${blog.content},
    tags=${convertArrayToPostgresString(blog.tags)},
    author_name=${blog.author.name},
    author_portfolio=${blog.author.url},
    view_number=${blog.views},
    updated_at=${new Date().toISOString()}
    WHERE id=${blog.id}
  `

export const sqlToggleHidden = async (id: string) =>
  sql`
    UPDATE blogs
    SET hidden = NOT hidden
    WHERE id=${id}`

export const sqlRenameBlogTagGlobally = async (tag: string, newTag: string) =>
  sql`
      UPDATE blogs
      SET tags=ARRAY_REPLACE(tags, ${tag}, ${newTag})
      WHERE ${tag}=ANY(tags)
    `

//* DELETE
export const sqlDeleteBlog = async (id: string) =>
  sql`DELETE FROM blogs WHERE id=${id}`

export const sqlDeleteBlogTagGlobally = async (tag: string) =>
  sql`
    UPDATE blogs SET tags=ARRAY_REMOVE(tags, ${tag}) 
    WHERE ${tag}=ANY(tags)`
