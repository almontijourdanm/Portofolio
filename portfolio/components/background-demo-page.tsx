"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ArrowLeft, ArrowRight } from "lucide-react"
import CosmicNebulaBackground from "@/components/cosmic-nebula-background"
import GeometricConstellationBackground from "@/components/geometric-constellation-background"
import FlowingWaveBackground from "@/components/flowing-wave-background"
import DepthParticlesBackground from "@/components/depth-particles-background"
import DigitalCircuitBackground from "@/components/digital-circuit-background"

type BackgroundType =
  | "cosmic-nebula"
  | "geometric-constellation"
  | "flowing-wave"
  | "depth-particles"
  | "digital-circuit"

export default function BackgroundDemoPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>("cosmic-nebula")
  const [showInfo, setShowInfo] = useState(true)

  const backgrounds = [
    {
      id: "cosmic-nebula",
      name: "Cosmic Nebula",
      description: "A dreamy, cosmic nebula effect with glowing particles that move in fluid patterns.",
      features: [
        "Glowing particles with varying sizes and opacities",
        "Fluid, organic movement patterns",
        "Gentle attraction to mouse cursor",
        "Subtle gravitational pull toward center",
        "Particles fade in and out over time",
      ],
    },
    {
      id: "geometric-constellation",
      name: "Geometric Constellation",
      description: "A network of connected particles that form constellation-like patterns.",
      features: [
        "Node-based network with dynamic connections",
        "Subtle node movement and interaction",
        "Lines connect nearby nodes with distance-based opacity",
        "Interactive mouse area affects nearby nodes",
        "Gradient background enhances the space-like feel",
      ],
    },
    {
      id: "flowing-wave",
      name: "Flowing Wave",
      description: "A mesmerizing wave-like pattern with flowing particles.",
      features: [
        "Particles flow along dynamic wave patterns",
        "Vertical wave motion adds dimension",
        "Mouse interaction creates ripple effects",
        "Particles leave subtle trails as they move",
        "Speed varies based on position in the flow field",
      ],
    },
    {
      id: "depth-particles",
      name: "3D Depth Particles",
      description: "A 3D-like effect with particles moving at different depths.",
      features: [
        "Particles at varying depths (z-index)",
        "Closer particles appear larger and move faster",
        "Parallax effect based on mouse position",
        "Color and opacity vary by depth",
        "Creates illusion of moving through space",
      ],
    },
    {
      id: "digital-circuit",
      name: "Digital Circuit",
      description: "A tech-inspired background that resembles a digital circuit.",
      features: [
        "Grid-based node network with connections",
        "Pulses travel along connection paths",
        "Nodes pulse with subtle animation",
        "Branching paths simulate data flow",
        "Tech-inspired aesthetic perfect for development portfolios",
      ],
    },
  ]

  const currentBackgroundInfo = backgrounds.find((bg) => bg.id === currentBackground)

  const nextBackground = () => {
    const currentIndex = backgrounds.findIndex((bg) => bg.id === currentBackground)
    const nextIndex = (currentIndex + 1) % backgrounds.length
    setCurrentBackground(backgrounds[nextIndex].id as BackgroundType)
  }

  const prevBackground = () => {
    const currentIndex = backgrounds.findIndex((bg) => bg.id === currentBackground)
    const prevIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length
    setCurrentBackground(backgrounds[prevIndex].id as BackgroundType)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Render the selected background */}
      {currentBackground === "cosmic-nebula" && <CosmicNebulaBackground />}
      {currentBackground === "geometric-constellation" && <GeometricConstellationBackground />}
      {currentBackground === "flowing-wave" && <FlowingWaveBackground />}
      {currentBackground === "depth-particles" && <DepthParticlesBackground />}
      {currentBackground === "digital-circuit" && <DigitalCircuitBackground />}

      {/* Content */}
      <div className="z-10 text-center p-4 md:p-8 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{currentBackgroundInfo?.name} Background</h1>

        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg mb-6">
          <p className="text-lg mb-6">
            {currentBackgroundInfo?.description} Move your mouse around to interact with the elements!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Dark Mode
                </>
              )}
            </Button>

            <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? "Hide" : "Show"} Details
            </Button>
          </div>
        </div>

        {/* Background navigation */}
        <div className="flex items-center justify-between bg-white/20 dark:bg-black/20 backdrop-blur-lg p-4 rounded-xl shadow-lg mb-6">
          <Button onClick={prevBackground} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>

          <div className="text-sm md:text-base font-medium">
            {backgrounds.findIndex((bg) => bg.id === currentBackground) + 1} of {backgrounds.length}
          </div>

          <Button onClick={nextBackground} variant="outline" className="flex items-center gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {showInfo && (
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg text-left">
            <h2 className="text-xl font-semibold mb-4">Key Features:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {currentBackgroundInfo?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
