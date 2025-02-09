'use client'

import { useEffect, useState } from 'react'

interface ActivityLine {
  label: string
  days: { date: Date; active: boolean }[]
}

interface StoredActivityLine {
  label: string
  days: { date: string; active: boolean }[]
}

export default function Dashboard() {
  const [activityLines, setActivityLines] = useState<ActivityLine[]>([])
  const [newActivityName, setNewActivityName] = useState('')
  const [isAddingActivity, setIsAddingActivity] = useState(false)

  useEffect(() => {
    const storedActivityLines: ActivityLine[] = JSON.parse(
      localStorage.getItem('activityLines') || '[]'
    ).map((line: StoredActivityLine) => ({
      ...line,
      days: line.days.map((day: { date: string; active: boolean }) => ({
        date: new Date(day.date),
        active: day.active,
      })),
    }))
    setActivityLines(storedActivityLines)
  }, [])

  const handleAddActivityLine = () => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate()

    const newLine: ActivityLine = {
      label: newActivityName,
      days: [],
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        day
      )
      newLine.days.push({ date, active: false })
    }

    const updatedActivityLines = [...activityLines, newLine]
    setActivityLines(updatedActivityLines)
    localStorage.setItem('activityLines', JSON.stringify(updatedActivityLines))
    setNewActivityName('')
    setIsAddingActivity(false)
  }

  const handleDayClick = (activityLabel: string, date: Date) => {
    const updatedLines = activityLines.map((line) => {
      if (line.label === activityLabel) {
        return {
          ...line,
          days: line.days.map((day) =>
            day.date.toDateString() === date.toDateString()
              ? { ...day, active: !day.active } // Toggle activity status
              : day
          ),
        }
      }
      return line
    })

    setActivityLines(updatedLines)
    localStorage.setItem('activityLines', JSON.stringify(updatedLines))
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>

      {isAddingActivity ? (
        <div className="mb-4">
          <input
            type="text"
            value={newActivityName}
            onChange={(e) => setNewActivityName(e.target.value)}
            placeholder="Enter activity name"
            className="rounded border p-2"
          />
          <button
            onClick={handleAddActivityLine}
            className="ml-2 rounded bg-blue-500 p-2 text-white"
          >
            Add
          </button>
          <button
            onClick={() => setIsAddingActivity(false)}
            className="ml-2 rounded bg-red-500 p-2 text-white"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingActivity(true)}
          className="mb-4 rounded bg-green-500 p-2 text-white"
        >
          Add Activity Line
        </button>
      )}

      <div className="mt-4">
        {activityLines.map((line, index) => (
          <div key={index} className="flex h-10 w-full items-center border-b">
            <span className="flex-1 text-left">{line.label}</span>
            <div className="flex flex-grow justify-between">
              {line.days.map((day, dayIndex) => (
                <button
                  key={dayIndex}
                  onClick={() => handleDayClick(line.label, day.date)}
                  className={`h-6 w-6 ${day.active ? 'bg-blue-500' : 'bg-gray-300'} mx-1`}
                >
                  {day.date.getDate()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
