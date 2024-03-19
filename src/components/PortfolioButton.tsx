"use client"

import { useState } from "react"
import { relativeLinks } from "@/constants"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { TbHexagonLetterC } from "react-icons/tb"

export default function PortfolioButton({
  positionClass,
}: {
  positionClass?: string
}) {
  const [linkOpen, setLinkOpen] = useState(false)

  return (
    <motion.button
      whileHover={{
        scale: [1, 1.5, 1.5, 1, 1.2],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["50%", "0%", "50%", "50%", "100%"],
        transition: {
          duration: 2,
          ease: "backIn",
          times: [0, 0.2, 0.5, 0.8, 1],
        },
      }}
      whileTap={{ scale: 0.9, transition: { duration: 0.3, ease: "linear" } }}
      onHoverStart={() => setLinkOpen(true)}
      onHoverEnd={() => setLinkOpen(false)}
      className={clsx(
        positionClass,
        "rounded-full w-11 h-11 lg:w-14 lg:h-14",
        "z-20 flex justify-center "
      )}
    >
      <TbHexagonLetterC size={36} className="size-full bg-transparent" />
      <AnimatePresence>
        {linkOpen && (
          <motion.ul
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ originX: 0.5 }}
            className="flex justify-center -translate-x-1/2 gap-0.5"
          >
            {relativeLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="text-main text-2xl"
              >
                <link.icon size={20} />
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
