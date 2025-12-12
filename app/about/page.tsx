import { AboutHero } from "@/components/about-hero"
import { Timeline } from "@/components/timeline"
import { SkillsGrid } from "@/components/skills-grid"

export const metadata = {
  title: "About | Fardows Alam Kayes",
  description:
    "Learn more about Fardows Alam Kayes, a Full Stack Developer & AI Engineer specializing in Next.js, FastAPI, and AI applications.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* <SkillsGrid /> */}
      <Timeline />
    </>
  )
}
