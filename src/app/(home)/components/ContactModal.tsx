"use client"

import { lineUrl } from "@/constants"
import { toastSuccess } from "@/toast"
import useClickInsideOutside from "@/utility/useClickInsideOutside"
import clsx from "clsx/lite"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react"
import { BiCopy } from "react-icons/bi"

export default function ContactModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [htmlElements, setHtmlElements] = useState<HTMLDivElement[]>([])

  useEffect(() => {
    if (modalRef.current) {
      setHtmlElements([modalRef.current])
    }
  }, [])

  useClickInsideOutside({
    htmlElements,
    onClickOutside: () => setOpen(false),
  })
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-black/60"
          )}
          ref={modalRef}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "p-3 rounded-lg",
              "bg-shironeri dark:bg-black",
              "dark:border dark:border-gray-800",
              "md:p-4 md:rounded-xl"
            )}
            style={{ width: "min(500px, 90vw)" }}
          >
            <div
              className={clsx(
                "flex items-center gap-x-3",
                "text-xl md:text-3xl leading-snug"
              )}
            >
              <div className="flex-grow text-center">Line Official</div>
            </div>
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center gap-4 relative aspect-square max-w-[300px] mx-auto mt-4">
              <img
                src="https://qr-official.line.me/gs/M_157lrzya_GW.png?oat_content=qr"
                alt="qrcode"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div
              className={clsx(
                "rounded-md",
                "w-full overflow-hidden",
                "flex items-center justify-stretch",
                "border border-shironezumi dark:border-gray-800"
              )}
            >
              <div className="truncate p-2 w-full">{lineUrl}</div>
              <div
                className={clsx(
                  "p-3 border-l",
                  "border-shironezumi bg-gofun active:bg-shironezumi",
                  // eslint-disable-next-line max-len
                  "dark:border-gray-800 dark:bg-kachi dark:hover:bg-gray-800/75 dark:active:bg-kachi",
                  "cursor-pointer"
                )}
                onClick={() => {
                  navigator.clipboard.writeText(lineUrl)
                  toastSuccess("Link copied")
                }}
              >
                <BiCopy size={18} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
