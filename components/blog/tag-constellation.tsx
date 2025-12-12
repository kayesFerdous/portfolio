"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type { Post } from "@/lib/blog"

interface TagConstellationProps {
  tags: string[]
  posts: Post[]
  selectedTags: string[]
  onTagClick: (tag: string) => void
}

interface TagNode {
  tag: string
  count: number
  x: number
  y: number
  radius: number
}

export function TagConstellation({ tags, posts, selectedTags, onTagClick }: TagConstellationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [tagNodes, setTagNodes] = useState<TagNode[]>([])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate tag nodes
  useEffect(() => {
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth
    const height = 300
    const centerX = width / 2
    const centerY = height / 2

    // Count posts per tag
    const tagCounts = new Map<string, number>()
    tags.forEach((tag) => {
      const count = posts.filter((post) => post.frontmatter.tags.includes(tag)).length
      tagCounts.set(tag, count)
    })

    // Position tags in a radial layout
    const nodes: TagNode[] = tags.map((tag, i) => {
      const angle = (i / tags.length) * Math.PI * 2 - Math.PI / 2
      const distance = 80 + Math.random() * 40
      const count = tagCounts.get(tag) || 0
      const radius = 20 + count * 8

      return {
        tag,
        count,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius,
      }
    })

    setTagNodes(nodes)
  }, [tags, posts])

  // Mobile fallback: chip list
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => {
          const count = posts.filter((post) => post.frontmatter.tags.includes(tag)).length
          const isSelected = selectedTags.includes(tag)

          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card border border-border hover:border-primary hover:scale-105"
              }`}
            >
              {tag} <span className="text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="w-full max-w-4xl" style={{ height: 300 }} role="img" aria-label="Tag constellation">
        <defs>
          <radialGradient id="tagGlow">
            <stop offset="0%" stopColor="rgb(119, 215, 231)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(119, 215, 231)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {tagNodes.map((node, i) =>
          tagNodes.slice(i + 1).map((other, j) => {
            const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
            const isConnected = distance < 150
            const isHighlighted =
              hoveredTag === node.tag ||
              hoveredTag === other.tag ||
              selectedTags.includes(node.tag) ||
              selectedTags.includes(other.tag)

            if (!isConnected) return null

            return (
              <motion.line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={other.x}
                y2={other.y}
                stroke={isHighlighted ? "rgb(119, 215, 231)" : "rgb(119, 215, 231)"}
                strokeOpacity={isHighlighted ? 0.6 : 0.15}
                strokeWidth={isHighlighted ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            )
          }),
        )}

        {/* Tag nodes */}
        {tagNodes.map((node, i) => {
          const isHovered = hoveredTag === node.tag
          const isSelected = selectedTags.includes(node.tag)
          const isHighlighted = isHovered || isSelected

          return (
            <g key={node.tag}>
              {/* Glow effect */}
              {isHighlighted && (
                <circle cx={node.x} cy={node.y} r={node.radius + 20} fill="url(#tagGlow)" opacity={0.5} />
              )}

              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={isSelected ? "rgb(119, 215, 231)" : "rgba(119, 215, 231, 0.1)"}
                stroke="rgb(119, 215, 231)"
                strokeWidth={isHighlighted ? 3 : 1.5}
                strokeOpacity={isHighlighted ? 1 : 0.5}
                className="cursor-pointer"
                onClick={() => onTagClick(node.tag)}
                onMouseEnter={() => setHoveredTag(node.tag)}
                onMouseLeave={() => setHoveredTag(null)}
                initial={{ scale: 0 }}
                animate={{ scale: isHighlighted ? 1.1 : 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.15 }}
              />

              {/* Tag label */}
              <motion.text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-current pointer-events-none select-none"
                style={{ fill: isSelected ? "rgb(9, 9, 11)" : "rgb(250, 250, 250)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 + 0.2 }}
              >
                {node.tag}
              </motion.text>

              {/* Count badge */}
              <motion.text
                x={node.x}
                y={node.y + node.radius + 15}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground pointer-events-none select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHighlighted ? 1 : 0.6 }}
                transition={{ delay: i * 0.05 + 0.3 }}
              >
                {node.count} {node.count === 1 ? "post" : "posts"}
              </motion.text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
