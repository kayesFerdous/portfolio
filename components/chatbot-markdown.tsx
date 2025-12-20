"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

export function ChatbotMarkdown({
  content,
  isSystem,
}: {
  content: string
  isSystem?: boolean
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-bold text-gray-800 dark:text-white mb-2 mt-4 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-bold text-gray-700 dark:text-white/90 mb-2 mt-3">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xs font-bold text-gray-600 dark:text-gray-200 mb-2 uppercase tracking-wide mt-3">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p
            className={cn(
              "text-sm mb-3 last:mb-0 leading-relaxed",
              isSystem ? "font-mono text-gray-500 dark:text-gray-400" : "text-gray-600 dark:text-gray-300",
            )}
          >
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1.5 mb-3 ml-4 list-disc marker:text-gray-500 dark:marker:text-gray-400">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1.5 mb-3 ml-4 list-decimal marker:text-gray-500 dark:marker:text-gray-400">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-gray-600 dark:text-gray-300 text-sm pl-1">{children}</li>,
        strong: ({ children }) => (
          <strong className="text-gray-900 dark:text-white font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="text-gray-800 dark:text-gray-200 italic">{children}</em>,
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const isInline = !match
          // react-markdown passes internal props (like `node`) which should not be forwarded
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { node, ...rest } = props as any

          return isInline ? (
            <code
              className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-white px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200 dark:border-zinc-700"
              {...rest}
            >
              {children}
            </code>
          ) : (
            <div className="rounded-lg overflow-hidden my-3 border border-gray-200 dark:border-zinc-700">
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match![1]}
                PreTag="div"
                customStyle={{ margin: 0, padding: "1rem", fontSize: "0.75rem", lineHeight: "1.5" }}
                {...rest}
              >
                {String(children).replace(/\n$/, "")}
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
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200 dark:border-zinc-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-gray-50 dark:bg-zinc-800/50">{children}</thead>,
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700 bg-white dark:bg-transparent">
            {children}
          </tbody>
        ),
        tr: ({ children }) => <tr className="transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/50">{children}</tr>,
        th: ({ children }) => (
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{children}</td>,
        hr: () => <hr className="my-4 border-gray-200 dark:border-zinc-700" />,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg max-w-full h-auto mb-3 border border-gray-200 dark:border-zinc-700"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
