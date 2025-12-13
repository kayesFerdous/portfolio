"use client"

import { useEffect, useState, useRef } from "react"

interface HackerTextProps {
  text: string
  className?: string
  speed?: number
}

export function HackerText({ text, className = "", speed = 30 }: HackerTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Characters to use for scrambling - includes code symbols for backend vibe
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

  const scramble = () => {
    let iteration = 0
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
      
      iteration += 1 / 3
    }, speed)
  }

  useEffect(() => {
    // Initial scramble on mount
    scramble()
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text])

  return (
    <span 
      className={`${className} cursor-default`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  )
}
