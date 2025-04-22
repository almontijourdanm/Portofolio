interface TimelineItemProps {
  year: string
  title: string
  description: string
}

export default function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8 border-l border-gray-300 dark:border-gray-700 last:border-0 last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-2"></div>
      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{year}</div>
      <div className="font-medium text-lg dark:text-white">{title}</div>
      <div className="text-gray-600 dark:text-gray-300">{description}</div>
    </div>
  )
}
