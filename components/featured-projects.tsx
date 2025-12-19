import { getFeaturedProjects } from "@/lib/projects"
import { FeaturedProjectsClient } from "@/components/featured-projects-client"

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

  return <FeaturedProjectsClient projects={featuredProjects} />
}
