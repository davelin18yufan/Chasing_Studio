"use client"

import { Value } from "@udecode/plate-common"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import React, { useState } from "react"
import clsx from "clsx/lite"
import { useTranslations } from "next-intl"

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
import Image from "next/image"
import { createBlogAction, updateBlogAction } from "@/blog/action"

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
  value?: string | number
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
  const t = useTranslations("Admin")

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
        console.log(errors)
        setErrMsg(errors)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  const formSubmit = async () => {
    setIsSubmitting(true)
    // check format
    try {
      articleSchema.parse(titleAndAuthor)

      if (type === "create") {
        await createBlogAction({
          ...titleAndAuthor,
          content: JSON.stringify(content),
        })
      } else {
        if (!blog) throw Error(t("blog.form.error"))
        await updateBlogAction({
          id: blog?.id,
          ...titleAndAuthor,
          content: JSON.stringify(content),
        })
      }
    } catch (error) {
      // form examination
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => {
          return {
            field: issue.path.join("."),
            message: issue.message,
          }
        })
        setErrMsg(errors)
      } else {
        // submit error
        console.error(error)
        throw error
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearUpload = () => {
    setTitleAndAuthor((prev) => ({
      ...prev,
      coverPhoto: { ...prev.coverPhoto, src: "" },
    }))
  }

  return (
    <>
      {/* Form */}
      <div className="flex flex-col justify-center items-start gap-4">
        <div
          className={clsx(
            "flex items-center justify-between gap-2",
            "lg:max-w-[70vw] relative w-full py-2"
          )}
        >
          <Button
            className={clsx(
              "bg-primary text-invert",
              "px-4 py-2 button-hover",
              "absolute -top-12 right-0",
              { "disabled:text-dim": isSubmitting }
            )}
            onClick={formSubmit}
            disabled={isSubmitting}
          >
            <div className="flex items-center gap-3">
              {isSubmitting && <div className="loading h-5 w-5" />}
              <p>
                {type === "create" ? t("actions.submit") : t("actions.edit")}
              </p>
            </div>
          </Button>

          <div className="flex-1">
            <FormField
              id="title"
              type="text"
              name="title"
              label={t("blog.form.title")}
              value={titleAndAuthor.title}
              onChange={handleChange}
              errMsg={errMsg}
              required={true}
              disabled={isSubmitting}
            />
          </div>

          {/* hidden */}
          <div className="relative">
            <FormField
              id="hidden"
              label={t("blog.form.hidden")}
              type="checkbox"
              name="hidden"
              checked={titleAndAuthor.hidden}
              onChange={handleChange}
              required={false}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Author */}
        <div className="form-container mb-4">
          <div className="max-lg:flex-1 relative">
            <FormField
              id="author.name"
              label={t("blog.form.author.name")}
              type="text"
              name="author.name"
              onChange={handleChange}
              value={titleAndAuthor.author.name}
              errMsg={errMsg}
              required={true}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex-1 relative">
            <FormField
              id="author.url"
              label={t("blog.form.author.url")}
              type="text"
              name="author.url"
              otherClasses="w-full"
              onChange={handleChange}
              value={titleAndAuthor.author.url}
              errMsg={errMsg}
              placeholder="portfolio url"
              required={true}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-container mb-4">
          {/* Cover photo */}
          <div className="relative">
            <Label className="mb-2">
              {t("blog.form.coverPhoto.title")}
              <span className="text-sky-500 dark:text-sky-400 ml-1">*</span>
            </Label>

            <div className="flex items-center mb-2">
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

              {/* delete blob */}
              {titleAndAuthor?.coverPhoto?.src && (
                <div className="ml-2">
                  <FormWithConfirm
                    action={deleteBlobPhotoAction}
                    confirmText={t("actions.deleteUploadConfirmText")}
                    onClearForm={clearUpload}
                  >
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
            </div>

            {titleAndAuthor?.coverPhoto.src && (
              <div
                className="relative"
                style={{
                  aspectRatio: `${titleAndAuthor.coverPhoto.aspectRatio}`,
                }}
              >
                <Image
                  src={titleAndAuthor.coverPhoto.src}
                  alt="preview"
                  className="object-cover rounded-md"
                  fill
                  sizes="70vw"
                />
              </div>
            )}

            {errMsg && (
              <p className="formErrorMsg">
                {errMsg && displayErrorMessage(errMsg, "coverPhoto.src")}
              </p>
            )}
          </div>
        </div>

        <div className="form-container mb-4">
          <div className="flex relative">
            <FormField
              id="coverPhoto.aspectRatio"
              label={t("blog.form.coverPhoto.aspectRatio")}
              type="number"
              name="coverPhoto.aspectRatio"
              onChange={handleChange}
              value={titleAndAuthor.coverPhoto.aspectRatio}
              placeholder={t("blog.form.coverPhoto.placeholder")}
              required={false}
              otherClasses="!min-w-fit"
              errMsg={errMsg}
              disabled={isSubmitting}
            />
          </div>

          {/* tags */}
          <div className="sm:flex-1 relative">
            <FormField
              id="tags"
              label={t("blog.form.tag.title")}
              type="text"
              name="tags"
              onChange={handleChange}
              value={titleAndAuthor.tags}
              placeholder="tag1,tag2,tag3"
              required={false}
              errMsg={errMsg}
              otherClasses="!min-w-fit"
              disabled={isSubmitting}
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
