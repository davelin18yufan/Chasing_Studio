"use client"

import { cn } from "@udecode/cn"
import clsx from "clsx/lite"
import { Plate, Value } from "@udecode/plate-common"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import { useRef } from "react"

import { CommentsPopover } from "@/components/plate-ui/comments-popover"
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay"
import { Editor } from "@/components/plate-ui/editor"
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons"
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar"
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons"
import { MentionCombobox } from "@/components/plate-ui/mention-combobox"
import { MENTIONABLES } from "@/lib/plate/mentionables"
import { plugins } from "@/lib/plate/plate-plugins"
import { Blog } from "./page"

interface EditorProps {
  blog?: Blog
  readOnly: boolean
  setContent?: React.Dispatch<React.SetStateAction<Value>>
}

export default function PlateEditor({
  blog,
  readOnly,
  setContent,
}: EditorProps) {
  const initialValue: Value = blog
    ? JSON.parse(blog.content)
    : [
        {
          id: "content",
          type: ELEMENT_PARAGRAPH,
          children: [{ text: "Cover image will appear at top of title" }],
        },
      ]

  const containerRef = useRef(null)

  return (
    <Plate
      id="content"
      plugins={plugins}
      initialValue={initialValue}
      onChange={(value) => {
        if (setContent) setContent(value)
      }}
      readOnly={readOnly}
    >
      <div
        ref={containerRef}
        className={clsx(
          !readOnly &&
            cn(
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
            )
        )}
      >
        {!readOnly && (
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>
        )}

        <Editor
          className={clsx(!readOnly && "px-16", "py-8")}
          focusRing={false}
          variant="ghost"
          size="md"
        />

        {!readOnly && (
          <>
            {/* in editor */}
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <MentionCombobox items={MENTIONABLES} />
            <CommentsPopover />
            <CursorOverlay containerRef={containerRef} />{" "}
          </>
        )}
      </div>
    </Plate>
  )
}
