import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import BlogPostCard from "@/components/blog-post-card"
import { getAllBlogPosts } from "@/lib/blog"
import AnimateOnScroll from "@/components/animate-on-scroll"
import BlogBackground from "@/components/blog-background"

export default function BlogPage() {
  const posts = getAllBlogPosts()

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

          <h1 className="text-4xl font-bold mb-4 dark:text-white">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            Thoughts, stories and ideas about my journey from logistics to code, technical insights, and lessons learned
            along the way.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              coverImage={post.coverImage}
              category={post.category}
              readingTime={post.readingTime}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
