import React from "react"
import dynamic from "next/dynamic"
import Editor from "./Editor"


export default function AdminArticlePage() {

  return (
    <div>
      <h2 className="title py-4">Create Story</h2>
      <Editor />
    </div>
  )
}
