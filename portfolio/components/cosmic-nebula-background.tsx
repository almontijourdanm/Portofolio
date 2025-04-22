"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  hue: number
  saturation: number
  lightness: number
  opacity: number
  life: number
  maxLife: number
}

export default function CosmicNebulaBackground() {
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

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 8), 150)
    const baseHue = resolvedTheme === "dark" ? 240 : 210 // Blue for dark mode, lighter blue for light mode

    // Mouse position for interaction
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 100

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(particles, canvas, baseHue)
    }

    function createParticle(particles: Particle[], canvas: HTMLCanvasElement, baseHue: number) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 5 + 1
      const speedX = (Math.random() - 0.5) * 0.3
      const speedY = (Math.random() - 0.5) * 0.3
      const hue = baseHue + Math.random() * 60 - 30
      const saturation = 80 + Math.random() * 20
      const lightness = 50 + Math.random() * 10
      const opacity = Math.random() * 0.5 + 0.2
      const maxLife = 100 + Math.random() * 150

      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        hue,
        saturation,
        lightness,
        opacity,
        life: 0,
        maxLife,
      })
    }

    // Animation loop
    const animate = () => {
      // Apply a semi-transparent overlay to create trail effect
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(10, 10, 30, 0.05)" : "rgba(240, 248, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update life
        p.life++
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          i--
          createParticle(particles, canvas, baseHue)
          continue
        }

        // Calculate life factor (0 to 1 to 0)
        const lifeFactor = p.life < p.maxLife / 2 ? p.life / (p.maxLife / 2) : (p.maxLife - p.life) / (p.maxLife / 2)

        // Mouse interaction
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRadius - distance) / mouseRadius
          p.speedX += Math.cos(angle) * force * 0.02
          p.speedY += Math.sin(angle) * force * 0.02
        }

        // Apply some gravity toward center
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        p.speedX += (centerX - p.x) * 0.00003
        p.speedY += (centerY - p.y) * 0.00003

        // Apply some randomness
        p.speedX += (Math.random() - 0.5) * 0.01
        p.speedY += (Math.random() - 0.5) * 0.01

        // Limit speed
        const maxSpeed = 0.8
        const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed
          p.speedY = (p.speedY / speed) * maxSpeed
        }

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges with some damping
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -0.8
          p.x = p.x < 0 ? 0 : canvas.width
        }

        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -0.8
          p.y = p.y < 0 ? 0 : canvas.height
        }

        // Draw particle
        const currentSize = p.size * lifeFactor
        const currentOpacity = p.opacity * lifeFactor

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2)

        gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${currentOpacity})`)
        gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2)
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

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
}
