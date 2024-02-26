"use client"

import { Value } from "@udecode/plate-common"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import React, { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { transformKey } from "@/lib/utils"
import { articleSchema } from "@/lib/validation"
import { ZodError } from "zod"
import { Blog } from "./page"
import PlateEditor from "./PlateEditor"

interface BlogFormProps {
  type: string
  blog?: Blog
}

interface ErrorItem {
  field: string | number
  message: string
}

interface FormFieldProps {
  label: string
  id: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errMsg?: ErrorItem[]
  otherClasses?: string
  placeholder?: string
  required: boolean
}

export const FormField = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  errMsg, // if provided means required field, will check at every input
  otherClasses,
  placeholder,
  required,
}: FormFieldProps) => {
  // destructure name on formData
  const displayErrorMessage = (
    errors: ErrorItem[],
    path: string
  ): string | undefined => {
    const error = errors?.find((err) => err.field === path)
    return error?.message
  }

  return (
    <>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-sky-500 dark:text-sky-400 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        name={name}
        className={`focus:border-none mt-2 ${otherClasses}`}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
      />
      {errMsg && (
        <p className="formErrorMsg">
          {errMsg && displayErrorMessage(errMsg, name)}
        </p>
      )}
    </>
  )
}

export default function BlogForm({ type, blog }: BlogFormProps) {
  const initialValue: Value = blog
    ? JSON.parse(blog.content)
    : [
        {
          id: "content",
          type: ELEMENT_PARAGRAPH,
          children: [{ text: "First image will be cover photo" }],
        },
      ]

  const initialTitleValue = {
    title: blog?.title || "",
    author: { name: blog?.author.name || "", url: blog?.author.url || "" },
    coverPhoto: {
      src: blog?.coverPhoto?.src || "",
      aspectRatio: blog?.coverPhoto?.aspectRatio || 16 / 9,
    },
  }

  const [content, setContent] = useState<Value>(initialValue)
  const [titleAndAuthor, setTitleAndAuthor] = useState(initialTitleValue)
  const [errMsg, setErrMsg] = useState<ErrorItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    // 1. 提交编辑的文章,檢查格式
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
    <>
      {/* Form */}
      <div className="flex flex-col justify-center items-start gap-4">
        <div className="lg:max-w-[70vw] relative w-full py-2">
          <Button className="bg-primary text-invert px-4 py-2 button-hover absolute -top-10 right-0">
            {type === "create" ? "Submit" : "Edit Done"}
          </Button>

          <FormField
            id="title"
            type="text"
            name="title"
            label="Title"
            value={titleAndAuthor.title}
            onChange={handleChange}
            errMsg={errMsg}
            required={true}
          />
        </div>

        {/* Author */}
        <div className="flex gap-2 w-full lg:max-w-[70vw] justify-between items-center py-2 mb-4">
          <div className="max-lg:flex-1 relative">
            <FormField
              id="author.name"
              label="Author"
              type="text"
              name="author.name"
              onChange={handleChange}
              value={titleAndAuthor.author.name}
              errMsg={errMsg}
              required={true}
            />
          </div>

          <div className="flex-1 relative">
            <FormField
              id="author.url"
              label="Portfolio"
              type="text"
              name="author.url"
              otherClasses="w-full"
              onChange={handleChange}
              value={titleAndAuthor.author.url}
              errMsg={errMsg}
              placeholder="url for reader to connect"
              required={true}
            />
          </div>
        </div>

        {/* Cover photo */}
        <div className="flex gap-2 w-full lg:max-w-[70vw] justify-between items-center py-2 mb-4">
          <div className="flex-1 relative">
            <FormField
              id="coverPhoto.src"
              label="CoverPhoto URL"
              type="text"
              otherClasses="w-full"
              name="coverPhoto.src"
              onChange={handleChange}
              value={titleAndAuthor.coverPhoto.src}
              required={false}
            />
          </div>

          <div className="relative">
            <FormField
              id="coverPhoto.aspectRatio"
              label="AspectRatio"
              type="text"
              name="coverPhoto.aspectRatio"
              onChange={handleChange}
              value={titleAndAuthor.author.url}
              placeholder="default is 16:9"
              required={false}
            />
          </div>
        </div>
      </div>

      {/* Editor */}
      <PlateEditor
        readOnly={false}
        setContent={setContent}
        blog={blog || undefined}
      />
    </>
  )
}
