import { auth } from "@/auth"
import { getBlogCached, getImageCacheHeadersForAuth } from "@/cache"
import { IMAGE_OG_DIMENSION_SMALL } from "@/photo/image-response"
import { getIBMPlexMonoMedium } from "@/site/font"
import { ImageResponse } from "next/og"
import { Blog } from "@/blog"
import { getSerializeTextFromSlate } from "@/blog"
import ImageContainer from "@/photo/image-response/components/ImageContainer"
import ImageCaption from "@/photo/image-response/components/ImageCaption"
import { SITE_DOMAIN_OR_TITLE } from "@/site/config"
import { pathForBlogs } from "@/site/paths"
import { getNextImageUrlForRequest } from "@/services/next-image"

export const runtime = "edge"

function BlogCard({ blog, height }: { blog: Blog; height?: string }) {
  const textObj = getSerializeTextFromSlate(JSON.parse(blog.content))
  const text = textObj.map((t) => t.text)
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height,
        display: "flex",
      }}
    >
      <img
        src={getNextImageUrlForRequest(blog.coverPhoto.src, 1080)}
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
          padding: "1rem",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          color: "white",
          position: "absolute",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bolder",
            marginBottom: "0.5rem",
            textTransform: "capitalize",
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
              lineHeight: "1.25rem",
            }}
          >
            － {blog.author.name}
          </p>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text.join(" ")}
        </p>
      </div>
    </div>
  )
}

export async function GET(_: Request, context: { params: { blogId: string } }) {
  const id = context.params.blogId

  if (!id) {
    return new ImageResponse(<>Visit ${pathForBlogs}</>, {
      width: 1200,
      height: 630,
    })
  }

  const [blog, headers, { fontFamily, fonts }] = await Promise.all([
    getBlogCached(id),
    getImageCacheHeadersForAuth(await auth()),
    getIBMPlexMonoMedium(),
  ])

  if (!blog) {
    return new Response("Blog not found", { status: 404 })
  }

  // get w/h based on aspectRatio default 16/ 9
  const { width, height } = IMAGE_OG_DIMENSION_SMALL
  return new ImageResponse(
    (
      <ImageContainer {...{ width, height }}>
        <BlogCard blog={blog} height="100%" />
        <ImageCaption {...{ width, height, fontFamily }}>
          {SITE_DOMAIN_OR_TITLE}
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
