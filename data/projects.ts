import type { Project } from "@/types"

export const projects: Project[] = [
  {
    slug: "askmypdf",
    title: "AskMyPDF: RAG-Powered Document Assistant",
    shortDescription: "Retrieval-Augmented Generation system to chat with PDFs.",
    fullDescription:
      "A sophisticated RAG (Retrieval-Augmented Generation) system that enables intelligent conversations with PDF documents. Built using LangChain and OpenAI, it processes documents, creates vector embeddings, and provides contextually relevant answers to user queries.",
    category: ["AI", "Backend"],
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Vector DB"],
    githubUrl: "https://github.com/kayesFerdous/AskMyPDF",
    imageUrl: "/ai-pdf-chat-interface-with-document-viewer.jpg",
    responsibilities: [
      "Implemented document processing pipeline with LangChain",
      "Designed vector database architecture for efficient retrieval",
      "Built FastAPI backend with streaming responses",
      "Integrated OpenAI embeddings and chat completion",
    ],
    featured: true,
  },
  {
    slug: "google-calendar-mcp",
    title: "Google Calendar MCP Server",
    shortDescription: "MCP server enabling AI agents to autonomously manage Google Calendar events.",
    fullDescription:
      "A Model Context Protocol server that empowers AI agents to interact with Google Calendar autonomously. Provides seamless integration between AI systems and calendar management, enabling intelligent scheduling and event coordination.",
    category: ["AI", "Backend"],
    tech: ["Python", "Google Calendar API", "MCP", "OAuth 2.0"],
    githubUrl: "https://github.com/kayesFerdous/Google-Calendar-MCP-Server",
    imageUrl: "/ai-calendar-automation-interface-with-events.jpg",
    responsibilities: [
      "Implemented Model Context Protocol server architecture",
      "Integrated Google Calendar API with OAuth authentication",
      "Built AI agent communication layer",
      "Developed event creation and management endpoints",
    ],
    featured: true,
  },
  {
    slug: "blab-10",
    title: "Blab-10: Real-Time Chat Platform",
    shortDescription: "Real-time messaging app with global chat, private rooms, and request-approval flows.",
    fullDescription:
      "A modern real-time chat platform built with Next.js featuring global chat rooms, private messaging, and sophisticated request-approval flows. Designed with a focus on user experience and real-time performance.",
    category: ["Frontend", "Full Stack"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Vercel"],
    githubUrl: "https://github.com/kayesFerdous/blab-10",
    liveUrl: "https://blab-10.vercel.app",
    imageUrl: "/modern-chat-interface-with-message-bubbles.jpg",
    responsibilities: [
      "Designed and implemented real-time messaging architecture",
      "Built responsive UI with Tailwind CSS",
      "Implemented private room and approval flow logic",
      "Deployed and optimized for Vercel platform",
    ],
    featured: true,
  },
]
