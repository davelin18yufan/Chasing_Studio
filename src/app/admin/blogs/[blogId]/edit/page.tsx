import { dataUrl } from "@/lib/utils"
import BlogForm from "../../BlogForm"
import { Blog } from "../../page"

const content = [
  {
    children: [{ text: "Here is the content to be edited," }],
    id: "iydcf",
    type: "p",
  },
  {
    children: [
      { text: "with some " },
      { text: "styles,", color: "#A4C2F4", backgroundColor: "#124F5C" },
    ],
    id: "axt3f",
    type: "p",
  },
  {
    children: [
      {
        text: "and a photo for cover",
        color: "#A4C2F4",
        backgroundColor: "#124F5C",
      },
    ],
    id: "0af8z",
    type: "p",
  },
  {
    children: [{ text: "", color: "#A4C2F4", backgroundColor: "#124F5C" }],
    id: "pmc17",
    type: "p",
  },
  {
    children: [{ text: "" }],
    id: "u2082",
    type: "img",
    url: "https://source.unsplash.com/random/600x400",
  },
  {
    children: [{ text: "" }],
    id: "wdolm",
    type: "p",
  },
]

export const dummyBlog: Blog = {
  id: "1",
  title: "dummy title",
  author: {
    name: "Ruei",
    url: "https://www.instagram.com/r_uei1_23?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  content: JSON.stringify(content),
  hidden: false,
  coverPhoto: {
    src: "https://source.unsplash.com/random/600x400",
    aspectRatio: 2,
    blurData: dataUrl,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function AdminEditBlogPage({
  params: { blogId },
}: {
  params: { blogId: string }
}) {
  return (
    <>
      <h2 className="text-2xl font-bold">Writing</h2>
      <BlogForm type="edit" blog={dummyBlog} />
    </>
  )
}
