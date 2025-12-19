import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project } from "@/types"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export interface ProjectWithContent extends Project {
  content: string
}

/**
 * Get all projects from MDX files
 */
export function getAllProjectsFromMdx(): ProjectWithContent[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.warn("Projects directory not found:", projectsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = fileNames
      .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "")
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          ...(data as Project),
          slug,
          content,
        }
      })
      .sort((a, b) => {
        // Sort featured projects first, then alphabetically
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.title.localeCompare(b.title)
      })

    return projects
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

/**
 * Get a single project by slug from MDX file
 */
export function getProjectBySlug(slug: string): ProjectWithContent | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
    let fileContents: string

    try {
      fileContents = fs.readFileSync(fullPath, "utf8")
    } catch {
      // Try .md extension if .mdx doesn't exist
      const mdPath = path.join(projectsDirectory, `${slug}.md`)
      fileContents = fs.readFileSync(mdPath, "utf8")
    }

    const { data, content } = matter(fileContents)

    return {
      ...(data as Project),
      slug,
      content,
    }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

/**
 * Get all unique categories from projects
 */
export function getAllProjectCategories(): string[] {
  const projects = getAllProjectsFromMdx()
  const categories = new Set<string>()

  projects.forEach((project) => {
    project.category.forEach((cat) => categories.add(cat))
  })

  return Array.from(categories).sort()
}

/**
 * Get all unique technologies from projects
 */
export function getAllTechnologies(): string[] {
  const projects = getAllProjectsFromMdx()
  const technologies = new Set<string>()

  projects.forEach((project) => {
    project.tech.forEach((tech) => technologies.add(tech))
  })

  return Array.from(technologies).sort()
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): ProjectWithContent[] {
  const allProjects = getAllProjectsFromMdx()
  return allProjects.filter((project) => project.category.includes(category as any))
}

/**
 * Get projects by technology
 */
export function getProjectsByTechnology(tech: string): ProjectWithContent[] {
  const allProjects = getAllProjectsFromMdx()
  return allProjects.filter((project) => project.tech.includes(tech))
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): ProjectWithContent[] {
  const allProjects = getAllProjectsFromMdx()
  return allProjects.filter((project) => project.featured)
}
