'use client'

import { Activity, ActivityType } from '@/types/metrics'

import toast from 'react-hot-toast'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface ActivityBarProps {
  activities: Activity[]
  type: ActivityType
  days: number
  showDates?: boolean
}

export default function ActivityBar({
  activities,
  type,
  days,
  showDates = false,
}: ActivityBarProps) {
  const router = useRouter()
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 2)
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

  const toggleActivity = useCallback(
    async (date: string) => {
      try {
        const res = await fetch('/api/activities/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, type }),
        })

        if (!res.ok) throw new Error()

        router.refresh()
      } catch (error) {
        toast.error('Failed to toggle activity')
      }
    },
    [type, router]
  )

  return (
    <div className="w-full space-y-2">
      <p className="text-sm font-medium">
        {type.replaceAll('_', ' ').toUpperCase()}
      </p>

      <div className="flex w-full rounded border">
        {dates.map((date) => (
          <div
            key={date}
            className={`h-6 flex-1 cursor-pointer transition-colors hover:bg-pink-200 ${
              hasActivity(date) ? 'bg-pink-700' : ''
            }`}
            onClick={() => toggleActivity(date)}
          />
        ))}
      </div>

      {showDates && (
        <div className="mt-4 flex w-full text-xs text-gray-500">
          {dates.map((date) => (
            <div key={date} className="flex-1 text-center">
              {new Date(date).getDate().toString().padStart(2, '0')}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
