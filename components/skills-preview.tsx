"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { skills } from "@/data/skills"

const categories = {
  frontend: { label: "Frontend", color: "from-cyan-500 to-blue-500" },
  backend: { label: "Backend", color: "from-green-500 to-emerald-500" },
  ai: { label: "AI & ML", color: "from-purple-500 to-pink-500" },
}

export function SkillsPreview() {
  const topSkills = {
    frontend: skills.filter((s) => s.category === "frontend").slice(0, 5),
    backend: skills.filter((s) => s.category === "backend").slice(0, 4),
    ai: skills.filter((s) => s.category === "ai").slice(0, 4),
  }

  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Proficient across the full stack with a focus on modern web technologies and AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(topSkills).map(([key, skillsList], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass border border-border rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${categories[key as keyof typeof categories].color}`}
                />
                {categories[key as keyof typeof categories].label}
              </h3>
              <div className="space-y-4">
                {skillsList.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05 + 0.2 }}
                        className={`h-full bg-gradient-to-r ${categories[key as keyof typeof categories].color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn More About Me</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
