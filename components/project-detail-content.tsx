"use client"

import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import type { Project } from "@/types"

interface ProjectDetailContentProps {
  project: Project
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Tech Stack */}
      <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Technology Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-2 rounded-lg bg-muted border border-border"
            >
              <span className="font-medium">{tech}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Description
        </h2>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  )
}
