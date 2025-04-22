import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CosmicNebulaBackground from "@/components/cosmic-nebula-background"
// Or import any of the other background components:
// import GeometricConstellationBackground from "@/components/geometric-constellation-background"
// import FlowingWaveBackground from "@/components/flowing-wave-background"
// import DepthParticlesBackground from "@/components/depth-particles-background"
// import DigitalCircuitBackground from "@/components/digital-circuit-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Almonti Jourdan Manuputty | Full Stack Developer",
  description:
    "Portfolio of Almonti Jourdan Manuputty, a Full Stack Developer specializing in JavaScript, React, and Node.js",
    generator: 'v0.dev',
    icons: {
      icon: '/AJM-Creative-Logo.svg'
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Add your chosen background component */}
          <CosmicNebulaBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
