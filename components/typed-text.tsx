"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface TypedTextProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  loop?: boolean
  showCursor?: boolean
  className?: string
  startDelay?: number
}

export function TypedText({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  showCursor = true,
  className = "",
  startDelay = 0,
}: TypedTextProps) {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        loop,
        showCursor,
        startDelay,
      })
    }

    return () => {
      typed.current?.destroy()
    }
  }, [strings, typeSpeed, backSpeed, loop, showCursor, startDelay])

  return <span ref={el} className={className} />
}
