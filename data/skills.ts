import type { Skill } from "@/types"

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: 90 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 85 },
  { name: "Tailwind CSS", category: "frontend", level: 95 },
  { name: "Framer Motion", category: "frontend", level: 80 },

  // Backend
  { name: "Python", category: "backend", level: 90 },
  { name: "FastAPI", category: "backend", level: 85 },
  { name: "Node.js", category: "backend", level: 80 },
  { name: "REST APIs", category: "backend", level: 90 },

  // AI
  { name: "LangChain", category: "ai", level: 85 },
  { name: "OpenAI API", category: "ai", level: 90 },
  { name: "RAG Systems", category: "ai", level: 85 },
  { name: "Vector Databases", category: "ai", level: 75 },

  // Tools
  { name: "Git", category: "tools", level: 90 },
  { name: "Docker", category: "tools", level: 75 },
  { name: "Vercel", category: "tools", level: 95 },
]
