"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  type: "circle" | "square" | "triangle"
  color: string
  delay: number
}

export default function AnimatedShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Generate random shapes
    const shapeCount = 15
    const newShapes: Shape[] = []

    const colors =
      resolvedTheme === "dark"
        ? ["#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"]
        : ["#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"]

    const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
      })
    }

    setShapes(newShapes)
  }, [resolvedTheme])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.type !== "triangle" ? shape.size : 0,
            borderRadius: shape.type === "circle" ? "50%" : 0,
            backgroundColor: shape.type !== "triangle" ? shape.color : "transparent",
            borderLeft: shape.type === "triangle" ? `${shape.size / 2}px solid transparent` : undefined,
            borderRight: shape.type === "triangle" ? `${shape.size / 2}px solid transparent` : undefined,
            borderBottom: shape.type === "triangle" ? `${shape.size}px solid ${shape.color}` : undefined,
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: 0.1,
            rotate: shape.rotation,
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  )
}
