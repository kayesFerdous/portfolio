import { Hero } from "@/components/hero"
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { FeaturedProjects } from "@/components/featured-projects"

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <div className="relative z-10 pt-16 md:pt-20">
        <HorizontalScrollSection />
        <FeaturedProjects />
      </div>
    </div>
  )
}
