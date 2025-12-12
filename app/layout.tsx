import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { BottomPillNav } from "@/components/bottom-pill-nav"
import { CornerMarks } from "@/components/corner-marks"

import { Inter as V0_Font_Inter, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Playfair_Display as V0_Font_Playfair_Display } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _playfairDisplay = V0_Font_Playfair_Display({ subsets: ['latin'], weight: ["400","500","600","700","800","900"] })

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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
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
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <CornerMarks />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
        <BottomPillNav />
        <Analytics />
      </body>
    </html>
  )
}
