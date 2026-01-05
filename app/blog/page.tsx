import { getAllPosts, getAllTags } from "@/lib/blog"
import { BlogDiscovery } from "@/components/blog/blog-discovery"

export const metadata = {
  title: "Blog | Kayes",
  description: "Thoughts on web development, AI, and software engineering",
  openGraph: {
    title: "Blog | Fardows Alam Kayes",
    description: "Thoughts on web development, AI, and software engineering",
    type: "website",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return <BlogDiscovery posts={posts} tags={tags} />
}
