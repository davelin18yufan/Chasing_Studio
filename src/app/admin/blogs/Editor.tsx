"use client"

import React, { useRef, useState } from "react"
import { cn } from "@udecode/cn"
import { CommentsProvider } from "@udecode/plate-comments"
import { TooltipProvider } from "@/components/plate-ui/tooltip"
import { Plate, Value } from "@udecode/plate-common"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { commentsUsers, myUserId } from "@/lib/plate/comments"
import { MENTIONABLES } from "@/lib/plate/mentionables"
import { plugins } from "@/lib/plate/plate-plugins"
import { CommentsPopover } from "@/components/plate-ui/comments-popover"
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay"
import { Editor } from "@/components/plate-ui/editor"
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons"
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar"
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons"
import { MentionCombobox } from "@/components/plate-ui/mention-combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { articleSchema } from "@/lib/validation"
import { ZodError } from "zod"
import { transformKey } from "@/lib/utils"
import { Descendant } from "slate"

interface ErrorItem {
  field: string | number
  message: string
}

type Node = {
  node: Element | Text
}

const initialValue = [
  {
    id: "content",
    type: ELEMENT_PARAGRAPH,
    children: [{ text: "Hello, World!" }],
  },
]

const initialTitleValue = { title: "", author: { name: "", url: "" } }

export default function PlateEditor() {
  const containerRef = useRef(null)
  const [content, setContent] = useState<Value>(initialValue)
  const [titleAndAuthor, setTitleAndAuthor] = useState(initialTitleValue)
  const [errMsg, setErrMsg] = useState<ErrorItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const displayErrorMessage = (
    errors: ErrorItem[],
    path: string
  ): string | undefined => {
    const error = errors?.find((err) => err.field === path)
    return error?.message
  }

  // extract image for cover
  const getSerializeImgFromSlate = (
    node: any,
    output: {
      id: string
      type: string
      url: string
    }[] = []
  ) => {
    if (Array.isArray(node)) {
      node.forEach((n) => getSerializeImgFromSlate(n, output))
    }

    if (node.type === "img" && node.url) {
      output.push({ id: node.id || "", type: "img", url: node.url })
    }

    return output
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // reform value to match zod validation
    setTitleAndAuthor((prev) => {
      const flattenObj = { ...prev, [name]: value }
      return transformKey(flattenObj, initialTitleValue)
    })

    try {
      articleSchema.parse(titleAndAuthor)
      setErrMsg([]) // if pass clear error
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => {
          return {
            field: issue.path.join("."),
            message: issue.message,
          }
        })
        setErrMsg(errors)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  // TODO: submit
  const formSubmit = async () => {
    // 1. 提交编辑的文章
    // const submitArticle = async (articleContent) => {
    // 将文章内容保存到数据库中
    //   await saveArticleToDatabase(articleContent)
    // 解析文章内容并选择封面图
    //   const images = parseImagesFromContent(articleContent)
    //   const coverImage = selectCoverImage(images)
    // 将封面图链接与文章关联
    //   await saveCoverImageToArticle(coverImage)
    // }
    // 2. 解析文章内容中的图片链接
    // const parseImagesFromContent = (content) => {
    // 使用正则表达式或其他方法解析文章内容中的图片链接
    // 返回一个图片链接数组
    // }
    // 3. 选择封面图
    // const selectCoverImage = (images) => {
    // 根据需求选择一张图片作为封面图，比如选择第一张图片
    //   return images[0]
    // }
    // 4. 将封面图与文章关联并保存到数据库中
    // const saveCoverImageToArticle = async (coverImage) => {
    // 将封面图链接保存到文章的数据库记录中
    //   await updateArticleWithCoverImage(coverImage)
    // }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <TooltipProvider>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <div className="lg:max-w-[60vw]">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              className="focus:border-none mt-2"
              onChange={handleChange}
              autoFocus
            />
            {errMsg && (
              <p className="text-error py-2">
                {displayErrorMessage(errMsg, "title")}
              </p>
            )}
          </div>

          <div className="flex gap-2 w-full lg:max-w-[60vw] justify-between items-center">
            <div className="max-lg:flex-1">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                name="author.name"
                className="focus:border-none mt-2"
                onChange={handleChange}
              />
              {errMsg && (
                <p className="text-error py-2">
                  {displayErrorMessage(errMsg, "author.name")}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="portfolio_url">Portfolio</Label>
              <Input
                id="portfolio_url"
                type="text"
                name="author.url"
                className="focus:border-none mt-2 w-full"
                onChange={handleChange}
              />
              {errMsg && (
                <p className="text-error py-2">
                  {displayErrorMessage(errMsg, "author.url")}
                </p>
              )}
            </div>
          </div>

          <Plate
            id="content"
            plugins={plugins}
            initialValue={initialValue}
            onChange={(value) => {
              setContent(value)
            }}
          >
            <div
              ref={containerRef}
              className={cn(
                // Block selection
                "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
              )}
            >
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                className="px-16 py-8"
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <CommentsPopover />

              <CursorOverlay containerRef={containerRef} />
            </div>
          </Plate>
        </CommentsProvider>
      </TooltipProvider>
    </DndProvider>
  )
}
