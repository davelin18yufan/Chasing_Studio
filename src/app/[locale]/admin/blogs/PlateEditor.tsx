"use client"

import { cn } from "@udecode/cn"
import clsx from "clsx/lite"
import { Plate, Value } from "@udecode/plate-common"
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

interface EditorProps {
  readOnly: boolean
  setContent?: React.Dispatch<React.SetStateAction<Value>>
  initialValue: Value
}

export default function PlateEditor({
  readOnly,
  setContent,
  initialValue,
}: EditorProps) {
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
              // eslint-disable-next-line max-len
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
          className={clsx(!readOnly && "px-16")}
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
