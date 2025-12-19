import type { Project } from "@/types"

export const projects: Project[] = [
  {
    slug: "blab",
    title: "Blab: Real-Time Chat Platform",
    shortDescription: "Real-time messaging app with global chat, private rooms, and request-approval flows.",
    fullDescription:
      "A modern real-time chat platform built with Next.js featuring global chat rooms, private messaging, and sophisticated request-approval flows. Designed with a focus on user experience and real-time performance.",
    category: ["Frontend", "Full Stack"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Vercel"],
    githubUrl: "https://github.com/kayesFerdous/blab-10",
    liveUrl: "https://blab-10.vercel.app",
    imageUrl: "/blab-10.png",
    description: `
A modern real-time chat platform built with Next.js featuring global chat rooms, private messaging, and sophisticated request-approval flows. Designed with a focus on user experience and real-time performance.

### Key Features
- **Real-time Messaging**: Instant global chat and private messaging.
- **Responsive UI**: Built with Tailwind CSS for a seamless experience across devices.
- **Approval Flows**: Sophisticated logic for private room access.
- **Cloud Deployment**: Optimized for Vercel.

`
    ,
    featured: true,
  },
  {
    slug: "askmypdf",
    title: "AskMyPDF: RAG-Powered Document Assistant",
    shortDescription: "Retrieval-Augmented Generation system to chat with PDFs.",
    fullDescription:
      "A sophisticated RAG (Retrieval-Augmented Generation) system that enables intelligent conversations with PDF documents. Built using LangChain and OpenAI, it processes documents, creates vector embeddings, and provides contextually relevant answers to user queries.",
    category: ["AI", "Backend"],
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Vector DB"],
    githubUrl: "https://github.com/kayesFerdous/AskMyPDF",
    imageUrl: "/AskMyPdf-template.png",
    description: `
A sophisticated RAG (Retrieval-Augmented Generation) system that enables intelligent conversations with PDF documents. Built using LangChain and OpenAI, it processes documents, creates vector embeddings, and provides contextually relevant answers to user queries.

### Technical Implementation
- **Document Processing**: Efficient pipeline using LangChain.
- **Vector Search**: Optimized database architecture for fast retrieval.
- **Backend**: High-performance FastAPI server with streaming support.
- **AI Integration**: Seamless OpenAI embeddings and chat completion.
    `,
    featured: true,
  },
  // {
  //   slug: "google-calendar-mcp",
  //   title: "Google Calendar MCP Server",
  //   shortDescription: "MCP server enabling AI agents to autonomously manage Google Calendar events.",
  //   fullDescription:
  //     "A Model Context Protocol server that empowers AI agents to interact with Google Calendar autonomously. Provides seamless integration between AI systems and calendar management, enabling intelligent scheduling and event coordination.",
  //   category: ["AI", "Backend"],
  //   tech: ["Python", "Google Calendar API", "MCP", "OAuth 2.0"],
  //   githubUrl: "https://github.com/kayesFerdous/Google-Calendar-MCP-Server",
  //   imageUrl: "/ai-calendar-automation-interface-with-events.jpg",
  //   description: `
  // A Model Context Protocol server that empowers AI agents to interact with Google Calendar autonomously. Provides seamless integration between AI systems and calendar management, enabling intelligent scheduling and event coordination.

  // ### Core Capabilities
  // - **MCP Architecture**: Implements the Model Context Protocol for standardized AI interaction.
  // - **Calendar Integration**: Full Google Calendar API support with OAuth.
  // - **Autonomous Management**: Enables AI agents to schedule and manage events.
  //   `,
  //   featured: true,
  // },
]
