"use client"

import { motion, useReducedMotion, Variants } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BlackholeBg } from "@/components/blackhole-bg"
import { HackerText } from "@/components/ui/hacker-text"

const heroVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const headlineWord: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
}

const floatUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
}

export function Hero() {
  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <BlackholeBg />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={heroVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center"
      >
        <motion.div variants={floatUp} className="mb-12 relative group">
          {/* Profile Image Container */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-white/10 bg-black/50 overflow-hidden shadow-2xl backdrop-blur-sm">
            <Image
              src="/professional-developer-portrait.png"
              alt="Fardows Alam Kayes"
              fill
              className="object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        <h1 className="relative mb-6 flex flex-col items-center">
          <motion.div
            variants={headlineWord}
            className="flex items-center gap-4 mb-2"
          >
            <span className="text-orange-500 font-mono text-xl md:text-2xl font-bold opacity-80">&gt;_</span>
            <span className="text-sm md:text-base font-mono text-orange-500/80 tracking-widest uppercase">System.init(Developer)</span>
          </motion.div>
          
          <motion.span
            variants={headlineWord}
            className="block text-[clamp(40px,8vw,120px)] tracking-tighter font-bold uppercase leading-[0.9] text-white"
          >
            <HackerText text="Kayes" speed={60} />
          </motion.span>
          {/* <motion.span
            variants={headlineWord}
            className="block text-[clamp(40px,8vw,120px)] tracking-tighter font-bold uppercase leading-[0.9] text-neutral-400"
          >
            <HackerText text="Kayes" speed={40} />
          </motion.span> */}
        </h1>

        <motion.p
          variants={floatUp}
          className="max-w-2xl mx-auto text-sm md:text-base font-mono text-neutral-400 uppercase tracking-widest mb-12"
        >
          Engineering robust backends and modern frontends, with a passion for Agentic AI.
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
