"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, GitBranch, GitPullRequest, Star, Code, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/animate-on-scroll"

// Fallback data in case API fails
const fallbackGitHubData = {
  username: "almontijourdanm",
  avatarUrl: "https://github.com/almontijourdanm.png",
  followers: 1,
  following: 7,
  publicRepos: 6,
  totalCommits: 1417,
  totalPullRequests: 48,
  totalIssues: 32,
  starsReceived: 0,
  topLanguages: [
    { name: "TypeScript", percentage: 40, color: "#3178c6" },
    { name: "JavaScript", percentage: 35, color: "#f1e05a" },
    { name: "HTML", percentage: 15, color: "#e34c26" },
    { name: "CSS", percentage: 10, color: "#563d7c" },
  ],
  recentActivity: [
    { type: "commit", repo: "Portofolio", message: "Update portfolio with new features", date: "2 days ago" },
    { type: "commit", repo: "Jolt-jordan", message: "Job portal with AI CV generator", date: "5 days ago" },
    { type: "commit", repo: "Queezy", message: "AI-generated word quiz game", date: "1 week ago" },
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
  const [data, setData] = useState(fallbackGitHubData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/github-stats')
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data')
        }
        const fetchedData = await response.json()
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setError('Using cached data')
        // Keep fallback data
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const activityIcons = {
    commit: <Code className="h-4 w-4" />,
    pullRequest: <GitPullRequest className="h-4 w-4" />,
    issue: <GitBranch className="h-4 w-4" />,
    star: <Star className="h-4 w-4" />,
  }

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading GitHub data...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded mb-6">
          <p className="text-sm">{error} - Displaying last known data</p>
        </div>
      )}
      
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
            <div className="h-48 flex items-end justify-between gap-1 px-2">
              {data.contributionData && data.contributionData.length > 0 ? (
                data.contributionData.map((month, index) => {
                  const maxContributions = Math.max(...data.contributionData.map(m => m.contributions))
                  const heightPixels = Math.max((month.contributions / maxContributions) * 160, 8)
                  
                  return (
                    <div key={month.month} className="flex-1 flex flex-col items-center justify-end gap-1">
                      <motion.div
                        className="w-full bg-blue-500 dark:bg-blue-600 rounded-t min-h-[8px]"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPixels}px` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        title={`${month.month}: ${month.contributions} contributions`}
                      >
                        <div className="text-xs text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                          {month.contributions}
                        </div>
                      </motion.div>
                      <span className="text-[10px] text-gray-600 dark:text-gray-400">{month.month}</span>
                    </div>
                  )
                })
              ) : (
                <div className="w-full text-center text-gray-500 dark:text-gray-400">
                  No contribution data available
                </div>
              )}
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
