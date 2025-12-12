import fs from "fs"
import path from "path"
import { getAllPosts } from "../lib/blog"

const SITE_URL = "https://yourdomain.com" // Update with your actual domain
const SITE_TITLE = "Fardows Alam Kayes - Blog"
const SITE_DESCRIPTION = "Thoughts on web development, AI, and software engineering"

function generateRSSItem(post: ReturnType<typeof getAllPosts>[0]) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const pubDate = new Date(post.frontmatter.date).toUTCString()

  return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.frontmatter.excerpt || post.frontmatter.title}]]></description>
      ${post.frontmatter.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
      <author>Fardows Alam Kayes</author>
    </item>
  `.trim()
}

function generateRSS() {
  const posts = getAllPosts()
  const rssItems = posts.map(generateRSSItem).join("\n\n")
  const lastBuildDate = new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    
${rssItems}
    
  </channel>
</rss>`

  const publicDir = path.join(process.cwd(), "public")
  fs.writeFileSync(path.join(publicDir, "rss.xml"), rss.trim())
  console.log("✓ RSS feed generated at public/rss.xml")
}

// Run the generator
generateRSS()
