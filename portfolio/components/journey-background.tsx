"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function JourneyBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!mounted) return null

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/90 to-white dark:via-gray-900/90 dark:to-gray-900" />

      {/* Journey path - representing the career path */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-800/50" />

      {/* Logistics icons */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 opacity-15 dark:opacity-10">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Code icons */}
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-15 dark:opacity-10">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 18L22 12L16 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-500/15 dark:bg-blue-400/15 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-purple-500/15 dark:bg-purple-400/15 blur-3xl" />
    </div>
  )
}
