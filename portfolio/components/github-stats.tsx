"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, GitBranch, GitPullRequest, Star, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/animate-on-scroll"

// This would typically come from an API call to GitHub
const mockGitHubData = {
  username: "yourusername",
  avatarUrl: "/placeholder.svg?height=200&width=200",
  followers: 42,
  following: 38,
  publicRepos: 15,
  totalCommits: 527,
  totalPullRequests: 48,
  totalIssues: 32,
  starsReceived: 73,
  topLanguages: [
    { name: "JavaScript", percentage: 45, color: "#f1e05a" },
    { name: "TypeScript", percentage: 30, color: "#3178c6" },
    { name: "HTML", percentage: 15, color: "#e34c26" },
    { name: "CSS", percentage: 10, color: "#563d7c" },
  ],
  recentActivity: [
    { type: "commit", repo: "portfolio-website", message: "Add dark mode toggle", date: "2 days ago" },
    { type: "pullRequest", repo: "e-commerce-app", message: "Fix cart functionality", date: "5 days ago" },
    { type: "issue", repo: "task-manager", message: "Add filter by priority", date: "1 week ago" },
    { type: "star", repo: "react-components", message: "Starred repository", date: "2 weeks ago" },
  ],
  contributionData: [
    { month: "Jan", contributions: 32 },
    { month: "Feb", contributions: 48 },
    { month: "Mar", contributions: 40 },
    { month: "Apr", contributions: 65 },
    { month: "May", contributions: 70 },
    { month: "Jun", contributions: 55 },
    { month: "Jul", contributions: 60 },
    { month: "Aug", contributions: 75 },
    { month: "Sep", contributions: 62 },
    { month: "Oct", contributions: 45 },
    { month: "Nov", contributions: 55 },
    { month: "Dec", contributions: 50 },
  ],
}

export default function GitHubStats() {
  const [data, setData] = useState(mockGitHubData)
  const [isLoading, setIsLoading] = useState(false)

  // In a real implementation, you would fetch data from GitHub API
  // useEffect(() => {
  //   const fetchGitHubData = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch('/api/github-stats')
  //       const data = await response.json()
  //       setData(data)
  //     } catch (error) {
  //       console.error('Error fetching GitHub data:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //
  //   fetchGitHubData()
  // }, [])

  const activityIcons = {
    commit: <Code className="h-4 w-4" />,
    pullRequest: <GitPullRequest className="h-4 w-4" />,
    issue: <GitBranch className="h-4 w-4" />,
    star: <Star className="h-4 w-4" />,
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimateOnScroll animation="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Profile Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img src={data.avatarUrl || "/placeholder.svg"} alt={data.username} className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-lg dark:text-white">{data.username}</h3>
                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 flex items-center gap-1 text-sm"
                >
                  <Github className="h-4 w-4" /> View Profile
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold dark:text-white">{data.followers}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">{data.publicRepos}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Repositories</p>
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">{data.totalCommits}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Commits</p>
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">{data.starsReceived}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Stars</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Top Languages</h3>
            <div className="space-y-4">
              {data.topLanguages.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium dark:text-white">{lang.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Contribution Graph */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Contribution Activity</h3>
            <div className="h-60 flex items-end justify-between">
              {data.contributionData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center">
                  <motion.div
                    className="w-6 bg-blue-500 dark:bg-blue-600 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${(month.contributions / 80) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Recent Activity</h3>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {activityIcons[activity.type as keyof typeof activityIcons]}
                  </div>
                  <div>
                    <p className="text-sm dark:text-white">
                      <span className="font-medium">{activity.repo}</span>: {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={300}>
        <div className="mt-6 text-center">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => window.open(`https://github.com/${data.username}`, "_blank")}
          >
            <Github className="h-5 w-5" /> View GitHub Profile
          </Button>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
