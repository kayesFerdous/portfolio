import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { BottomPillNav } from "@/components/bottom-pill-nav"
import { CornerMarks } from "@/components/corner-marks"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatbotLazy } from "@/components/chatbot-lazy"

export const metadata: Metadata = {
  title: "Fardows Alam Kayes | Full Stack Developer & AI Engineer",
  description:
    "Full Stack Developer & AI Application Builder specializing in Next.js, FastAPI, and AI systems. Building RAG applications and scalable backend solutions.",
  generator: "v0.app",
  keywords: ["Full Stack Developer", "AI Engineer", "Next.js", "FastAPI", "RAG", "LangChain", "Machine Learning"],
  authors: [{ name: "Fardows Alam Kayes" }],
  openGraph: {
    title: "Fardows Alam Kayes | Full Stack Developer & AI Engineer",
    description: "Full Stack Developer & AI Application Builder specializing in Next.js, FastAPI, and AI systems.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CornerMarks />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
          <BottomPillNav />
          <ChatbotLazy />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
