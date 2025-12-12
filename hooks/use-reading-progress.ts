"use client"

import { useEffect, useState } from "react"

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const totalHeight = documentHeight - windowHeight
      const currentProgress = (scrollTop / totalHeight) * 100

      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return progress
}
