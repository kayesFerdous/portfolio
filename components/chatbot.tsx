"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Sparkles, Bot, User, Maximize2, Minimize2, Terminal, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AnimatePresence, motion } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface StreamResponse {
  type: "chunk" | "full_content" | "error"
  content?: string
  full_content?: string
  message?: string
}

// Custom markdown component with developer/terminal theme styling
function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-3 font-mono border-b border-white/10 pb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold text-white mb-2 font-mono">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-semibold text-white mb-2 font-mono">{children}</h3>,

        // Paragraphs
        p: ({ children }) => <p className="text-sm text-gray-300 mb-3 last:mb-0 leading-relaxed font-mono">{children}</p>,

        // Lists
        ul: ({ children }) => <ul className="space-y-1 mb-3 list-none pl-2">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-1 mb-3 list-decimal list-inside text-gray-300 font-mono">{children}</ol>,
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-gray-300 font-mono text-sm">
            <span className="text-emerald-500 mt-1">›</span>
            <span>{children}</span>
          </li>
        ),

        // Bold and italic
        strong: ({ children }) => <strong className="text-white font-bold font-mono">{children}</strong>,
        em: ({ children }) => <em className="text-emerald-400 font-medium font-mono not-italic">{children}</em>,

        // Code
        code: ({ children, className }) => {
          const isInline = !className || !className.includes('language-')
          return isInline ? (
            <code className="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono border border-white/5">
              {children}
            </code>
          ) : (
            <div className="relative group">
              <pre className="bg-black/50 border border-white/10 rounded-md p-3 overflow-x-auto mb-3 mt-2">
                <code className="text-emerald-300 text-xs font-mono">{children}</code>
              </pre>
            </div>
          )
        },

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4 border border-white/10 rounded-md">
            <table className="min-w-full divide-y divide-white/10">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
        th: ({ children }) => (
          <th className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider font-mono">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-sm text-gray-300 border-t border-white/5 font-mono">
            {children}
          </td>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-emerald-500/50 pl-4 py-1 bg-emerald-500/5 rounded-r mb-3 italic text-gray-400">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [notificationDismissed, setNotificationDismissed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "System initialized.\nAccessing Kayes' portfolio data...\nReady for queries. >_",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStreamingMessage, isOpen, isMaximized])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setTimeout(() => scrollToBottom(), 100)
    }
  }, [isOpen, isMaximized])

  // Notification cycle
  useEffect(() => {
    if (!isOpen && !notificationDismissed) {
      const cycle = () => {
        setShowNotification(true)
        setTimeout(() => {
          setShowNotification(false)
          setTimeout(cycle, 10000)
        }, 5000)
      }
      const timer = setTimeout(cycle, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, notificationDismissed])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)
    setCurrentStreamingMessage("")

    abortControllerRef.current = new AbortController()

    try {
      const server_address = process.env.NEXT_PUBLIC_SERVER_ADDRESS
      if (!server_address) {
        throw new Error("Server configuration missing")
      }

      const response = await fetch(`${server_address}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message.trim() }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) throw new Error("Server error occurred")
      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let streamContent = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6)) as StreamResponse
                if (data.type === "chunk" && data.content) {
                  streamContent += data.content
                  setCurrentStreamingMessage(streamContent)
                } else if (data.type === "error") {
                  throw new Error(data.message || "Server error")
                }
              } catch (e) {
                console.warn("Failed to parse stream data:", e)
              }
            }
          }
        }

        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: streamContent,
          timestamp: Date.now(),
        }

        setMessages(prev => [...prev, assistantMessage])
        setCurrentStreamingMessage("")
      } finally {
        reader.releaseLock()
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') return
        setError(err.message || "Connection interrupted. Please retry.")
      }
    } finally {
      setIsLoading(false)
      setCurrentStreamingMessage("")
    }
  }, [isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim().length > 500) {
      setError("Message too long (max 500 chars)")
      return
    }
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                width: isMaximized ? "90vw" : "24rem",
                height: isMaximized ? "85vh" : "32rem",
                maxWidth: isMaximized ? "1200px" : "24rem"
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 origin-bottom-right backdrop-blur-xl",
                isMaximized && "fixed bottom-6 right-6 z-50"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-white tracking-wider">KAYES.AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex flex-col gap-1", message.role === "user" ? "items-end" : "items-start")}>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      {message.role === "user" ? "You" : "System"}
                      <span className="text-gray-700">|</span>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div
                      className={cn(
                        "max-w-[90%] rounded-lg px-4 py-3 text-sm",
                        message.role === "user"
                          ? "bg-white/10 text-white border border-white/10"
                          : "bg-transparent text-gray-300 pl-0"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownMessage content={message.content} />
                      ) : (
                        <p className="font-mono whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Streaming Message */}
                {currentStreamingMessage && (
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      System
                      <span className="text-gray-700">|</span>
                      Now
                    </div>
                    <div className="max-w-[90%] bg-transparent text-gray-300 pl-0 text-sm">
                      <MarkdownMessage content={currentStreamingMessage} />
                      <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1 align-middle" />
                    </div>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoading && !currentStreamingMessage && (
                  <div className="flex items-center gap-2 text-emerald-500/50 font-mono text-xs animate-pulse">
                    <Terminal className="w-3 h-3" />
                    <span>Processing query...</span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs bg-red-500/10 p-2 rounded border border-red-500/20">
                    <span className="font-bold">ERROR:</span>
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/40">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter command..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm h-auto py-2 px-0"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors",
                      (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
      <div className="pointer-events-auto relative">
        <AnimatePresence>
          {showNotification && !isOpen && !notificationDismissed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-full right-0 mb-4 whitespace-nowrap"
            >
              <div className="bg-white text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 relative">
                <div className="flex flex-col">
                  <span className="font-bold text-xs font-mono uppercase tracking-wider">New Message</span>
                  <span className="text-xs text-gray-600">Ask me anything about Kayes</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationDismissed(true);
                    setShowNotification(false);
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            setShowNotification(false)
            if (!isOpen) setNotificationDismissed(false)
          }}
          className={cn(
            "h-14 w-14 rounded-full shadow-2xl transition-all duration-300 border border-white/10",
            isOpen 
              ? "bg-white text-black hover:bg-gray-200 rotate-90" 
              : "bg-black text-white hover:bg-gray-900 hover:scale-110"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  )
}
