import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { ReaderPanel } from "@/components/blog/reader-panel"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.frontmatter.title} | Fardows Alam Kayes`,
    description: post.frontmatter.excerpt || post.frontmatter.title,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt || post.frontmatter.title,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Fardows Alam Kayes"],
      images: [
        {
          url: post.frontmatter.coverImage,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt || post.frontmatter.title,
      images: [post.frontmatter.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    image: post.frontmatter.coverImage,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Fardows Alam Kayes",
    },
    keywords: post.frontmatter.tags.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReaderPanel post={post} />
    </>
  )
}
