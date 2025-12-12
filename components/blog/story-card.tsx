"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ExternalLink, Share2, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/blog"
import { Button } from "@/components/ui/button"

interface StoryCardProps {
  post: Post
  isHighlighted: boolean
}

export function StoryCard({ post, isHighlighted }: StoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.frontmatter.title,
          text: post.frontmatter.excerpt || post.frontmatter.title,
          url: `/blog/${post.slug}`,
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`)
    }
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        className={`group relative flex flex-col h-full border border-white/10 bg-black overflow-hidden ${
          isHighlighted ? "md:col-span-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Corner Marks (Focus Box) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />
          </motion.div>
        </div>

        {/* Cover Image */}
        <div className={`relative overflow-hidden bg-neutral-900 ${isHighlighted ? "aspect-video md:aspect-[2/1]" : "aspect-video"}`}>
          <Image
            src={post.frontmatter.coverImage || "/placeholder.svg"}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Tags overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {post.frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/10 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.frontmatter.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white mb-3 group-hover:text-white/90 transition-colors ${isHighlighted ? "text-3xl" : "text-xl"}`}>
            {post.frontmatter.title}
          </h3>

          {/* Excerpt */}
          {post.frontmatter.excerpt && (
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6">
              {post.frontmatter.excerpt}
            </p>
          )}

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white group-hover:text-neutral-300 transition-colors flex items-center gap-2">
              Read Article <ArrowUpRight className="h-3 w-3" />
            </span>
            
            <button 
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Share post"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
