"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, User, Briefcase, Mail, BookOpen, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function BottomPillNav() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <TooltipProvider delayDuration={0}>
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        role="navigation"
        aria-label="Primary quick navigation"
      >
        <div className="rounded-full px-2 py-4 flex flex-col items-center gap-4 bg-card/60 backdrop-blur-xl border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(119,215,231,0.1)]">
          {/* <Link href="/" className="flex items-center justify-center group">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="font-mono text-sm font-bold py-2" 
              style={{ writingMode: 'vertical-rl' }}
            >
              <span>{"<K/>"}</span>
            </motion.div>
          </Link> */}
          
          <div className="h-px w-6 bg-border/30" />
          
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href === "/blog" && pathname.startsWith("/blog"))

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative p-3 rounded-full transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`}
                      >
                        <Icon className="h-5 w-5" />
                        {isActive && (
                          <motion.div
                            layoutId="pill-indicator"
                            className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>

          <div className="h-px w-6 bg-border/30" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="relative p-3 rounded-full transition-colors text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-3 left-3 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.nav>
    </TooltipProvider>
  )
}
