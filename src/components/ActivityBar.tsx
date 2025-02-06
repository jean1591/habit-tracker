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
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(today.getDate() - (days - 1 - i))
    return date.toISOString().split('T')[0]
  })

  const hasActivity = (date: string) => {
    return activities.some(
      (a) => a.type === type && a.date.split('T')[0] === date
    )
  }

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium">{type}</div>
      <div className="flex rounded border">
        {dates.map((date) => (
          <div
            key={date}
            className={`h-6 w-6 ${hasActivity(date) ? 'bg-blue-500' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
