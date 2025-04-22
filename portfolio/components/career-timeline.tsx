"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Briefcase, GraduationCap, Code, Award } from "lucide-react"
import type { ReactNode } from "react"
import AnimateOnScroll from "@/components/animate-on-scroll"

type TimelineEvent = {
  id: string
  date: string
  title: string
  description: string
  category: "education" | "work" | "project" | "certification" | "milestone"
  icon: ReactNode
  details: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "education-1",
    date: "2015-2020",
    title: "Bachelor of Industrial Engineering",
    description: "Gunadarma University, Jakarta",
    category: "education",
    icon: <GraduationCap className="h-6 w-6" />,
    details: [
      "GPA: 3.31/4.00",
      "Developed analytical and problem-solving skills",
      "Studied supply chain management and optimization",
      "Applied engineering principles to industrial processes",
    ],
  },
  {
    id: "work-1",
    date: "July 2022 - January 2024",
    title: "Sales Executive",
    description: "Proteus Mitra Logistic",
    category: "work",
    icon: <Briefcase className="h-6 w-6" />,
    details: [
      "Handled sales and operations for local and international freight forwarding",
      "Created cost-effective proposals and pricing that improved profit margins by 18%",
      "Monitored container bookings and shipment schedules, achieving a 95% dispatch accuracy rate",
      "Onboarded 25+ new clients through targeted outreach and cold calling",
      "Represented the company in logistics expos and networking events",
    ],
  },
  {
    id: "work-2",
    date: "January 2024 - March 2024",
    title: "Sales Executive",
    description: "M+R Forwarding Indonesia",
    category: "work",
    icon: <Briefcase className="h-6 w-6" />,
    details: [
      "Oversaw end-to-end logistics for domestic, export, and import cargo",
      "Developed competitive quotations and pricing strategies that helped win 10+ new clients",
      "Managed order tracking and container allocation for up to 40 monthly shipments",
      "Built long-term relationships with corporate clients, resulting in a 20% repeat business rate",
      "Conducted market analysis and presented logistics solutions",
    ],
  },
  {
    id: "work-3",
    date: "March 2024 - November 2024",
    title: "Sales Operations",
    description: "Abadimitra Andhika",
    category: "work",
    icon: <Briefcase className="h-6 w-6" />,
    details: [
      "Managed domestic, export, and import shipments across sea and land logistics",
      "Calculated quotations and pricing with accurate cost analysis, reducing pricing errors by 20%",
      "Coordinated order fulfillment and container scheduling, handling up to 50+ containers per month",
      "Acquired and maintained relationships with over 30 active B2B clients",
      "Collaborated with operations and documentation teams to streamline communication",
    ],
  },
  {
    id: "milestone-1",
    date: "November 2024",
    title: "Career Transition Decision",
    description: "From Logistics to Development",
    category: "milestone",
    icon: <Award className="h-6 w-6" />,
    details: [
      "Made the decision to transition from logistics to software development",
      "Began self-learning programming fundamentals",
      "Researched and applied to coding bootcamps",
      "Prepared for a career change into the tech industry",
    ],
  },
  {
    id: "education-2",
    date: "December 2024 - April 2025",
    title: "Full Stack JavaScript Immersive Program",
    description: "Hacktiv8, Jakarta",
    category: "education",
    icon: <GraduationCap className="h-6 w-6" />,
    details: [
      "Intensive bootcamp focused on JavaScript development",
      "Built multiple fullstack applications with React, Node.js, and databases",
      "Collaborated on team projects using Agile methodologies",
      "Developed skills in both frontend and backend technologies",
    ],
  },
  {
    id: "project-1",
    date: "March 2025",
    title: "Jolt Jordan",
    description: "Job Portal Platform",
    category: "project",
    icon: <Code className="h-6 w-6" />,
    details: [
      "Built a mobile and web-based job portal platform similar to JobStreet or LinkedIn",
      "Implemented AI-powered CV feedback, optimization, and generation",
      "Created a Telegram chatbot for personalized job alerts",
      "Tech stack: Next JS, MongoDB, GraphQL, TypeScript, Vercel",
    ],
  },
  {
    id: "project-2",
    date: "March 2025",
    title: "Qarl",
    description: "E-commerce Platform",
    category: "project",
    icon: <Code className="h-6 w-6" />,
    details: [
      "Developed an e-commerce platform for reusable drink bottles",
      "Implemented integrated product pages and cart system",
      "Created responsive design across web and mobile",
      "Tech stack: Next JS, MongoDB, GraphQL, TypeScript, Vercel",
    ],
  },
  {
    id: "project-3",
    date: "March 2025",
    title: "Sparkles",
    description: "Mobile Photo-Sharing Application",
    category: "project",
    icon: <Code className="h-6 w-6" />,
    details: [
      "Engineered a mobile photo-sharing application inspired by Instagram",
      "Implemented features like post uploads, user profiles, and real-time updates",
      "Used Redis for real-time functionality",
      "Tech stack: React Native, React, GraphQL, Apollo Server, Redis, Expo, MongoDB",
    ],
  },
  {
    id: "certification-1",
    date: "March 2025",
    title: "HackerRank Certifications",
    description: "Multiple Technical Certifications",
    category: "certification",
    icon: <Calendar className="h-6 w-6" />,
    details: [
      "Problem Solving (Basic) - Certificate ID: 1A26824dA6D5",
      "JavaScript (Basic) - Certificate ID: B6BB2341BE36",
      "CSS (Basic) - Certificate ID: DC0D7D421FF4",
      "SQL (Basic) - Certificate ID: 07179F66BF32",
      "React (Basic) - Certificate ID: 1F7D27A5F137",
    ],
  },
  {
    id: "milestone-2",
    date: "April 2025",
    title: "Career Transition Complete",
    description: "Full Stack Developer",
    category: "milestone",
    icon: <Award className="h-6 w-6" />,
    details: [
      "Successfully transitioned from logistics to development",
      "Leveraging logistics background to bring unique perspective to tech projects",
      "Focusing on creating intuitive user interfaces and solving complex problems",
      "Ready to contribute to innovative software solutions",
    ],
  },
]

