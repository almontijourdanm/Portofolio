"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen, Video, Code, Lightbulb, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimateOnScroll from "@/components/animate-on-scroll"

type Resource = {
  id: string
  title: string
  description: string
  url: string
  category: "book" | "course" | "tool" | "article" | "video"
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  isFree: boolean
}

const resourcesData: Resource[] = [
  {
    id: "1",
    title: "JavaScript: The Good Parts",
    description: "A book focusing on the best features of JavaScript, showing how to create truly effective code.",
    url: "https://example.com/js-good-parts",
    category: "book",
    tags: ["javascript", "fundamentals"],
    difficulty: "intermediate",
    isFree: false,
  },
  {
    id: "2",
    title: "freeCodeCamp JavaScript Algorithms and Data Structures",
    description: "A comprehensive course covering JavaScript fundamentals, algorithms, and data structures.",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    category: "course",
    tags: ["javascript", "algorithms", "data structures"],
    difficulty: "beginner",
    isFree: true,
  },
  {
    id: "3",
    title: "VS Code Extensions for JavaScript Developers",
    description: "A curated list of VS Code extensions that boost productivity for JavaScript developers.",
    url: "https://example.com/vscode-extensions",
    category: "article",
    tags: ["tools", "productivity", "vscode"],
    difficulty: "beginner",
    isFree: true,
  },
  {
    id: "4",
    title: "Next.js Crash Course",
    description: "A comprehensive video tutorial on building applications with Next.js.",
    url: "https://example.com/nextjs-crash-course",
    category: "video",
    tags: ["react", "nextjs", "frontend"],
    difficulty: "intermediate",
    isFree: true,
  },
  {
    id: "5",
    title: "Figma",
    description: "A collaborative interface design tool that's perfect for creating UI mockups.",
    url: "https://www.figma.com",
    category: "tool",
    tags: ["design", "ui", "collaboration"],
    difficulty: "beginner",
    isFree: true,
  },
  {
    id: "6",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "A book on writing clean, maintainable code that other developers can easily understand.",
    url: "https://example.com/clean-code",
    category: "book",
    tags: ["best practices", "code quality"],
    difficulty: "intermediate",
    isFree: false,
  },
  {
    id: "7",
    title: "MongoDB University",
    description: "Free courses on MongoDB database design, queries, and best practices.",
    url: "https://university.mongodb.com/",
    category: "course",
    tags: ["database", "mongodb", "backend"],
    difficulty: "intermediate",
    isFree: true,
  },
  {
    id: "8",
    title: "React Testing Library Tutorial",
    description: "Learn how to test your React applications effectively with React Testing Library.",
    url: "https://example.com/react-testing",
    category: "article",
    tags: ["react", "testing", "frontend"],
    difficulty: "intermediate",
    isFree: true,
  },
  {
    id: "9",
    title: "Postman",
    description: "A tool for testing APIs and creating automated API tests.",
    url: "https://www.postman.com/",
    category: "tool",
    tags: ["api", "testing", "backend"],
    difficulty: "beginner",
    isFree: true,
  },
  {
    id: "10",
    title: "Understanding TypeScript",
    description: "A comprehensive course on TypeScript from basics to advanced concepts.",
    url: "https://example.com/typescript-course",
    category: "video",
    tags: ["typescript", "javascript"],
    difficulty: "intermediate",
    isFree: false,
  },
]

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showOnlyFree, setShowOnlyFree] = useState(false)

  const categoryIcons = {
    book: <BookOpen className="h-5 w-5" />,
    course: <Code className="h-5 w-5" />,
    tool: <Lightbulb className="h-5 w-5" />,
    article: <BookOpen className="h-5 w-5" />,
    video: <Video className="h-5 w-5" />,
  }

  const filteredResources = resourcesData.filter((resource) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    // Category filter
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty

    // Free resources filter
    const matchesFree = !showOnlyFree || resource.isFree

    return matchesSearch && matchesCategory && matchesDifficulty && matchesFree
  })

  return (
    <div className="max-w-4xl mx-auto">
      <AnimateOnScroll animation="fade-up">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showOnlyFree ? "default" : "outline"}
                onClick={() => setShowOnlyFree(!showOnlyFree)}
                className="whitespace-nowrap"
              >
                {showOnlyFree ? "All Resources" : "Free Only"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="book">Books</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="tool">Tools</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="flex justify-center gap-2 mb-2">
                <Button
                  variant={selectedDifficulty === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("all")}
                >
                  All Levels
                </Button>
                <Button
                  variant={selectedDifficulty === "beginner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("beginner")}
                >
                  Beginner
                </Button>
                <Button
                  variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("intermediate")}
                >
                  Intermediate
                </Button>
                <Button
                  variant={selectedDifficulty === "advanced" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("advanced")}
                >
                  Advanced
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="book" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="course" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="tool" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="article" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
          </Tabs>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

function ResourceList({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No resources found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource, index) => (
        <ResourceCard key={resource.id} resource={resource} index={index} />
      ))}
    </div>
  )
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const categoryIcons = {
    book: <BookOpen className="h-5 w-5" />,
    course: <Code className="h-5 w-5" />,
    tool: <Lightbulb className="h-5 w-5" />,
    article: <BookOpen className="h-5 w-5" />,
    video: <Video className="h-5 w-5" />,
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400">
              {categoryIcons[resource.category as keyof typeof categoryIcons]}
            </div>
            <h3 className="font-semibold dark:text-white">{resource.title}</h3>
          </div>
          {resource.isFree && (
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded">
              Free
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{resource.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          <span className={`text-xs px-2 py-1 rounded ${difficultyColors[resource.difficulty]}`}>
            {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
          </span>
        </div>

        <div className="mt-4">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Visit Resource <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
