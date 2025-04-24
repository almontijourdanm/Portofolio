"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, ArrowRight, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import TimelineItem from "@/components/timeline-item"
import ContactForm from "@/components/contact-form"
import Navbar from "@/components/navbar"
import AnimateOnScroll from "@/components/animate-on-scroll"
import BlogSection from "@/components/blog-section"
import HeroBackground from "@/components/hero-background"
import ParticlesBackground from "@/components/particles-background"
import TypingEffect from "@/components/typing-effect"
import FloatingElement from "@/components/floating-element"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 overflow-hidden">
        <HeroBackground />
        <ParticlesBackground />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white">
              Hi, I'm <span className="text-gradient">Almonti Jourdan</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mt-2 text-gray-700 dark:text-gray-300">
              <TypingEffect
                texts={["Full Stack Developer", "JavaScript Enthusiast", "React Specialist", "UI/UX Lover"]}
                typingSpeed={80}
              />
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg">
              A logistics professional turned developer with a passion for building web applications. I bring a unique
              perspective from my background in freight forwarding and industrial engineering.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="gap-2 relative overflow-hidden group"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <ArrowRight className="h-4 w-4 relative z-10" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Me <Mail className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open("/CV - Almonti Jourdan Manuputty 2025.pdf", "_blank")}
                >
                  Resume <FileText className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <div className="mt-8 flex gap-4">
              <motion.a
                href="https://github.com/almontijourdanm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/almonti-manuputty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
              </motion.a>
              <motion.a
                href="mailto:almontimanuputty@gmail.com"
                aria-label="Email"
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
              </motion.a>
              <motion.a
                href="/CV - Almonti Jourdan Manuputty 2025.pdf"
                download
                aria-label="Download Resume"
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Download className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
              </motion.a>
            </div>
          </motion.div>
          <FloatingElement yOffset={15} duration={5}>
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 z-10 rounded-lg"></div>
              <Image
                src="/Almonti.svg?height=600&width=600"
                alt="Almonti Jourdan Manuputty"
                fill
                className="object-cover"
                priority
              />

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
            </motion.div>
          </FloatingElement>
        </div>

        {/* Scroll indicator - Fixed version */}
        <div className="absolute bottom-2 w-full flex justify-center">
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500 dark:text-gray-400"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">My Journey</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll animation="fade-right" delay={200}>
              <div>
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">From Logistics to Code</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  After years in freight forwarding and logistics, I discovered my passion for creating digital
                  solutions. This led me to take a bold step and join Hacktiv8's immersive coding bootcamp from December
                  2024 to April 2025.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My background in logistics and industrial engineering has equipped me with valuable skills that
                  translate well to development: problem-solving under pressure, attention to detail, and the ability to
                  communicate complex concepts clearly.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  I'm particularly passionate about creating intuitive user interfaces and solving challenging problems
                  with clean, efficient code.
                </p>

                <div className="mt-6">
                  <Button variant="outline" className="gap-2" onClick={() => window.open("/journey", "_self")}>
                    View My Full Journey <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={400}>
              <div className="space-y-6">
                <TimelineItem
                  year="2024-2025"
                  title="Hacktiv8 Coding Bootcamp"
                  description="Full Stack JavaScript Immersive Program"
                />
                <TimelineItem year="2024" title="Sales Operations" description="Abadimitra Andhika" />
                <TimelineItem year="2024" title="Sales Executive" description="M+R Forwarding Indonesia" />
                <TimelineItem year="2022-2024" title="Sales Executive" description="Proteus Mitra Logistic" />
                <TimelineItem
                  year="2015-2020"
                  title="Bachelor's Degree"
                  description="Industrial Engineering, Gunadarma University"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Technical Skills</h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll animation="zoom-in" delay={100}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="React" />
                  <SkillBadge name="Next.js" />
                  <SkillBadge name="React Native" />
                  <SkillBadge name="JavaScript" />
                  <SkillBadge name="TypeScript" />
                  <SkillBadge name="HTML/CSS" />
                  <SkillBadge name="Vite" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="zoom-in" delay={200}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Node.js" />
                  <SkillBadge name="Express" />
                  <SkillBadge name="GraphQL" />
                  <SkillBadge name="Apollo Server" />
                  <SkillBadge name="REST API" />
                  <SkillBadge name="Sequelize" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="zoom-in" delay={300}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Database</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="PostgreSQL" />
                  <SkillBadge name="MongoDB" />
                  <SkillBadge name="Redis" />
                  <SkillBadge name="Mongoose" />
                  <SkillBadge name="Sequelize" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="zoom-in" delay={400}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Tools & Others</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Git" />
                  <SkillBadge name="GitHub" />
                  <SkillBadge name="VS Code" />
                  <SkillBadge name="Expo" />
                  <SkillBadge name="Vercel" />
                  <SkillBadge name="Apollo Client" />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Featured Projects</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Jolt Jordan"
              description="A mobile and web-based job portal platform with AI-powered CV feedback, optimization, generation, and Telegram chatbot for personalized job alerts."
              technologies={["Next.js", "MongoDB", "GraphQL", "TypeScript", "Vercel"]}
              images={["/Jolt Jordan SS.svg?height=400&width=600"]}
              githubUrl="https://github.com/almontijourdanm/Jolt-jordan"
              liveUrl="https://jolt.timmytech.fun/"
              category="fullstack"
              index={0}
            />
            <ProjectCard
              title="Qarl"
              description="An e-commerce platform for reusable drink bottles with integrated product pages, cart system, and responsive design across web and mobile."
              technologies={["Next.js", "MongoDB", "GraphQL", "TypeScript", "Vercel"]}
              images={["/Qarl SS.svg?height=400&width=600"]}
              githubUrl="https://github.com/almontijourdanm/Qarl"
              liveUrl="https://qarl.almontijourdanm.com/"
              category="fullstack"
              index={1}
            />
            <ProjectCard
              title="Sparkles"
              description="A mobile photo-sharing application inspired by Instagram, with features like post uploads, user profiles, and real-time updates using Redis."
              technologies={["React Native", "GraphQL", "Apollo", "Redis", "Expo", "MongoDB"]}
              images={["/Sparkles SS.svg?height=400&width=600"]}
              githubUrl="https://github.com/almontijourdanm/Sparkles"
              liveUrl="https://example.com"
              category="mobile"
              index={2}
            />
          </div>

          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="gap-2" onClick={() => window.open("/projects", "_self")}>
                View All Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Get In Touch</h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="zoom-in" delay={200}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <ContactForm />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Almonti Jourdan Manuputty</p>
            <p className="text-gray-400">Full Stack Developer</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/almontijourdanm" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="https://linkedin.com/in/almonti-manuputty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="mailto:almontimanuputty@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="/CV - Almonti Jourdan Manuputty 2025.pdf" download aria-label="Download Resume">
              <Download className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </footer>
    </main>
  )
}
