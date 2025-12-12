"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Database, Brain, Zap, Globe, Sparkles } from "lucide-react"

const panels = [
  {
    icon: Code2,
    title: "Full Stack",
    subtitle: "Development",
    description: "Building scalable applications with Next.js, React, and modern web technologies",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Database,
    title: "Backend",
    subtitle: "Architecture",
    description: "FastAPI, PostgreSQL, Redis - creating robust server-side solutions",
    color: "from-blue-500/20 to-violet-500/20",
  },
  {
    icon: Brain,
    title: "AI & RAG",
    subtitle: "Systems",
    description: "LangChain, vector databases, and intelligent document processing",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Zap,
    title: "Real-time",
    subtitle: "Features",
    description: "WebSockets, live updates, and responsive user experiences",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Globe,
    title: "API",
    subtitle: "Integration",
    description: "Seamless third-party integrations and microservices architecture",
    color: "from-pink-500/20 to-cyan-500/20",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    subtitle: "Driven",
    description: "Always exploring cutting-edge technologies and best practices",
    color: "from-cyan-500/20 to-blue-500/20",
  },
]

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-10" />

        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-8">
          {panels.map((panel, index) => {
            const Icon = panel.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[85vw] md:w-[450px] h-[500px] glass rounded-2xl border border-border/50 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${panel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <Icon className="h-12 w-12 md:h-16 md:w-16 text-primary mb-6 md:mb-8" strokeWidth={1.5} />
                  <div className="space-y-2 md:space-y-4">
                    <h3 className="text-4xl md:text-6xl font-bold condensed-display text-foreground">{panel.title}</h3>
                    <h4 className="text-3xl md:text-5xl font-bold condensed-display text-primary/70">
                      {panel.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed relative z-10">
                  {panel.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
