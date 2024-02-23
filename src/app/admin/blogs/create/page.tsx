import Editor from "../Editor"

export default function AdminCreateBlogPage(){
  return(
    <>
      <h2 className='text-2xl font-bold'>Writing</h2>
      <Editor type="create" />
    </>
  )
}