import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogPost, getCategoryName } from "@/lib/blog"
import Markdown from "react-markdown"
import BlogBackground from "@/components/blog-background"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: `${post.title} | Almonti Jourdan Manuputty`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 relative">
      <BlogBackground />
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {getCategoryName(post.category)}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readingTime}
            </div>
          </div>
        </div>

        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Share this post</h3>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Facebook
            </Button>
          </div>
        </div>
      </article>
    </main>
  )
}
