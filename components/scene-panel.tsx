"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

export interface ScenePanelProps {
  title: string
  subtitle?: string
  visual?: ReactNode
  action?: {
    label: string
    href: string
  }
  index: number
}

const revealUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export function ScenePanel({ title, subtitle, visual, action, index }: ScenePanelProps) {
  return (
    <motion.div
      className="scene-panel min-h-screen w-full flex items-center justify-center p-6 md:p-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Scene number indicator */}
        <motion.div variants={revealUp} className="text-muted-foreground font-mono text-sm">
          [{String(index + 1).padStart(2, "0")}]
        </motion.div>

        {/* Title - large condensed typography */}
        <motion.h2
          variants={revealUp}
          className="condensed-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text leading-none"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p variants={revealUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </motion.p>
        )}

        {/* Visual content */}
        {visual && (
          <motion.div variants={revealUp} className="py-8">
            {visual}
          </motion.div>
        )}

        {/* CTA */}
        {action && (
          <motion.div variants={revealUp}>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={action.href}>{action.label}</a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
