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
    <header className="relative w-full min-h-screen overflow-hidden">
      {enableParticles ? (
        <InteractiveParticles />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background"
        />
      )}

      {/* Subtle overlay for better text contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/50 to-background/90"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={heroVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex items-center justify-center min-h-screen"
      >
        <div className="w-full max-w-4xl text-center">
          <motion.div variants={floatUp} className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
              <Image
                src="/professional-developer-portrait.png"
                alt="Fardows Alam Kayes"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.nav
            variants={floatUp}
            className="mb-8 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-muted-foreground"
          >
            
          </motion.nav>

          <h1 className="relative mb-6">
            <motion.span
              variants={headlineWord}
              className="block text-[clamp(32px,8vw,96px)] tracking-tight font-bold uppercase leading-[1.1] text-foreground"
            >
              Fardows Alam Kayes
            </motion.span>
          </h1>

          <motion.p variants={floatUp} className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            I design and build fast, animated frontend experiences and robust backend systems. Specializing in Next.js,
            FastAPI, and AI applications.
          </motion.p>

          <motion.div variants={floatUp} className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-lg hover:scale-105 transform transition-transform"
            >
              See Projects
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary/30 text-sm text-foreground bg-card/30 backdrop-blur hover:bg-card/50 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </motion.div>

          <motion.div
            variants={floatUp}
            className="mt-16 max-w-2xl mx-auto rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-5 shadow-2xl"
            role="region"
            aria-label="Code snippet"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="ml-auto text-xs text-muted-foreground font-mono">~/projects</div>
            </div>

            <pre className="text-sm text-foreground font-mono overflow-x-auto">
              <code>
                <span className="text-muted-foreground">$</span> <span className="text-primary">npm run</span>{" "}
                <span className="text-accent">build</span>
                {"\n"}
                <span className="text-green-400">✓</span>{" "}
                <span className="text-muted-foreground">Compiled successfully</span>
              </code>
            </pre>
          </motion.div>

          {/* Social links */}
          <motion.div variants={floatUp} className="mt-8 flex items-center justify-center gap-6">
            <Link
              href="https://github.com/kayesFerdous"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/kayees-ferdous"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
