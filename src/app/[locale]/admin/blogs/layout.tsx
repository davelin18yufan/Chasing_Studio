"use client"

import React from "react"
import { TooltipProvider } from "@/components/plate-ui/tooltip"
import { CommentsProvider } from "@udecode/plate-comments"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { commentsUsers, myUserId } from "@/lib/plate/comments"

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <TooltipProvider>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          {children}
        </CommentsProvider>
      </TooltipProvider>
    </DndProvider>
  )
}
