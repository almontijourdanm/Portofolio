"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  z: number
  size: number
  color: string
  speed: number
}

export default function DepthParticlesBackground() {
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles with z-depth
    const particleCount = Math.min(Math.floor(window.innerWidth / 5), 300)
    const particles: Particle[] = []

    // Color palette based on theme
    const baseColor = resolvedTheme === "dark" ? [59, 130, 246] : [37, 99, 235] // Blue

    for (let i = 0; i < particleCount; i++) {
      // z ranges from 0 (far) to 1 (near)
      const z = Math.random()

      // Size based on z (depth)
      const size = z * 4 + 0.5

      // Color based on z (depth) - further particles are more transparent and color-shifted
      const colorShift = (1 - z) * 30 // Shift color based on depth
      const r = baseColor[0] - colorShift
      const g = baseColor[1]
      const b = baseColor[2] + colorShift
      const alpha = z * 0.8 + 0.2

      const color = `rgba(${r}, ${g}, ${b}, ${alpha})`

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        size,
        color,
        speed: z * 1.5 + 0.5, // Speed based on z (closer particles move faster)
      })
    }

    // Sort particles by z so that further particles are drawn first
    particles.sort((a, b) => a.z - b.z)

    // Animation variables
    let cameraX = 0
    let cameraY = 0
    const maxCameraMovement = 30 // Maximum camera movement in pixels

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update camera position based on mouse (parallax effect)
      const targetCameraX = ((mouseX - canvas.width / 2) / (canvas.width / 2)) * maxCameraMovement
      const targetCameraY = ((mouseY - canvas.height / 2) / (canvas.height / 2)) * maxCameraMovement

      // Smooth camera movement
      cameraX += (targetCameraX - cameraX) * 0.05
      cameraY += (targetCameraY - cameraY) * 0.05

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles downward based on their speed
        p.y += p.speed

        // Wrap around when particles go off screen
        if (p.y > canvas.height) {
          p.y = 0
          p.x = Math.random() * canvas.width
        }

        // Apply parallax effect based on depth
        const parallaxX = cameraX * p.z
        const parallaxY = cameraY * p.z

        // Calculate display position with parallax
        const displayX = p.x + parallaxX
        const displayY = p.y + parallaxY

        // Skip particles that are off screen
        if (
          displayX < -p.size ||
          displayX > canvas.width + p.size ||
          displayY < -p.size ||
          displayY > canvas.height + p.size
        ) {
          continue
        }

        // Draw particle with glow effect
        const glowSize = p.size * (1.5 + p.z)

        // Outer glow
        const gradient = ctx.createRadialGradient(displayX, displayY, 0, displayX, displayY, glowSize)

        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, p.color.replace(/[\d.]+\)$/, "0)"))

        ctx.beginPath()
        ctx.arc(displayX, displayY, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner core
        ctx.beginPath()
        ctx.arc(displayX, displayY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

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
