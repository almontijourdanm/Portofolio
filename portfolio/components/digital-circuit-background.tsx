"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  connections: number[]
  size: number
  pulses: { progress: number; target: number }[]
  isFixed: boolean
}

export default function DigitalCircuitBackground() {
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

    // Create grid of nodes
    const gridSpacing = 100
    const jitter = 20 // Random offset for nodes
    const cols = Math.ceil(canvas.width / gridSpacing) + 1
    const rows = Math.ceil(canvas.height / gridSpacing) + 1

    const nodes: Node[] = []

    // Create nodes in a grid pattern with some randomness
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const isFixed = x === 0 || y === 0 || x === cols - 1 || y === rows - 1

        nodes.push({
          x: x * gridSpacing + (isFixed ? 0 : (Math.random() - 0.5) * jitter * 2),
          y: y * gridSpacing + (isFixed ? 0 : (Math.random() - 0.5) * jitter * 2),
          connections: [],
          size: Math.random() * 2 + 1,
          pulses: [],
          isFixed,
        })
      }
    }

    // Connect nodes to create a circuit-like pattern
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      // Find closest nodes
      const distances: { index: number; distance: number }[] = []

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue

        const otherNode = nodes[j]
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < gridSpacing * 1.5) {
          distances.push({ index: j, distance })
        }
      }

      // Sort by distance and connect to closest nodes
      distances.sort((a, b) => a.distance - b.distance)

      // Connect to 1-3 closest nodes
      const connectCount = Math.floor(Math.random() * 2) + 1
      for (let c = 0; c < Math.min(connectCount, distances.length); c++) {
        node.connections.push(distances[c].index)
      }
    }

    // Colors based on theme
    const lineColor = resolvedTheme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(37, 99, 235, 0.2)"

    const pulseColor = resolvedTheme === "dark" ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.6)"

    const nodeColor = resolvedTheme === "dark" ? "rgba(147, 197, 253, 0.8)" : "rgba(96, 165, 250, 0.6)"

    // Animation variables
    let time = 0

    // Periodically send pulses through the network
    const sendPulse = () => {
      // Find a random edge node to start the pulse
      const edgeNodes = nodes.filter((node) => node.isFixed)
      const startNode = edgeNodes[Math.floor(Math.random() * edgeNodes.length)]

      // Find a random connection to send pulse to
      if (startNode.connections.length > 0) {
        const targetIndex = startNode.connections[Math.floor(Math.random() * startNode.connections.length)]
        startNode.pulses.push({ progress: 0, target: targetIndex })
      }

      // Schedule next pulse
      setTimeout(sendPulse, Math.random() * 1000 + 500)
    }

    // Start sending pulses
    sendPulse()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        for (const connectionIndex of node.connections) {
          const targetNode = nodes[connectionIndex]

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = lineColor
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Update and draw pulses
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        for (let p = 0; p < node.pulses.length; p++) {
          const pulse = node.pulses[p]

          // Update pulse progress
          pulse.progress += 0.02

          if (pulse.progress >= 1) {
            // Pulse reached target, remove it and possibly create new pulses
            const targetNode = nodes[pulse.target]

            // Chance to continue the pulse to other connections
            if (Math.random() < 0.7 && targetNode.connections.length > 0) {
              const nextTargets = [...targetNode.connections]
              // Randomly select 1-2 connections to pulse to
              const pulseCount = Math.floor(Math.random() * 2) + 1

              for (let c = 0; c < Math.min(pulseCount, nextTargets.length); c++) {
                const nextTarget = nextTargets[Math.floor(Math.random() * nextTargets.length)]
                targetNode.pulses.push({ progress: 0, target: nextTarget })

                // Remove this target so we don't select it again
                nextTargets.splice(nextTargets.indexOf(nextTarget), 1)
              }
            }

            // Remove the pulse
            node.pulses.splice(p, 1)
            p--
            continue
          }

          // Draw the pulse
          const targetNode = nodes[pulse.target]

          const x = node.x + (targetNode.x - node.x) * pulse.progress
          const y = node.y + (targetNode.y - node.y) * pulse.progress

          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = pulseColor
          ctx.fill()
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Pulsing effect for nodes
        const pulseScale = 1 + Math.sin(time * 3 + i * 0.2) * 0.2

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  if (!mounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}
