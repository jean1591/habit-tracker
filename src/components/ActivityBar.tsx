'use client'

import { Activity } from '@/types/metrics'

interface ActivityBarProps {
  activities: Activity[]
  type: string
  days: number // Number of days to display
}

export default function ActivityBar({
  activities,
  type,
  days,
}: ActivityBarProps) {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  const hasActivity = (date: string) => {
    return activities.some(
      (a) => a.type === type && a.date.split('T')[0] === date
    )
  }

  return (
    <div className="w-full space-y-4">
      <p className="text-sm font-medium">
        {type.replaceAll('_', ' ').toUpperCase()}
      </p>
      <div className="flex rounded border">
        {dates.map((date) => (
          <div
            key={date}
            className={`h-6 w-6 ${hasActivity(date) ? 'bg-pink-700' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
