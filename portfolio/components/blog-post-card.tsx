"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getCategoryName } from "@/lib/blog"
import { motion } from "framer-motion"

interface BlogPostCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  coverImage: string
  category: string
  readingTime: string
  index?: number
}

export default function BlogPostCard({
  slug,
  title,
  excerpt,
  date,
  coverImage,
  category,
  readingTime,
  index = 0,
}: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
    >
      <Link href={`/blog/${slug}`} className="block relative h-48 overflow-hidden">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {getCategoryName(category)}
          </Badge>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {date}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {readingTime}
          </div>
        </div>
        <Link href={`/blog/${slug}`} className="block mb-2">
          <h3 className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors dark:text-white">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}
