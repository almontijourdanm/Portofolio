"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Center,
} from "@react-three/drei"
import { AnimatedModel } from "@/components/animated-model"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThreeDDemoPage() {
  const [selectedModel, setSelectedModel] =
    useState<"trashbag" | "tripod">("tripod")

  return (
    <main className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            3D Animated Models Demo
          </h1>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setSelectedModel("trashbag")}
            variant={selectedModel === "trashbag" ? "default" : "outline"}
            size="lg"
          >
            Trashbaggius
          </Button>
          <Button
            onClick={() => setSelectedModel("tripod")}
            variant={selectedModel === "tripod" ? "default" : "outline"}
            size="lg"
          >
            Tripod War Machine
          </Button>
        </div>

        <p className="text-center mt-4 text-gray-400 text-sm">
          Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>

      {/* 3D SCENE */}
      <div className="w-full h-screen flex items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 35 }}
          dpr={[1, 2]}
          shadows
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
            />

            {/* Centered Model */}
            <Center>
              {selectedModel === "trashbag" && (
                <AnimatedModel
                  modelPath="/trashbaggius_balloonius-_free_as_freedom.glb"
                  scale={0.5}
                />
              )}

              {selectedModel === "tripod" && (
                <AnimatedModel
                  modelPath="/tripod_-_war_of_the_worlds_2005_riganimated.glb"
                  scale={0.02}
                />
              )}
            </Center>

            {/* Ground Shadow */}
            <ContactShadows
              position={[0, -3, 0]}
              opacity={0.35}
              scale={15}
              blur={2.5}
              far={4}
            />

            {/* Environment */}
            <Environment preset="sunset" />

            {/* Controls */}
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={4}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>
    </main>
  )
}
