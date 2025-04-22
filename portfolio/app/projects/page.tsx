"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProjectCard, { type ProjectCategory } from "@/components/project-card"
import ProjectsBackground from "@/components/projects-background"
import { Badge } from "@/components/ui/badge"

// Project data based exactly on CV
const projects = [
  {
    title: "Jolt Jordan",
    description:
      "A mobile and web-based job portal platform similar to JobStreet or LinkedIn, featuring AI-powered CV feedback, optimization, generation, and Telegram chatbot for personalized job alerts.",
    technologies: ["Next.js", "MongoDB", "GraphQL", "TypeScript", "Vercel"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600&text=Jolt+Screenshot+2",
      "/placeholder.svg?height=400&width=600&text=Jolt+Screenshot+3",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Qarl",
    description: "An e-commerce platform for reusable drink bottles with integrated product pages and cart system.",
    technologies: ["React", "Express", "MongoDB", "Node.js", "Tailwind CSS"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Qarl+Screenshot+2"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Snapflex",
    description: "A mobile photo-sharing application inspired by Instagram with real-time updates.",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600&text=Snapflex+Screenshot+2",
      "/placeholder.svg?height=400&width=600&text=Snapflex+Screenshot+3",
      "/placeholder.svg?height=400&width=600&text=Snapflex+Screenshot+4",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "mobile" as ProjectCategory,
  },
  {
    title: "Queezy",
    description: "A web-based word game with dynamically generated questions powered by Gemini AI.",
    technologies: ["Vue.js", "Firebase", "Gemini AI API", "Tailwind CSS"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Queezy+Screenshot+2"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Flex",
    description: "A fitness-focused application that fetched and displayed exercises from an API.",
    technologies: ["React", "Material UI", "ExerciseDB API", "Axios"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600&text=Flex+Screenshot+2",
      "/placeholder.svg?height=400&width=600&text=Flex+Screenshot+3",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "fullstack" as ProjectCategory,
  },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all")

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const categories: { value: ProjectCategory | "all"; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "mobile", label: "Mobile" },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 relative">
      <ProjectsBackground />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 dark:text-white">My Projects</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of projects from my bootcamp experience and personal development journey.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Badge
              key={category.value}
              variant={activeFilter === category.value ? "default" : "outline"}
              className={`px-4 py-2 text-sm cursor-pointer ${
                activeFilter === category.value
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveFilter(category.value)}
            >
              {category.label}
            </Badge>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              images={project.images}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              category={project.category}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found with the selected filter.</p>
          </div>
        )}
      </div>
    </main>
  )
}
