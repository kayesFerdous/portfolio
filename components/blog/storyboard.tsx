"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { StoryCard } from "./story-card"
import type { Post } from "@/lib/blog"

interface StoryboardProps {
  posts: Post[]
  highlightedTags: string[]
}

export function Storyboard({ posts, highlightedTags }: StoryboardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post, index) => {
          const isHighlighted =
            highlightedTags.length === 0 || highlightedTags.some((tag) => post.frontmatter.tags.includes(tag))

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StoryCard post={post} isHighlighted={isHighlighted} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
