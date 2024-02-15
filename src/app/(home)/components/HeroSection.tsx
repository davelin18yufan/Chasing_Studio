import clsx from "clsx/lite"

export default function HeroSection({title, subTitle}: {title: string, subTitle: string}){
  return (
    <section
      id="cover"
      className={clsx(
        "w-full py-12 md:py-24 lg:py-32 xl:py-48",
        "bg-home-hero bg-no-repeat bg-cover opacity-0.5",
        "animate-fadeIn"
      )}
    >
      <div className="relative overflow-hidden -top-2">
        <div className="container flex flex-col items-center px-4 space-y-2 md:px-6 lg:space-y-4">
          <div className="space-y-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-violet-600">
            <h1 className="title">
              {title}
            </h1>
            <p className="mx-auto max-w-[600px] ">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}