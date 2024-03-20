import { useEffect, useState } from "react"

// eslint-disable-next-line max-len
const MEDIA_QUERY_SELECTOR = "(prefers-reduced-motion: reduce)" // check user preference
const MEDIA_QUERY_EVENT = "change" // change event of animation

const safelyGetMediaQuery = () =>
  typeof window !== "undefined"
    ? window.matchMedia(MEDIA_QUERY_SELECTOR)
    : undefined

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    safelyGetMediaQuery()?.matches ?? false
  )

  useEffect(() => {
    const mediaQuery = safelyGetMediaQuery()

    const changeHandler = () => {
      setPrefersReducedMotion(mediaQuery?.matches ?? false)
    }

    mediaQuery?.addEventListener(MEDIA_QUERY_EVENT, changeHandler)
    return () =>
      mediaQuery?.removeEventListener(MEDIA_QUERY_EVENT, changeHandler)
  }, [])

  return prefersReducedMotion
}

export default usePrefersReducedMotion
