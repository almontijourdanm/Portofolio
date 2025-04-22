"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BlogPostCard from "@/components/blog-post-card"
import { getAllBlogPosts } from "@/lib/blog"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function BlogSection() {
  // Get the 3 most recent blog posts
  const recentPosts = getAllBlogPosts().slice(0, 3)

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold dark:text-white">Latest Blog Posts</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thoughts, stories and ideas about my journey from logistics to code, technical insights, and lessons
              learned along the way.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
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

        <AnimateOnScroll animation="fade-up" delay={300}>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="gap-2" onClick={() => window.open("/blog", "_self")}>
              View All Posts <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
