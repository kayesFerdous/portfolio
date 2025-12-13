"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Storyboard } from "./storyboard"
import { TagConstellation } from "./tag-constellation"
import { SearchFilter } from "./search-filter"
import type { Post } from "@/lib/blog"

interface BlogDiscoveryProps {
  posts: Post[]
  tags: string[]
}

export function BlogDiscovery({ posts, tags }: BlogDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest")

  // Filter posts based on search and tags
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.frontmatter.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    }
    // Mock popularity - in real app would use actual metrics
    return 0
  })

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span>Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Thoughts on web development, AI, and building better software
          </p>
        </motion.div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {/* Tag Constellation */}
        <div className="mb-16">
          <TagConstellation tags={tags} posts={posts} selectedTags={selectedTags} onTagClick={handleTagClick} />
        </div>

        {/* Storyboard */}
        <Storyboard posts={sortedPosts} highlightedTags={selectedTags} />

        {/* No results */}
        {sortedPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-lg text-muted-foreground">No posts found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
