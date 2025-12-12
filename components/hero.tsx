"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import Image from "next/image"

const InteractiveParticles = dynamic(
  () => import("@/components/interactive-particles").then((mod) => ({ default: mod.InteractiveParticles })),
  {
    ssr: false,
    loading: () => null,
  },
)

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const headlineWord = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
}

const floatUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  const enableParticles = useMemo(() => {
    if (reduceMotion) return false
    if (typeof window === "undefined") return false

    // Disable on mobile for performance
    if (window.innerWidth < 768) return false

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      return !!gl
    } catch {
      return false
    }
  }, [reduceMotion])

  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-background flex items-center justify-center">
      {enableParticles && (
        <div className="absolute inset-0 opacity-40">
          <InteractiveParticles />
        </div>
      )}

      <motion.div
        initial="hidden"
        animate="show"
        variants={heroVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center"
      >
        <motion.div variants={floatUp} className="mb-12 relative group">
          {/* Profile Image Container with Corner Marks */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 border border-border bg-background overflow-hidden">
            {/* Corner Marks */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-foreground z-20" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-foreground z-20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-foreground z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground z-20" />
            
            <Image
              src="/professional-developer-portrait.png"
              alt="Fardows Alam Kayes"
              fill
              className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        <h1 className="relative mb-6 flex flex-col items-center">
          <motion.span
            variants={headlineWord}
            className="block text-[clamp(40px,8vw,120px)] tracking-tighter font-bold uppercase leading-[0.9] text-foreground"
          >
            Fardows
          </motion.span>
          <motion.span
            variants={headlineWord}
            className="block text-[clamp(40px,8vw,120px)] tracking-tighter font-bold uppercase leading-[0.9] text-muted-foreground"
          >
            Alam Kayes
          </motion.span>
        </h1>

        <motion.p
          variants={floatUp}
          className="max-w-2xl mx-auto text-sm md:text-base font-mono text-neutral-400 uppercase tracking-widest mb-12"
        >
          Full Stack Developer & AI Engineer
        </motion.p>

        <motion.div variants={floatUp} className="flex flex-wrap justify-center gap-6">
          {[
            { icon: Github, href: "https://github.com/kayesFerdous", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/kayees-ferdous", label: "LinkedIn" },
            { icon: Mail, href: "mailto:kayesfardows@gmail.com", label: "Email" },
          ].map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
            >
              <social.icon className="h-4 w-4" />
              <span className="hidden md:inline">{social.label}</span>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </header>
  )
}
