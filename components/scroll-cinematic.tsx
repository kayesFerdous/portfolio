"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ScenePanel, type ScenePanelProps } from "@/components/scene-panel"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

export interface Scene extends Omit<ScenePanelProps, "index"> {}

interface ScrollCinematicProps {
  scenes: Scene[]
  heightMultiplier?: number
  progressIndicator?: boolean
}

export function ScrollCinematic({ scenes, heightMultiplier = 3, progressIndicator = true }: ScrollCinematicProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)

  // Detect mobile and viewport height
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setViewportHeight(window.innerHeight)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Use scroll hook
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  })

  // Map scroll progress to horizontal translation for desktop
  const totalSceneLength = scenes.length
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.15, 1], // Start horizontal movement at 15% scroll progress
    [0, 0, -(totalSceneLength - 1) * 100],
  )

  // Update active scene based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const adjustedProgress = latest < 0.15 ? 0 : (latest - 0.15) / 0.85
      const newIndex = Math.min(Math.floor(adjustedProgress * totalSceneLength), totalSceneLength - 1)
      setActiveSceneIndex(newIndex)
    })
    return unsubscribe
  }, [scrollYProgress, totalSceneLength])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!rootRef.current || isMobile || prefersReducedMotion) return

      const rect = rootRef.current.getBoundingClientRect()
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight

      if (!isInView) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        const nextIndex = Math.min(activeSceneIndex + 1, totalSceneLength - 1)
        const scrollTarget =
          rootRef.current.offsetTop + (nextIndex / totalSceneLength) * viewportHeight * heightMultiplier
        window.scrollTo({ top: scrollTarget, behavior: "smooth" })
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        const prevIndex = Math.max(activeSceneIndex - 1, 0)
        const scrollTarget =
          rootRef.current.offsetTop + (prevIndex / totalSceneLength) * viewportHeight * heightMultiplier
        window.scrollTo({ top: scrollTarget, behavior: "smooth" })
      }
    },
    [activeSceneIndex, totalSceneLength, viewportHeight, heightMultiplier, isMobile, prefersReducedMotion],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Mobile fallback: stacked vertical sections
  if (isMobile || prefersReducedMotion) {
    return (
      <div className="scrollytelling-mobile space-y-0">
        {scenes.map((scene, index) => (
          <ScenePanel key={index} {...scene} index={index} />
        ))}
      </div>
    )
  }

  // Desktop: pinned horizontal scrolling
  return (
    <div
      ref={rootRef}
      className="scrollytelling-root relative"
      style={{ height: `${viewportHeight * heightMultiplier}px` }}
    >
      {/* Pinned container */}
      <div
        className="scrollytelling-pin sticky top-0 h-screen w-full overflow-hidden"
        role="region"
        aria-label="Cinematic introduction story"
      >
        {/* Horizontal track */}
        <motion.div
          className="scrollytelling-track flex h-full"
          style={{ x: translateX as any, width: `${totalSceneLength * 100}vw` }}
        >
          {scenes.map((scene, index) => (
            <div
              key={index}
              className="scene-wrapper w-screen h-full flex-shrink-0"
              aria-hidden={activeSceneIndex !== index}
            >
              <ScenePanel {...scene} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Progress indicator */}
        {progressIndicator && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 glass-pill px-4 py-2">
              {scenes.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: index === activeSceneIndex ? "rgb(119, 215, 231)" : "rgba(119, 215, 231, 0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Screen reader live region for scene changes */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Scene {activeSceneIndex + 1} of {totalSceneLength}: {scenes[activeSceneIndex]?.title}
        </div>
      </div>
    </div>
  )
}
