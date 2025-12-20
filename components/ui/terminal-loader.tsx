"use client"

import { motion } from "framer-motion"

export function TerminalLoader({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full min-h-[50vh] font-mono ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-gray-900 dark:text-white">
          <span className="text-gray-400 dark:text-gray-600 select-none">&gt;</span>
          <span className="tracking-[0.2em] text-xs font-bold">SYSTEM_PROCESSING</span>
          <motion.div
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              times: [0, 0.5, 0.5, 1],
              ease: "linear" 
            }}
            className="w-2 h-4 bg-gray-900 dark:bg-white"
          />
        </div>
        
        {/* Minimalist Progress Line */}
        <div className="w-32 h-[2px] bg-gray-100 dark:bg-zinc-900 overflow-hidden">
          <motion.div
            className="h-full bg-gray-900 dark:bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      </div>
    </div>
  )
}
