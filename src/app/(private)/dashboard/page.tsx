import { PiChartLineBold, PiCheckBold } from 'react-icons/pi'

import ActivityBar from '@/components/ActivityBar'
import MetricGraph from '@/components/MetricGraph'
import { endOfMonth } from 'date-fns'

async function getData() {
  const today = new Date()
  const end = endOfMonth(today)
  const totalDays = end.getDate()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return { ...data, totalDays }
}

export default async function DashboardPage() {
  const { activities, metrics, totalDays } = await getData()

  return (
    <div className="mx-auto max-w-4xl space-y-20 p-6">
      <div className="space-y-16">
        <div className="space-y-8">
          <div className="flex items-center justify-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-violet-400">
              <PiChartLineBold className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Metrics</h2>
          </div>
          <MetricGraph
            metrics={metrics}
            types={['tiredness', 'mood', 'stress']}
          />
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-violet-400">
              <PiCheckBold className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Activities</h2>
          </div>

          <div className="space-y-8">
            <ActivityBar
              activities={activities}
              type="sport"
              days={totalDays}
            />
            <ActivityBar
              activities={activities}
              type="cheat_meal"
              days={totalDays}
              showDates
            />
          </div>
        </div>
      </div>
    </div>
  )
}
