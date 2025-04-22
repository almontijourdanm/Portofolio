"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BlogBackground() {
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

      {/* Blog pattern - subtle lines representing text */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="h-2 my-3 bg-gray-500 dark:bg-gray-400 rounded"
            style={{
              width: `${Math.random() * 70 + 20}%`,
              marginLeft: `${Math.random() * 10}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Blog icons */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 opacity-15 dark:opacity-10">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 opacity-15 dark:opacity-10">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21C12 21 20 16.5 20 11C20 6.5 16.5 3 12 3C7.5 3 4 6.5 4 11C4 16.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-blue-500/15 dark:bg-blue-400/15 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-500/15 dark:bg-purple-400/15 blur-3xl" />
    </div>
  )
}
