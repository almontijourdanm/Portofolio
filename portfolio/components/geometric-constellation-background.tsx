"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function GeometricConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full width/height
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Mouse position for interaction
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    const mouseRadius = 150

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create nodes
    const nodeCount = Math.min(Math.floor(window.innerWidth / 20), 100)
    const nodes: Node[] = []

    const primaryColor =
      resolvedTheme === "dark"
        ? "rgba(59, 130, 246, 0.8)" // Blue for dark mode
        : "rgba(37, 99, 235, 0.6)" // Darker blue for light mode

    const secondaryColor =
      resolvedTheme === "dark"
        ? "rgba(139, 92, 246, 0.8)" // Purple for dark mode
        : "rgba(124, 58, 237, 0.6)" // Darker purple for light mode

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2 + 1
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (resolvedTheme === "dark") {
        gradient.addColorStop(0, "rgba(10, 10, 30, 1)")
        gradient.addColorStop(1, "rgba(30, 10, 40, 1)")
      } else {
        gradient.addColorStop(0, "rgba(240, 249, 255, 0.2)")
        gradient.addColorStop(1, "rgba(240, 245, 255, 0.2)")
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Mouse interaction
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx)
          const force = ((mouseRadius - distance) / mouseRadius) * 0.05
          node.vx += Math.cos(angle) * force
          node.vy += Math.sin(angle) * force
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1
        }

        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1
        }

        // Apply friction
        node.vx *= 0.99
        node.vy *= 0.99

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Connect nodes that are close
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)

            // Gradient line based on distance
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
            gradient.addColorStop(0, node.color)
            gradient.addColorStop(1, otherNode.color)

            ctx.strokeStyle = gradient
            ctx.lineWidth = Math.max(0, 1 - distance / 150)
            ctx.stroke()
          }
        }
      }

      // Draw mouse interaction area
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, mouseRadius, 0, Math.PI * 2)
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"
      ctx.fill()

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  if (!mounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}
