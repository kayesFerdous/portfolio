export type ProjectCategory = "Frontend" | "Backend" | "AI" | "Full Stack"

export interface Project {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ProjectCategory[]
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl: string
  description: string
  featured?: boolean
}

export interface TimelineEvent {
  year: string
  title: string
  organization?: string
  description: string
  type: "education" | "work" | "involvement"
}

export interface Skill {
  name: string
  category: "frontend" | "backend" | "ai" | "tools"
  level: number // 0-100
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}
