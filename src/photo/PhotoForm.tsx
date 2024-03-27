"use client"

import { useCallback, useEffect, useState } from "react"
import {
  FORM_METADATA_ENTRIES,
  PhotoFormData,
  convertFormKeysToLabels,
  getInitialErrors,
  isFormValid,
} from "./form"
import FieldSetWithStatus from "@/components/FieldSetWithStatus"
import { createPhotoAction, updatePhotoAction } from "./actions"
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus"
import Link from "next/link"
import { clsx } from "clsx/lite"
import CanvasBlurCapture from "@/components/CanvasBlurCapture"
import { PATH_ADMIN_PHOTOS, PATH_ADMIN_UPLOADS } from "@/site/paths"
import {
  generateLocalNaivePostgresString,
  generateLocalPostgresString,
} from "@/utility/date"
import { toastSuccess, toastWarning } from "@/toast"
import { getDimensionsFromSize } from "@/utility/size"
import ImageBlurFallback from "@/components/ImageBlurFallback"
import { BLUR_ENABLED } from "@/site/config"
import { useTranslations } from "next-intl"

const THUMBNAIL_SIZE = 300

export default function PhotoForm({
  initialPhotoForm,
  updatedExifData,
  type = "create",
  debugBlur,
}: {
  initialPhotoForm: Partial<PhotoFormData>
  updatedExifData?: Partial<PhotoFormData>
  type?: "create" | "edit"
  debugBlur?: boolean
}) {
  const [formData, setFormData] =
    useState<Partial<PhotoFormData>>(initialPhotoForm)
  const [formErrors, setFormErrors] = useState(
    getInitialErrors(initialPhotoForm)
  )
  const t = useTranslations("Admin")

  // Update form when EXIF data
  // is refreshed by parent
  useEffect(() => {
    if (Object.keys(updatedExifData ?? {}).length > 0) {
      const changedKeys: (keyof PhotoFormData)[] = []

      setFormData((currentForm) => {
        Object.entries(updatedExifData ?? {}).forEach(([key, value]) => {
          if (currentForm[key as keyof PhotoFormData] !== value) {
            changedKeys.push(key as keyof PhotoFormData)
          }
        })

        return {
          ...currentForm,
          ...updatedExifData,
        }
      })

      if (changedKeys.length > 0) {
        const fields = convertFormKeysToLabels(changedKeys)
        toastSuccess(
          t("actions.toast.updatePhotoSuccess", { fields: fields.join(", ") }),
          8000
        )
      } else {
        toastWarning(t("actions.toast.updatePhotoWarning"))
      }
    }
  }, [updatedExifData])

  const { width, height } = getDimensionsFromSize(
    THUMBNAIL_SIZE,
    formData.aspectRatio
  )

  // Generate local date strings when
  // none can be harvested from EXIF
  useEffect(() => {
    if (!formData.takenAt || !formData.takenAtNaive) {
      setFormData((data) => ({
        ...data,
        ...(!formData.takenAt && {
          takenAt: generateLocalPostgresString(),
        }),
        ...(!formData.takenAtNaive && {
          takenAtNaive: generateLocalNaivePostgresString(),
        }),
      }))
    }
  }, [formData.takenAt, formData.takenAtNaive])

  const url = formData.url ?? ""

  const updateBlurData = useCallback((blurData: string) => {
    if (BLUR_ENABLED) {
      setFormData((data) => ({
        ...data,
        blurData,
      }))
    }
  }, [])

  return (
    <div className="space-y-8 max-w-[38rem]">
      <div className="flex gap-2">
        <ImageBlurFallback
          alt="Upload"
          src={url}
          className={clsx(
            "border rounded-md overflow-hidden",
            "border-shironezumi dark:border-gray-700"
          )}
          width={width}
          height={height}
          priority
        />
        <CanvasBlurCapture
          imageUrl={url}
          width={width}
          height={height}
          onCapture={updateBlurData}
        />
        {debugBlur && formData.blurData && (
          <img
            alt="blur"
            src={formData.blurData}
            className={clsx(
              "border rounded-md overflow-hidden",
              "border-shironezumi dark:border-gray-700"
            )}
            width={width}
            height={height}
          />
        )}
      </div>
      <form
        action={type === "create" ? createPhotoAction : updatePhotoAction}
        className="space-y-6"
      >
        {FORM_METADATA_ENTRIES.map(
          ([
            key,
            {
              label,
              note,
              required,
              options,
              optionsDefaultLabel,
              readOnly,
              validate,
              capitalize,
              hideIfEmpty,
              hideBasedOnCamera,
              loadingMessage,
              checkbox,
            },
          ]) =>
            (!hideIfEmpty || formData[key]) &&
            !hideBasedOnCamera?.(formData.make) && (
              <FieldSetWithStatus
                key={key}
                id={key}
                label={t(`photo.form.labels.${key}`)}
                note={note}
                error={formErrors[key]}
                value={formData[key] ?? ""}
                onChange={(value) => {
                  setFormData({ ...formData, [key]: value })
                  if (validate) {
                    setFormErrors({ ...formErrors, [key]: validate(value) })
                  }
                }}
                selectOptions={options}
                selectOptionsDefaultLabel={t("photo.form.optionsDefaultLabel")}
                required={required}
                readOnly={readOnly}
                capitalize={capitalize}
                placeholder={
                  loadingMessage && !formData[key]
                    ? t("photo.form.loadingMessage")
                    : undefined
                }
                loading={
                  loadingMessage && !formData[key]
                    ? true
                    : false
                }
                type={checkbox ? "checkbox" : undefined}
              />
            )
        )}
        <div className="flex gap-3">
          <Link
            className="button"
            href={type === "edit" ? PATH_ADMIN_PHOTOS : PATH_ADMIN_UPLOADS}
          >
            {t("actions.cancel")}
          </Link>
          <SubmitButtonWithStatus disabled={!isFormValid(formData)}>
            {type === "create" ? t("actions.create") : t("actions.update")}
          </SubmitButtonWithStatus>
        </div>
      </form>
    </div>
  )
}
