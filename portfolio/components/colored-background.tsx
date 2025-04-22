"use client"

export default function ColoredBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true">
      {/* Simple gradient background that will be clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950" />
    </div>
  )
}
