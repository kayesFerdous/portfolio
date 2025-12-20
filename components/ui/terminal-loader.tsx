export function TerminalLoader({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full min-h-[50vh] font-mono ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-gray-900 dark:text-white">
          <span className="text-gray-400 dark:text-gray-600 select-none">&gt;</span>
          <span className="tracking-[0.2em] text-xs font-bold">SYSTEM_PROCESSING</span>
          <div
            className="w-2 h-4 bg-gray-900 dark:bg-white animate-[terminal-cursor-blink_0.8s_infinite]"
          />
        </div>
        
        {/* Minimalist Progress Line */}
        <div className="relative w-32 h-[2px] bg-gray-100 dark:bg-zinc-900 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-900 dark:bg-white animate-[terminal-progress-sweep_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  )
}
