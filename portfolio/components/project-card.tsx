"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export type ProjectCategory = "frontend" | "backend" | "fullstack" | "mobile" | "other"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  images: string[] // Changed from imageUrl to images array
  githubUrl: string
  liveUrl: string
  category: ProjectCategory
  index?: number
}

export default function ProjectCard({
  title,
  description,
  technologies,
  images,
  githubUrl,
  liveUrl,
  category,
  index = 0,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Default to a placeholder if no images are provided
  const imageArray = images && images.length > 0 ? images : ["/placeholder.svg?height=400&width=600"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col group"
    >
      <div className="relative h-48 overflow-hidden">
        {/* Current image */}
        <Image
          src={imageArray[currentImageIndex] || "/placeholder.svg"}
          alt={`${title} - image ${currentImageIndex + 1} of ${imageArray.length}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Image navigation controls - only show if there are multiple images */}
        {imageArray.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image indicator dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {imageArray.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(i)
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === currentImageIndex ? "true" : "false"}
                />
              ))}
            </div>
          </>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="p-4 w-full">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </motion.div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <motion.div key={tech} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Badge key={tech} variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <div className="flex gap-4">
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </motion.a>
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
