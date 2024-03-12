"use client"

import React from "react"
import { motion } from "framer-motion"

export default function Intro({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="relative py-16 lg:py-24 mt-16" id="intro">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-4 text-main bg-content">
          <h2 className="title pb-4">{title}</h2>
          <motion.p
            initial={{ backgroundSize: "0% 100%" }}
            whileInView={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed inline bg-gradient-to-b from-gray-500 to-gray-500 bg-no-repeat bg-clip-text bg-left text-transparent"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
