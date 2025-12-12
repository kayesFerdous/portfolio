import { Hero } from "@/components/hero"
import { ScrollCinematic } from "@/components/scroll-cinematic"
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { FeatureGrid } from "@/components/feature-grid"

const cinematicScenes = [
  {
    title: "Full Stack Developer",
    subtitle:
      "Building scalable web applications with modern technologies. Specializing in Next.js, FastAPI, and AI-powered solutions.",
    visual: (
      <div className="grid grid-cols-3 gap-4 max-w-xl">
        {["Next.js", "React", "TypeScript"].map((tech) => (
          <div key={tech} className="glass p-4 rounded-lg border border-primary/20 text-center">
            <span className="text-primary font-mono text-sm">{tech}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Technical Expertise",
    subtitle:
      "Expertise across the full development stack, from interactive frontends to robust backend APIs and AI integrations.",
    visual: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        {[
          { label: "Frontend", tech: "React, Next.js, Tailwind" },
          { label: "Backend", tech: "FastAPI, Node.js, PostgreSQL" },
          { label: "AI/ML", tech: "RAG, LangChain, OpenAI" },
        ].map((item) => (
          <div key={item.label} className="glass p-6 rounded-lg border border-primary/20 space-y-2">
            <h3 className="text-primary font-semibold text-lg">{item.label}</h3>
            <p className="text-muted-foreground text-sm">{item.tech}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Featured Work",
    subtitle: "Innovative projects showcasing AI integration, real-time communication, and seamless user experiences.",
    action: {
      label: "View All Projects",
      href: "/projects",
    },
  },
]

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      {/* <div className="relative z-10">
        <ScrollCinematic scenes={cinematicScenes} heightMultiplier={3.5} progressIndicator={true} />
      </div> */}
      <div className="relative z-10 pt-16 md:pt-20">
        <HorizontalScrollSection />
        <FeaturedProjects />
        <FeatureGrid />
      </div>
    </div>
  )
}
