"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, MapPin, Github, Linkedin, Globe } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "kayesfardows@gmail.com",
    href: "mailto:kayesfardows@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Narayanganj, Dhaka, Bangladesh",
  },
  {
    icon: Globe,
    label: "Website",
    value: "kayees.me",
    href: "https://kayees.me",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/kayesFerdous",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/kayees-ferdous",
  },
]

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ContactInfo() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Let's Connect</h2>
        <p className="text-muted-foreground leading-relaxed">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {contactDetails.map((detail) => (
          <div key={detail.label} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <detail.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
              {detail.href ? (
                <Link
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {detail.value}
                </Link>
              ) : (
                <p className="font-medium">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4">
        <p className="text-sm text-muted-foreground mb-4">Follow me on social media</p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glass border border-border rounded-lg p-6 mt-8">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for opportunities
        </h3>
        <p className="text-sm text-muted-foreground">
          I'm currently looking for full-time opportunities and freelance projects.
        </p>
      </motion.div>
    </motion.div>
  )
}
