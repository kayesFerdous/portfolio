"use client"

import { motion } from "framer-motion"

interface ProjectFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = ["All", "Frontend", "Backend", "AI", "Full Stack"]

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter)}
          className={`relative px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeFilter === filter
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted"
          }`}
        >
          {activeFilter === filter && (
            <motion.div
              layoutId="active-filter"
              className="absolute inset-0 bg-primary rounded-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </motion.button>
      ))}
    </div>
  )
}
