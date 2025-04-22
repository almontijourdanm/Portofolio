import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CareerTimeline from "@/components/career-timeline"
import AnimateOnScroll from "@/components/animate-on-scroll"
import JourneyBackground from "@/components/journey-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Career Journey | Almonti Jourdan Manuputty",
  description:
    "Explore my transition from logistics to fullstack development through key milestones, education, and projects.",
}

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 relative">
      <JourneyBackground />
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll animation="fade-down">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-4 dark:text-white">My Career Journey</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            From logistics professional to fullstack developer - explore the key milestones, education, and projects
            that shaped my transition into tech.
          </p>
        </AnimateOnScroll>

        <CareerTimeline />
      </div>
    </main>
  )
}
