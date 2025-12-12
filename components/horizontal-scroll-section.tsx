"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Database, Brain, Zap, Globe, Sparkles } from "lucide-react"

const panels = [
  {
    icon: Code2,
    title: "Full Stack",
    subtitle: "Development",
    description: "Building scalable applications with Next.js, React, and modern web technologies",
  },
  {
    icon: Database,
    title: "Backend",
    subtitle: "Architecture",
    description: "FastAPI, PostgreSQL, Redis - creating robust server-side solutions",
  },
  {
    icon: Brain,
    title: "AI & RAG",
    subtitle: "Systems",
    description: "LangChain, vector databases, and intelligent document processing",
  },
  {
    icon: Zap,
    title: "Real-time",
    subtitle: "Features",
    description: "WebSockets, live updates, and responsive user experiences",
  },
  {
    icon: Globe,
    title: "API",
    subtitle: "Integration",
    description: "Seamless third-party integrations and microservices architecture",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    subtitle: "Driven",
    description: "Always exploring cutting-edge technologies and best practices",
  },
]

function ScrollCard({ panel }: { panel: typeof panels[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = panel.icon

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[85vw] md:w-[450px] h-[500px] bg-black border border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Corner Marks */}
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

      <div className="relative z-10">
        <Icon className="h-12 w-12 md:h-16 md:w-16 text-white mb-6 md:mb-8" strokeWidth={1} />
        <div className="space-y-2">
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">{panel.title}</h3>
          <h4 className="text-2xl md:text-3xl font-mono text-neutral-500 uppercase tracking-widest">
            {panel.subtitle}
          </h4>
        </div>
      </div>

      <p className="text-sm md:text-base font-mono text-neutral-400 leading-relaxed relative z-10 border-t border-white/10 pt-6">
        {panel.description}
      </p>
    </motion.div>
  )
}

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-8">
          {panels.map((panel, index) => (
            <ScrollCard key={index} panel={panel} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
