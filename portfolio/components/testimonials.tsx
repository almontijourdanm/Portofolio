"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/animate-on-scroll"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Instructor",
    company: "Hacktiv8 Bootcamp",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "One of the most dedicated students I've had. Their background in logistics gave them a unique perspective on problem-solving that translated exceptionally well to coding challenges.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "Tech Mentors Network",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "I mentored them during their transition into tech. Their ability to grasp complex concepts quickly and apply them practically stood out. Their attention to detail from their logistics background is evident in their clean, well-structured code.",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Project Manager",
    company: "Logistics Solutions Inc.",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "We worked together on implementing a tracking system for our logistics operations. Their unique combination of industry knowledge and technical skills made the project a success. They truly understand both worlds.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <AnimateOnScroll animation="fade-up">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -top-12 left-0 text-blue-500 dark:text-blue-400 opacity-20">
          <Quote size={80} />
        </div>

        <div className="relative z-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonials[currentIndex].quote}"</p>
                  <div>
                    <h4 className="font-semibold dark:text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
