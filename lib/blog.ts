import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  tags: string[]
  readingTime: number
  coverImage: string
  excerpt?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export function getAllPosts(): Post[] {
  return [] //remove this to show all the blogs
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          frontmatter: data as PostFrontmatter,
          content,
        }
      })
      .sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      })

    return posts
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    let fileContents: string

    try {
      fileContents = fs.readFileSync(fullPath, "utf8")
    } catch {
      // Try .md extension if .mdx doesn't exist
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      fileContents = fs.readFileSync(mdPath, "utf8")
    }

    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag))
}
