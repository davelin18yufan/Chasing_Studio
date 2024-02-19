"use client"

import { FaTrashAlt } from "react-icons/fa"
import { FaScrewdriverWrench } from "react-icons/fa6"


export default function EditAndDeleteBtn(){
  return (
    <div className="flex flex-col gap-2 items-end justify-center">
      <FaTrashAlt className="icon-hover" />
      <FaScrewdriverWrench className="icon-hover" />
    </div>
  )
}