"use client"

import React from "react"
import { motion } from "framer-motion"
import clsx from "clsx/lite"

export default function Intro({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="relative py-12 lg:py-16 mt-16" id="intro">
      <div
        className={clsx(
          "container grid items-center justify-center",
          "gap-4 px-4 md:px-6",
          "text-center max-w-3xl lg:max-w-5xl"
        )}
      >
        <div className="space-y-4 text-main bg-content">
          <h2 className="title pb-4">{title}</h2>
          <motion.p
            initial={{ backgroundSize: "0% 100%" }}
            whileInView={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 3, ease: "easeOut" }}
            className={clsx(
              "md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
              "inline bg-gradient-to-b from-hai to-hai bg-no-repeat bg-clip-text bg-left",
              "text-transparent"
            )}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
