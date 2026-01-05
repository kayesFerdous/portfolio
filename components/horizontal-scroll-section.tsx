"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Database, Brain, Zap, Container, Sparkles } from "lucide-react"

const panels = [
  {
    icon: Database,
    title: "Backend",
    subtitle: "My Comfort Zone",
    description: "I love the logic side of things. I build solid, efficient backends using FastAPI, PostgreSQL, and Redis.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    subtitle: "The Whole Picture",
    description: "I don't just stay on the server. I bring those backends to life with Next.js and React interfaces.",
  },
  {
    icon: Brain,
    title: "AI & Agents",
    subtitle: "The Smart Stuff",
    description: "Currently deep diving into Agentic AI, LangChain, LangGraph, and building RAG systems that actually understand context.",
  },
  {
    icon: Zap,
    title: "Real-time",
    subtitle: "Live Action",
    description: "I like apps that feel alive. Using WebSockets for instant updates and chat features.",
  },
  {
    icon: Container, // You'll likely need to import 'Container' or 'Box' from your icon library
    title: "DevOps",
    subtitle: "Workflow",
    description: "I use Docker to make sure my apps run everywhere (not just on my machine) and Git to keep my code history organized.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    subtitle: "Driven",
    description: "Because of my OCD, I am always exploring cutting-edge technologies and best practices",
  },
]

function ScrollCard({ panel }: { panel: typeof panels[0] }) {
  const Icon = panel.icon

  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] md:w-[450px] h-[500px] bg-white text-black dark:bg-black dark:text-white border border-black/10 dark:border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="relative z-10">
        <Icon className="h-12 w-12 md:h-16 md:w-16 text-black dark:text-white mb-6 md:mb-8" strokeWidth={1} />
        <div className="space-y-2">
          <h3 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tighter uppercase">{panel.title}</h3>
          <h4 className="text-2xl md:text-3xl font-mono text-black/70 dark:text-white/70 uppercase tracking-widest">
            {panel.subtitle}
          </h4>
        </div>
      </div>

      <p className="text-sm md:text-base font-mono text-black/70 dark:text-white/70 leading-relaxed relative z-10 border-t border-black/10 dark:border-white/10 pt-6">
        {panel.description}
      </p>
    </motion.div>
  )
}

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
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