export default function CareerTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const categoryColors = {
    education: "bg-purple-500 dark:bg-purple-600",
    work: "bg-blue-500 dark:bg-blue-600",
    project: "bg-green-500 dark:bg-green-600",
    certification: "bg-orange-500 dark:bg-orange-600",
    milestone: "bg-pink-500 dark:bg-pink-600",
  }

  const categoryLabels = {
    education: "Education",
    work: "Work Experience",
    project: "Project",
    certification: "Certification",
    milestone: "Milestone",
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${categoryColors[key as keyof typeof categoryColors]}`}></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2"></div>

        {/* Timeline events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <AnimateOnScroll
              key={event.id}
              animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              delay={index * 100}
              className="relative"
            >
              <div
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 transform -translate-x-1/2 z-10 flex items-center justify-center"
                  aria-label={`${event.date}: ${event.title}`}
                >
                  <div className={`w-4 h-4 rounded-full ${categoryColors[event.category]}`}></div>
                </div>

                {/* Content card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full ${categoryColors[event.category]} text-white`}>
                        {event.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{event.date}</p>
                        <h3 className="font-medium text-lg dark:text-white">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Click for details</p>
                  </motion.div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Event details modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`event-title-${selectedEvent.id}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-full ${categoryColors[selectedEvent.category]} text-white`}>
                {selectedEvent.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{selectedEvent.date}</p>
                <h3 className="font-bold text-xl dark:text-white" id={`event-title-${selectedEvent.id}`}>
                  {selectedEvent.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h4 className="font-semibold dark:text-white">Details:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedEvent.details.map((detail, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
