import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getAllProjectsFromMdx, getProjectBySlug } from "@/lib/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectDetailContent } from "@/components/project-detail-content"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjectsFromMdx()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata(props: ProjectPageProps) {
  const params = await props.params
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Fardows Alam Kayes`,
    description: project.fullDescription,
  }
}

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8 border border-border">
          <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.category.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">{project.title}</h1>
          <p className="text-xl text-muted-foreground text-balance">{project.fullDescription}</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-12">
          {project.githubUrl && (
            <Button asChild size="lg">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View Code
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="lg" variant="outline">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>

        {/* Content with animations */}
        <ProjectDetailContent project={project} />
      </div>
    </div>
  )
}
