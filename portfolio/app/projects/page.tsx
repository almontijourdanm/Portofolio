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
      "/JoltJordan1.svg?height=400&width=600",
      "/JoltJordan2.svg?height=400&width=600&text=Jolt+Screenshot+2",
      "/JoltJordan3.svg?height=400&width=600&text=Jolt+Screenshot+3",
      "/JoltJordan4.svg?height=400&width=600&text=Jolt+Screenshot+4",
      "/JoltJordan5.svg?height=400&width=600&text=Jolt+Screenshot+5",
      "/JoltJordan6.svg?height=400&width=600&text=Jolt+Screenshot+6",
      "/JoltJordan7.svg?height=400&width=600&text=Jolt+Screenshot+7",
      "/JoltJordan8.svg?height=400&width=600&text=Jolt+Screenshot+8",
      "/JoltJordan9.svg?height=400&width=600&text=Jolt+Screenshot+9",
      "/JoltJordan10.svg?height=400&width=600&text=Jolt+Screenshot+10",
      "/JoltJordan11.svg?height=400&width=600&text=Jolt+Screenshot+11",
      "/JoltJordan12.svg?height=400&width=600&text=Jolt+Screenshot+12",
      "/JoltJordan13.svg?height=400&width=600&text=Jolt+Screenshot+13",
    ],
    githubUrl: "https://github.com/almontijourdanm/Jolt-jordan",
    liveUrl: "https://jolt.timmytech.fun/",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Qarl",
    description: "An e-commerce platform for reusable drink bottles with integrated product pages and cart system.",
    technologies: ["React", "Express", "MongoDB", "Node.js", "Tailwind CSS"],
    images: [
      "/Qarl1.svg?height=400&width=600", 
      "/Qarl2.svg?height=400&width=600&text=Qarl+Screenshot+2", 
      "/Qarl3.svg?height=400&width=600&text=Qarl+Screenshot+3",
      "/Qarl4.svg?height=400&width=600&text=Qarl+Screenshot+4",
      "/Qarl5.svg?height=400&width=600&text=Qarl+Screenshot+5",
      "/Qarl6.svg?height=400&width=600&text=Qarl+Screenshot+6",
      "/Qarl7.svg?height=400&width=600&text=Qarl+Screenshot+7",
      "/Qarl8.svg?height=400&width=600&text=Qarl+Screenshot+8"],
    githubUrl: "https://github.com/almontijourdanm/Qarl",
    liveUrl: "https://qarl.almontijourdanm.com/",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Sparkles",
    description: "A mobile photo-sharing application inspired by Instagram with real-time updates.",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    images: [
      "/Sparkles1.svg?height=400&width=600",
      "/Sparkles2.svg?height=400&width=600&text=Snapflex+Screenshot+2",
      "/Sparkles3.svg?height=400&width=600&text=Snapflex+Screenshot+3",
      "/Sparkles4.svg?height=400&width=600&text=Snapflex+Screenshot+4",
    ],
    githubUrl: "https://github.com/almontijourdanm/Sparkles",
    liveUrl: "https://example.com",
    category: "mobile" as ProjectCategory,
  },
  {
    title: "Queezy",
    description: "A web-based word game with dynamically generated questions powered by Gemini AI.",
    technologies: ["Vue.js", "Firebase", "Gemini AI API", "Tailwind CSS"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Queezy+Screenshot+2"],
    githubUrl: "https://github.com/almontijourdanm/Queezy",
    liveUrl: "https://example.com",
    category: "fullstack" as ProjectCategory,
  },
  {
    title: "Flex",
    description: "A fitness-focused application that fetched and displayed exercises from an API.",
    technologies: ["React", "Material UI", "ExerciseDB API", "Axios"],
    images: [
      "/Flex1.svg?height=400&width=600",
      "/Flex2.svg?height=400&width=600&text=Flex+Screenshot+2",
      "/Flex3.svg?height=400&width=600&text=Flex+Screenshot+3",
    ],
    githubUrl: "https://github.com/almontijourdanm/ip-almontijourdanm-Flex",
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
