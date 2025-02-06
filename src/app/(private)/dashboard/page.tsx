import ActivityBar from '@/components/ActivityBar'
import MetricGraph from '@/components/MetricGraph'

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function DashboardPage() {
  const { activities, metrics } = await getData()

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="space-y-8">
        <div className="rounded-lg p-6 shadow backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-semibold">Metrics</h2>
          <MetricGraph
            metrics={metrics}
            types={['tiredness', 'mood', 'stress']}
          />
        </div>

        <div className="rounded-lg p-6 shadow backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-semibold">Activities</h2>
          <div className="space-y-4">
            <ActivityBar activities={activities} type="sport" days={30} />
            <ActivityBar activities={activities} type="cheat_meal" days={30} />
          </div>
        </div>
      </div>
    </div>
  )
}
