import { auth } from "@/auth"
import { MAX_BLOGS_TO_SHOW_OG } from "@/blog"
import { getBlogsCached, getImageCacheHeadersForAuth } from "@/cache"
import { IMAGE_OG_DIMENSION_SMALL } from "@/photo/image-response"
import { getIBMPlexMonoMedium } from "@/site/font"
import { ImageResponse } from "next/og"
import { Blog } from "@/blog"
import { getSerializeTextFromSlate } from "@/blog"
import ImageContainer from "@/photo/image-response/components/ImageContainer"
import ImageCaption from "@/photo/image-response/components/ImageCaption"
import { SITE_DOMAIN_OR_TITLE } from "@/site/config"

export const runtime = "edge"

function BlogCard({ blog, height }: { blog: Blog; height?: string }) {
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const text = textObj.map((t) => t.text)
  return (
    <div
      style={{
        borderRadius: "0.375rem",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        ...(height && { height }),
        display: "flex",
      }}
    >
      <img
        src={blog.coverPhoto.src}
        alt={blog.title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* title/description */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          top: 0,
          left: 0,
          padding: '1rem',
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          color: "white",
          position: "absolute",
        }}
      >
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
          }}
        >
          {blog.title}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.7)",
            background: "transparent",
          }}
        >
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {blog.author.name}
          </p>
        </div>
      </div>
    </div>
  )
}

function GridBlogs({ blogs }: { blogs: Blog[] }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25rem",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexBasis: "33.333333%" }}>
        <BlogCard blog={blogs[0]} />
      </div>

      <div
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          flexBasis: "33.333333%",
        }}
      >
        <BlogCard blog={blogs[1]} height="40%" />
        <BlogCard blog={blogs[2]} height="60%" />
      </div>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          flexBasis: "33.333333%",
        }}
      >
        <BlogCard blog={blogs[3]} height="60%" />
        <BlogCard blog={blogs[4]} height="40%" />
      </div>
    </div>
  )
}

export async function GET() {
  const [blogs, headers, { fontFamily,fonts }] = await Promise.all([
    getBlogsCached({ limit: MAX_BLOGS_TO_SHOW_OG }),
    getImageCacheHeadersForAuth(await auth()),
    getIBMPlexMonoMedium(),
  ])

  // get w/h based on aspectRatio default 16/ 9
  const { width, height } = IMAGE_OG_DIMENSION_SMALL
  return new ImageResponse(
    (
      <ImageContainer {...{ width, height }}>
        <GridBlogs blogs={blogs} />
        <ImageCaption {...{ width, height, fontFamily }}>
          {SITE_DOMAIN_OR_TITLE}/Blogs
        </ImageCaption>
      </ImageContainer>
    ),
    {
      width,
      height,
      headers,
      fonts,
    }
  )
}
