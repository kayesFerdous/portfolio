"use client"

import dynamic from "next/dynamic"

const Chatbot = dynamic(() => import("@/components/chatbot").then((m) => m.Chatbot), {
  ssr: false,
})

export function ChatbotLazy() {
  return <Chatbot />
}
