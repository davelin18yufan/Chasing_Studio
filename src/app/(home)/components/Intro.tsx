export default function Intro({ title, description }: { title:string;description: string }) {
  return (
    <section className="relative py-16 lg:py-24 mt-16" id="intro">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-4">
          <h2 className="title">{title}</h2>
          <p className="subTitle">{description}</p>
        </div>
      </div>
    </section>
  )
}
