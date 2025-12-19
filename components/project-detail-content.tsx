"use client"

import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import Image from "next/image"
import type { ProjectWithContent } from "@/lib/projects"

interface ProjectDetailContentProps {
  project: ProjectWithContent
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

      {/* Markdown Content */}
      <motion.div variants={itemVariants}>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg !bg-card border border-border my-6"
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
              h2({ children }) {
                return (
                  <h2 className="text-2xl font-semibold mt-12 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full" />
                    {children}
                  </h2>
                )
              },
              h3({ children }) {
                return <h3 className="text-xl font-semibold mt-8 mb-4">{children}</h3>
              },
              p({ children }) {
                return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
              },
              ul({ children }) {
                return <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>
              },
              ol({ children }) {
                return <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {children}
                  </blockquote>
                )
              },
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  )
}
