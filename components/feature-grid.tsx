"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  buttonText: string
  children: React.ReactNode
  className?: string
}

function FeatureCard({ title, description, buttonText, children, className }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-8 min-h-[600px] border-r border-white/10 bg-black overflow-hidden group",
        className
      )}
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

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-neutral-400 max-w-sm leading-relaxed">{description}</p>
      </div>

      {/* Graphic Container */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {children}
        </motion.div>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-auto">
        <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
          {buttonText} <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function FeatureGrid() {
  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-b border-white/10">
          {/* Card 1: Grok Style */}
          <FeatureCard
            title="Grok"
            description="Grok is your cosmic guide, now accessible on grok.com, iOS, and Android. Explore the universe with AI."
            buttonText="Use Now"
          >
            <div className="relative w-64 h-64 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.5]">
                <path d="M50 10 L90 90 L10 90 Z" />
                <circle cx="50" cy="60" r="20" />
                <path d="M10 10 L90 90" />
              </svg>
            </div>
          </FeatureCard>

          {/* Card 2: API Style */}
          <FeatureCard
            title="API"
            description="Supercharge your applications with Grok's enhanced speed, precision, and multilingual capabilities."
            buttonText="Build Now"
          >
            <div className="relative w-full max-w-[300px] aspect-video border border-white/20 bg-neutral-900/50 rounded-lg p-2 transform rotate-y-12 rotate-x-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2">
                <div className="w-3/4 h-2 bg-white/10 rounded" />
                <div className="w-1/2 h-2 bg-white/10 rounded" />
                <div className="w-full h-2 bg-white/10 rounded" />
              </div>
              
              {/* Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-500 rounded-full"
                    initial={{ opacity: 0, y: 100, x: Math.random() * 300 }}
                    animate={{ opacity: [0, 1, 0], y: -100 }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: Docs Style */}
          <FeatureCard
            title="Developer Docs"
            description="Learn how to quickly install Grok at the heart of your applications and explore guides covering common use cases."
            buttonText="Learn More"
          >
            <div className="relative w-64 h-80">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-white/20 bg-neutral-900/80 rounded-lg"
                  style={{
                    top: i * 10,
                    left: i * 10,
                    zIndex: 3 - i,
                    transform: `translateZ(${-i * 20}px)`,
                  }}
                >
                  <div className="p-4 space-y-4">
                    <div className="w-full h-2 bg-white/10 rounded" />
                    <div className="w-full h-2 bg-white/10 rounded" />
                    <div className="w-2/3 h-2 bg-white/10 rounded" />
                    <div className="w-full h-2 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}
