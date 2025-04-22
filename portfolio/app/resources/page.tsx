import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Resources from "@/components/resources"
import AnimateOnScroll from "@/components/animate-on-scroll"
import BlogBackground from "@/components/blog-background"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 relative">
      <BlogBackground />
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll animation="fade-down">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-4 dark:text-white">Learning Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            A curated collection of resources that helped me transition from logistics to development. These books,
            courses, tools, and articles were instrumental in my learning journey.
          </p>
        </AnimateOnScroll>

        <Resources />
      </div>
    </main>
  )
}
