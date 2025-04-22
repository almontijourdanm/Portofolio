"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimateOnScroll from "@/components/animate-on-scroll"

type SkillLevel = {
  name: string
  level: number // 0-100
  color: string
}

type SkillCategory = {
  name: string
  skills: SkillLevel[]
}

const skillsData: SkillCategory[] = [
  {
    name: "frontend",
    skills: [
      { name: "React", level: 85, color: "#61DAFB" },
      { name: "Next.js", level: 80, color: "#000000" },
      { name: "TypeScript", level: 75, color: "#3178C6" },
      { name: "Tailwind CSS", level: 90, color: "#06B6D4" },
      { name: "HTML/CSS", level: 95, color: "#E34F26" },
      { name: "JavaScript", level: 85, color: "#F7DF1E" },
    ],
  },
  {
    name: "backend",
    skills: [
      { name: "Node.js", level: 80, color: "#339933" },
      { name: "Express", level: 75, color: "#000000" },
      { name: "RESTful APIs", level: 85, color: "#FF6C37" },
      { name: "GraphQL", level: 65, color: "#E10098" },
      { name: "Authentication", level: 70, color: "#4285F4" },
    ],
  },
  {
    name: "database",
    skills: [
      { name: "PostgreSQL", level: 75, color: "#336791" },
      { name: "MongoDB", level: 80, color: "#47A248" },
      { name: "Mongoose", level: 75, color: "#880000" },
      { name: "Sequelize", level: 70, color: "#52B0E7" },
    ],
  },
  {
    name: "tools",
    skills: [
      { name: "Git", level: 85, color: "#F05032" },
      { name: "GitHub", level: 90, color: "#181717" },
      { name: "VS Code", level: 95, color: "#007ACC" },
      { name: "Jest", level: 70, color: "#C21325" },
      { name: "Agile", level: 80, color: "#0052CC" },
      { name: "Figma", level: 65, color: "#F24E1E" },
    ],
  },
]

export default function SkillsDashboard() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {skillsData.map((category) => (
          <TabsContent key={category.name} value={category.name} className="space-y-6">
            {category.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimateOnScroll animation="fade-right">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Learning Journey</h3>
            <p className="text-gray-700 dark:text-gray-300">
              My transition from logistics to development has been a continuous learning process. I'm currently focusing
              on deepening my knowledge of{" "}
              {activeCategory === "frontend"
                ? "React and Next.js"
                : activeCategory === "backend"
                  ? "Node.js and API design"
                  : activeCategory === "database"
                    ? "database optimization"
                    : "CI/CD and testing"}
              .
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-left" delay={200}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Transferable Skills</h3>
            <p className="text-gray-700 dark:text-gray-300">
              My background in logistics has equipped me with valuable skills that complement my technical abilities:
              problem-solving under pressure, attention to detail, and clear communication of complex concepts.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
