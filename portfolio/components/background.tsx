"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface BackgroundProps {
  className?: string
}

export default function Background({ className = "" }: BackgroundProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!mounted) return null

  return (
    <div className={`fixed inset-0 -z-10 opacity-40 pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/30 dark:to-blue-500/20" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            resolvedTheme === "dark"
              ? "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)"
              : "radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Abstract shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl" />

      {/* Code-like pattern for a developer theme */}
      <div className="absolute top-1/3 right-1/4 text-9xl font-mono opacity-10 dark:opacity-[0.08] select-none">
        {`{ code }`}
      </div>
      <div className="absolute bottom-1/3 left-1/5 text-9xl font-mono opacity-10 dark:opacity-[0.08] select-none">
        {`< />`}
      </div>
    </div>
  )
}
