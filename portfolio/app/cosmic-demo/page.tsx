"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import CosmicNebulaBackground from "@/components/cosmic-nebula-background"

export default function CosmicDemo() {
  const { resolvedTheme, setTheme } = useTheme()
  const [showInfo, setShowInfo] = useState(true)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Include the Cosmic Nebula Background */}
      <CosmicNebulaBackground />

      {/* Content */}
      <div className="z-10 text-center p-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Cosmic Nebula Background</h1>

        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <p className="text-lg mb-6">
            This dreamy, cosmic nebula effect creates glowing particles that move in fluid patterns. Move your mouse
            around to interact with the particles!
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Switch to Dark Mode
                </>
              )}
            </Button>

            <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? "Hide" : "Show"} Information
            </Button>
          </div>
        </div>

        {showInfo && (
          <div className="mt-8 bg-white/20 dark:bg-black/20 backdrop-blur-lg p-6 rounded-xl shadow-lg text-left">
            <h2 className="text-xl font-semibold mb-4">How It Works:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Uses HTML Canvas for high-performance particle rendering</li>
              <li>Creates glowing particles with varying sizes, colors, and opacities</li>
              <li>Particles respond to mouse movement with gentle attraction</li>
              <li>Subtle gravitational pull toward the center creates flowing patterns</li>
              <li>Particles have a lifecycle, fading in and out over time</li>
              <li>Adapts colors based on light/dark theme</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
