"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Users } from "lucide-react"
import { timeline } from "@/data/timeline"

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  involvement: Users,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function Timeline() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Journey <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Education, experience, and involvement in the tech community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {timeline.map((event, index) => {
                const Icon = iconMap[event.type]
                return (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-8 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block -translate-x-1/2" />

                    <div className="md:ml-20">
                      <div className="glass border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-mono text-primary">{event.year}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground capitalize">{event.type}</span>
                            </div>
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            {event.organization && <p className="text-primary">{event.organization}</p>}
                            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
