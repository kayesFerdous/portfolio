"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, Maximize2, Minimize2, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AnimatePresence, motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

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

// Grid background pattern component
function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden text-black dark:text-white">
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  )
}

// Custom markdown component with dark future tech styling
function MarkdownMessage({ content, isSystem }: { content: string; isSystem?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold text-gray-800 dark:text-white mb-2 mt-4 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold text-gray-700 dark:text-white/90 mb-2 mt-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xs font-bold text-gray-600 dark:text-gray-200 mb-2 uppercase tracking-wide mt-3">{children}</h4>,
        p: ({ children }) => (
          <p className={cn(
            "text-sm mb-3 last:mb-0 leading-relaxed",
            isSystem ? "font-mono text-gray-500 dark:text-gray-400" : "text-gray-600 dark:text-gray-300"
          )}>
            {children}
          </p>
        ),
        ul: ({ children }) => <ul className="space-y-1.5 mb-3 ml-4 list-disc marker:text-gray-500 dark:marker:text-gray-400">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-1.5 mb-3 ml-4 list-decimal marker:text-gray-500 dark:marker:text-gray-400">{children}</ol>,
        li: ({ children }) => (
          <li className="text-gray-600 dark:text-gray-300 text-sm pl-1">
            {children}
          </li>
        ),
        strong: ({ children }) => <strong className="text-gray-900 dark:text-white font-semibold">{children}</strong>,
        em: ({ children }) => <em className="text-gray-800 dark:text-gray-200 italic">{children}</em>,
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '')
          const isInline = !match
          // @ts-ignore - node prop is passed by react-markdown but not needed here
          const { node, ...rest } = props
          
          return isInline ? (
            <code className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-white px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200 dark:border-zinc-700" {...rest}>
              {children}
            </code>
          ) : (
            <div className="rounded-lg overflow-hidden my-3 border border-gray-200 dark:border-zinc-700">
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match![1]}
                PreTag="div"
                customStyle={{ margin: 0, padding: '1rem', fontSize: '0.75rem', lineHeight: '1.5' }}
                {...rest}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          )
        },
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline underline decoration-gray-400 underline-offset-2 transition-colors font-medium"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-gray-200 dark:border-zinc-700 pl-3 py-1 bg-gray-50 dark:bg-zinc-900/50 rounded-r mb-3 text-gray-500 dark:text-gray-400 text-sm italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200 dark:border-zinc-700"><table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">{children}</table></div>,
        thead: ({ children }) => <thead className="bg-gray-50 dark:bg-zinc-800/50">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-zinc-700 bg-white dark:bg-transparent">{children}</tbody>,
        tr: ({ children }) => <tr className="transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/50">{children}</tr>,
        th: ({ children }) => <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{children}</th>,
        td: ({ children }) => <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{children}</td>,
        hr: () => <hr className="my-4 border-gray-200 dark:border-zinc-700" />,
        img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-lg max-w-full h-auto mb-3 border border-gray-200 dark:border-zinc-700" />,
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
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
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
                height: isMaximized ? "85vh" : "34rem",
                maxWidth: isMaximized ? "1200px" : "24rem"
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "relative bg-white dark:bg-black rounded-2xl flex flex-col overflow-hidden mb-4 origin-bottom-right border border-black/5 dark:border-white/10",
                isMaximized && "fixed bottom-6 right-6 z-50"
              )}
            >
              {/* Grid pattern background */}
              <GridPattern />
              
              {/* Header - seamless with body */}
              <div className="relative flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-black dark:bg-white animate-ping opacity-75" />
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white tracking-wider uppercase">KAYES.AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="h-7 w-7 text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isMaximized ? <Minimize2 className="w-4 h-4" strokeWidth={1.5} /> : <Maximize2 className="w-4 h-4" strokeWidth={1.5} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="relative flex-1 overflow-y-auto px-5 pb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div 
                    key={message.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex flex-col gap-1.5", message.role === "user" ? "items-end" : "items-start")}
                  >
                    {/* Message bubble */}
                    <div
                      className={cn(
                        "max-w-[90%] rounded-xl px-4 py-3 relative",
                        message.role === "user"
                          ? "bg-zinc-100 dark:bg-zinc-900/80 border-r-2 border-gray-200 dark:border-zinc-700"
                          : "bg-zinc-50 dark:bg-zinc-900/60 border-l-2 border-gray-200 dark:border-zinc-700"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownMessage 
                          content={message.content} 
                          isSystem={message.id === "welcome"}
                        />
                      ) : (
                        <p className="text-sm text-gray-800 dark:text-white whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    {/* Timestamp */}
                    <span className="text-[10px] text-gray-400 dark:text-gray-600 px-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}

                {/* Streaming Message */}
                {currentStreamingMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1.5 items-start"
                  >
                    <div className="max-w-[90%] bg-zinc-50 dark:bg-zinc-900/60 border-l-2 border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3">
                      <MarkdownMessage content={currentStreamingMessage} />
                      <span className="inline-block w-2 h-4 bg-black dark:bg-white animate-pulse ml-0.5 align-middle rounded-sm" />
                    </div>
                  </motion.div>
                )}

                {/* Loading Indicator */}
                {isLoading && !currentStreamingMessage && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-mono text-xs"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="animate-pulse">Processing query...</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-red-500 dark:text-red-400 font-mono text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                  >
                    <span className="text-red-500">✗</span>
                    <span>{error}</span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Terminal style */}
              <div className="relative px-4 pb-4 pt-2">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900/80 rounded-full px-4 py-2.5 border border-gray-200 dark:border-zinc-800 focus-within:border-black dark:focus-within:border-white transition-colors">
                    <span className="text-black dark:text-white font-mono text-sm select-none">&gt;_</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter command..."
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none font-mono text-sm"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 rounded-full transition-all duration-200",
                        input.trim() && !isLoading
                          ? "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                          : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      )}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
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
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-4 whitespace-nowrap"
            >
              <div 
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 relative"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-xs uppercase tracking-wider text-black dark:text-white">System Ready</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about Kayes</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationDismissed(true);
                    setShowNotification(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-gray-200 dark:border-zinc-800 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main toggle button with glow */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            onClick={() => {
              setIsOpen(!isOpen)
              setShowNotification(false)
              if (!isOpen) setNotificationDismissed(false)
            }}
            className={cn(
              "relative h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
              isOpen 
                ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800" 
                : "bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white"
            )}
          >
            {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
