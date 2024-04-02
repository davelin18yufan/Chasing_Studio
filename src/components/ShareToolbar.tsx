import { pathForBlogShare } from "@/site/paths"
import ShareButton from "./ShareButton"


function MoreHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

export default function ShareToolbar({blogId}: {blogId: string}) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <ShareButton
        path={pathForBlogShare(blogId)}
        prefetch={true}
        shouldScroll={true}
      />
      <MoreHorizontalIcon className="h-6 w-6 text-hai" />
    </div>
  )
}
