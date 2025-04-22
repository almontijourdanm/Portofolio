"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function FlowingWaveBackground() {
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
    let isMouseActive = false

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseActive = true

      // Reset mouse active after 2 seconds of inactivity
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseActive = false
      }, 2000)
    }

    let mouseTimeout: NodeJS.Timeout

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 300)
    const particles: { x: number; y: number; size: number; speed: number; angle: number; color: string }[] = []

    // Color palette based on theme
    const colors =
      resolvedTheme === "dark"
        ? ["#3b82f6", "#60a5fa", "#93c5fd", "#6366f1", "#8b5cf6"] // Blues and purples for dark mode
        : ["#3b82f6", "#60a5fa", "#93c5fd", "#6366f1", "#8b5cf6"] // Same colors but they'll be more transparent in light mode

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation variables
    let time = 0
    const waveAmplitude = 50
    const waveFrequency = 0.005
    const flowSpeed = 0.5

    // Animation loop
    const animate = () => {
      // Semi-transparent background to create trails
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(10, 10, 30, 0.1)" : "rgba(240, 248, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Calculate flow field angle based on position and time
        const noiseX = p.x * waveFrequency
        const noiseY = p.y * waveFrequency
        const noiseTime = time * 0.2

        // Create a flowing wave pattern
        const flowAngle = Math.sin(noiseX + noiseTime) * Math.cos(noiseY + noiseTime) * Math.PI * 2

        // Gradually adjust particle angle towards flow angle
        p.angle = p.angle * 0.95 + flowAngle * 0.05

        // Mouse interaction
        if (isMouseActive) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.2
            const angle = Math.atan2(dy, dx)
            p.angle = p.angle * (1 - force) + angle * force
            p.speed += force * 0.5
          }
        }

        // Limit speed
        p.speed = Math.min(p.speed, 3)

        // Apply speed decay
        p.speed *= 0.99

        // Update position based on angle and speed
        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Add wave effect to y position for rendering
        const waveOffset = Math.sin(p.x * 0.01 + time) * waveAmplitude
        const displayY = p.y + waveOffset

        // Draw particle with glow effect
        const alpha = resolvedTheme === "dark" ? 0.7 : 0.4

        // Outer glow
        const gradient = ctx.createRadialGradient(p.x, displayY, 0, p.x, displayY, p.size * 3)

        gradient.addColorStop(0, p.color.replace(")", `, ${alpha})`).replace("rgb", "rgba"))
        gradient.addColorStop(1, p.color.replace(")", ", 0)").replace("rgb", "rgba"))

        ctx.beginPath()
        ctx.arc(p.x, displayY, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner core
        ctx.beginPath()
        ctx.arc(p.x, displayY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(")", `, ${alpha + 0.2})`).replace("rgb", "rgba")
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(mouseTimeout)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  if (!mounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}
