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
import { Blog } from "@/blog"
import PlateEditor from "./PlateEditor"
import ImageInput from "@/components/ImageInput"
import { uploadPhotoFromClient } from "@/services/storage"
import DeleteButton from "@/admin/DeleteButton"
import FormWithConfirm from "@/components/FormWithConfirm"
import { deleteBlobPhotoAction } from "@/photo/actions"

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
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errMsg?: ErrorItem[]
  otherClasses?: string
  placeholder?: string
  required: boolean
  checked?: boolean
  disabled?: boolean
}

// destructure name on formData
const displayErrorMessage = (
  errors: ErrorItem[],
  path: string
): string | undefined => {
  const error = errors?.find((err) => err.field === path)
  return error?.message
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
  checked,
  disabled,
}: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-sky-500 dark:text-sky-400 ml-1">*</span>
        )}
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
        disabled={disabled}
        checked={checked}
      />
      {errMsg && (
        <p className="formErrorMsg">
          {errMsg && displayErrorMessage(errMsg, name)}
        </p>
      )}
    </div>
  )
}

export default function BlogForm({ type, blog }: BlogFormProps) {
  const initialValue: Value = blog
    ? JSON.parse(blog.content)
    : [
        {
          id: "content",
          type: ELEMENT_PARAGRAPH,
          children: [{ text: "Cover image will appear at top of title" }],
        },
      ]

  const initialTitleValue = {
    title: blog?.title || "",
    author: { name: blog?.author.name || "", url: blog?.author.url || "" },
    coverPhoto: {
      src: blog?.coverPhoto?.src || "",
      aspectRatio: blog?.coverPhoto?.aspectRatio || 16 / 9,
    },
    tags: blog?.tags?.join(",") || "",
    hidden: blog?.hidden || false,
  }

  const [content, setContent] = useState<Value>(initialValue)
  const [titleAndAuthor, setTitleAndAuthor] = useState(initialTitleValue)
  const [errMsg, setErrMsg] = useState<ErrorItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updateValue = name === "hidden" ? e.target.checked : value

    // reform value to match zod validation
    setTitleAndAuthor((prev) => {
      const flattenObj = { ...prev, [name]: updateValue }
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
  }

  return (
    <>
      {/* Form */}
      <div className="flex flex-col justify-center items-start gap-4">
        <div className="flex items-center justify-between gap-2 lg:max-w-[70vw] relative w-full py-2">
          <Button className="bg-primary text-invert px-4 py-2 button-hover absolute -top-12 right-0">
            {type === "create" ? "Submit" : "Edit Done"}
          </Button>

          <div className="flex-1">
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

          {/* hidden */}
          <div className="relative">
            <FormField
              id="hidden"
              label="Hidden?"
              type="checkbox"
              name="hidden"
              checked={titleAndAuthor.hidden}
              onChange={handleChange}
              required={false}
            />
          </div>
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

        <div className="flex gap-2 w-full lg:max-w-[70vw] justify-between items-center py-2 mb-4">
          {/* Cover photo */}
          <div className="relative">
            <Label className="mb-2">
              Cover Photo
              <span className="text-sky-500 dark:text-sky-400 ml-1">*</span>
            </Label>
            <ImageInput
              loading={isUploading}
              onStart={() => {
                setIsUploading(true)
                setErrMsg([])
              }}
              multiple={false}
              debug={true}
              onBlobReady={async ({ blob, extension }) => {
                try {
                  const url = await uploadPhotoFromClient(blob, extension)
                  setTitleAndAuthor((prev) => ({
                    ...prev,
                    coverPhoto: {
                      ...prev.coverPhoto,
                      src: url,
                    },
                  }))
                  setErrMsg([])
                } catch (error: any) {
                  setErrMsg((prev) => [
                    ...prev,
                    { field: "coverPhoto.src", message: error.message },
                  ])
                } finally {
                  setIsUploading(false)
                }
              }}
            />
            {/* //TODO: add preview image */}
            {blog?.coverPhoto?.src && (
              <div className="">
                <p className="subTitle">{blog?.coverPhoto?.src}</p>

                {/* delete blob */}
                <FormWithConfirm
                  action={deleteBlobPhotoAction}
                  confirmText="Are you sure you want to delete this upload?"
                >
                  <input
                    type="hidden"
                    name="redirectToPhotos"
                    value={
                      titleAndAuthor.coverPhoto.src.length < 2
                        ? "true"
                        : "false"
                    }
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="url"
                    value={titleAndAuthor.coverPhoto.src}
                    readOnly
                  />
                  <DeleteButton />
                </FormWithConfirm>
              </div>
            )}

            {errMsg && (
              <p className="formErrorMsg">
                {errMsg && displayErrorMessage(errMsg, "coverPhoto.src")}
              </p>
            )}
          </div>

          <div className="flex relative">
            <FormField
              id="coverPhoto.aspectRatio"
              label="AspectRatio"
              type="text"
              name="coverPhoto.aspectRatio"
              onChange={handleChange}
              value={titleAndAuthor.author.url}
              placeholder="default 16:9"
              required={false}
              otherClasses="!min-w-fit"
            />
          </div>

          {/* tags */}
          <div className="sm:flex-1 relative">
            <FormField
              id="tags"
              label="Tags"
              type="text"
              name="tags"
              onChange={handleChange}
              value={titleAndAuthor.tags}
              placeholder="use , to split"
              required={false}
              otherClasses="!min-w-fit"
            />
          </div>
        </div>
      </div>

      {/* Editor */}
      <PlateEditor
        readOnly={false}
        setContent={setContent}
        initialValue={initialValue}
      />
    </>
  )
}
