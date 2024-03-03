"use client"

import { commentsUsers, myUserId } from "@/lib/plate/comments"
import { CommentsProvider } from "@udecode/plate-comments"
import PlateEditor from "@/app/admin/blogs/PlateEditor"
import { Blog } from "@/blog"

// a readOnly editor to show plate content
export default function BlogContent({ blog }: { blog: Blog }) {

  return (
    <CommentsProvider users={commentsUsers} myUserId={myUserId}>
      <PlateEditor readOnly initialValue={JSON.parse(blog.content)} />
    </CommentsProvider>
  )
}
