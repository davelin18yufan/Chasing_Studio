import clsx from "clsx/lite"

export default function Intro({description}:{description: string}){
  return (
    <section className="relative py-12 lg:py-24" id="intro">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Who are we?
          </h2>
          <p
            className={clsx(
              "max-w-3xl mx-auto",
              "text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}