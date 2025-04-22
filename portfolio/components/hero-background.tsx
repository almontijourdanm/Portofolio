"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function HeroBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!mounted) return null

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white dark:via-gray-900/70 dark:to-gray-900" />

      {/* Animated code lines - simulating a code editor */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-6 my-1 bg-blue-500 dark:bg-blue-400 rounded"
            style={{
              width: `${Math.random() * 60 + 20}%`,
              marginLeft: `${Math.random() * 20}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Logistics to code transition elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 opacity-20 dark:opacity-15">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 12.5H2M22 12.5L18 8.5M22 12.5L18 16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 5.5H10C7.79086 5.5 6 7.29086 6 9.5V15.5C6 17.7091 7.79086 19.5 10 19.5H14C16.2091 19.5 18 17.7091 18 15.5V9.5C18 7.29086 16.2091 5.5 14 5.5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-10 w-20 h-20 opacity-20 dark:opacity-15">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H16M8 3V5C8 6.10457 8.89543 7 10 7H14C15.1046 7 16 6.10457 16 5V3M8 3H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 dark:bg-purple-400/20 blur-3xl" />
    </div>
  )
}
