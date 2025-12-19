import { getAllProjectsFromMdx } from "@/lib/projects"
import { ProjectsClient } from "@/components/projects-client"

export default function ProjectsPage() {
  const projects = getAllProjectsFromMdx()

  return <ProjectsClient projects={projects} />
}
