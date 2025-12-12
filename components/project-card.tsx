"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import type { Project } from "@/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  index?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      variants={cardVariants} 
      className="group relative flex flex-col justify-between h-full min-h-[400px] border border-white/10 bg-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Project Image - clickable to detail page */}
      <Link href={`/projects/${project.slug}`} className="block relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Category badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {project.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-colors">
              {cat}
            </Badge>
          ))}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <Link href={`/projects/${project.slug}`} className="block mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </Link>

        <div className="mt-auto space-y-6">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="text-xs font-mono text-neutral-500">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs font-mono text-neutral-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-2 border-t border-white/10">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}
            <Link 
              href={`/projects/${project.slug}`}
              className="ml-auto flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
            >
              Details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
