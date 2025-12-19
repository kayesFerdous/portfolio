"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Twitter, Linkedin, LinkIcon, Type, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PostMeta } from "./post-meta"
import { useReadingProgress } from "@/hooks/use-reading-progress"
import type { Post } from "@/lib/blog"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ReaderPanelProps {
  post: Post
}

export function ReaderPanel({ post }: ReaderPanelProps) {
  const progress = useReadingProgress()
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base")
  const [focusMode, setFocusMode] = useState(false)

  const fontSizeClasses = {
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  }

  const handleShare = async (platform?: "twitter" | "linkedin") => {
    const url = `${window.location.origin}/blog/${post.slug}`
    const text = post.frontmatter.title

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
    } else if (navigator.share) {
      try {
        await navigator.share({ title: text, url })
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <article className="min-h-screen pt-24 pb-20">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: progress / 100 }}
      />

      {/* Sticky Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 glass border-b border-border transition-all ${
          focusMode ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {/* Font Size */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize((prev) => (prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"))}
              title="Change font size"
            >
              <Type className="h-4 w-4" />
            </Button>

            {/* Focus Mode */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? "Exit focus mode" : "Enter focus mode"}
            >
              {focusMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>

            {/* Share Dropdown */}
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleShare("twitter")} title="Share on Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare("linkedin")} title="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare()} title="Copy link">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cover Image */}
          <div className="relative aspect-video mb-8 rounded-2xl overflow-hidden border border-border">
            <Image
              src={post.frontmatter.coverImage || "/placeholder.svg"}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{post.frontmatter.title}</h1>

          {/* Meta */}
          <div className="mb-12">
            <PostMeta
              date={post.frontmatter.date}
              readingTime={post.frontmatter.readingTime}
              tags={post.frontmatter.tags}
            />
          </div>

          {/* Article Content */}
          <div className={`prose prose-neutral dark:prose-invert max-w-none ${fontSizeClasses[fontSize]}`}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "")
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg !bg-card border border-border"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                img({ src, alt }) {
                  return (
                    <span className="block my-8">
                      <Image
                        src={String(src || "")}
                        alt={alt || ""}
                        width={800}
                        height={450}
                        className="rounded-lg border border-border"
                      />
                    </span>
                  )
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Share this article</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare()}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
