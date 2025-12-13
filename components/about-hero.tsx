"use client"

import { motion } from "framer-motion"
import { MapPin, Mail, Globe } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export function AboutHero() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              About <span className="text-green-400">Me</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
              Fardows Alam Kayes — Full Stack Developer & AI Application Builder
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:kayesfardows@gmail.com" className="hover:text-primary transition-colors">
                kayesfardows@gmail.com
              </a>
            </div>
         
          </motion.div>

          <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Professional Summary
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Final-year Computer Science and Engineering student proficient in Full Stack Development (Next.js,
                FastAPI) and AI Application Building. Experienced in creating RAG-based chatbots and scalable backend
                systems.
              </p>
              {/* <p>
                Actively expanding knowledge in areas like Agentic AI (LangGraph) and committed to the competitive
                programming community at university.
              </p> */}
            </div>
          </motion.div>

          {/* <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Education
            </h2>
            <div>
              <h3 className="text-lg font-semibold">B.Sc. in Computer Science and Engineering</h3>
              <p className="text-primary">Green University of Bangladesh</p>
              <p className="text-sm text-muted-foreground mt-1">Expected Graduation: 2026</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Involvement & Interests
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary mt-1.5">▸</span>
                <span>
                  <strong className="text-foreground">GUBCPA</strong> (Green University Competitive Programmers&apos;
                  Arena) — Active member engaging with the competitive programming community
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1.5">▸</span>
                <span>Coding personal projects and exploring emerging technologies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1.5">▸</span>
                <span>Building production-ready applications with modern tech stacks</span>
              </li>
            </ul>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  )
}
