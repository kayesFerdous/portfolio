"use client"

import { motion } from "framer-motion"
import { skills } from "@/data/skills"

const categories = {
  frontend: { label: "Frontend Development", color: "from-cyan-500 to-blue-500" },
  backend: { label: "Backend Development", color: "from-green-500 to-emerald-500" },
  ai: { label: "AI & Machine Learning", color: "from-purple-500 to-pink-500" },
  tools: { label: "Tools & Platforms", color: "from-orange-500 to-red-500" },
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function SkillsGrid() {
  const groupedSkills = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    ai: skills.filter((s) => s.category === "ai"),
    tools: skills.filter((s) => s.category === "tools"),
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive expertise across modern web development and AI technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {Object.entries(groupedSkills).map(([key, skillsList]) => (
            <motion.div key={key} variants={itemVariants} className="glass border border-border rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${categories[key as keyof typeof categories].color}`}
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
                    transition={{ delay: index * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${categories[key as keyof typeof categories].color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
