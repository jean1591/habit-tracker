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
    <div className="mx-auto max-w-4xl space-y-20 p-6">
      <h1 className="inline-block bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-5xl font-extrabold text-transparent">
        Dashboard
      </h1>

      <div className="space-y-16">
        <div className="space-y-8">
          <h2 className="inline-block bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
            Metrics
          </h2>
          <MetricGraph
            metrics={metrics}
            types={['tiredness', 'mood', 'stress']}
          />
        </div>

        <div className="space-y-8">
          <h2 className="inline-block bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
            Activities
          </h2>
          <div className="space-y-4">
            <ActivityBar activities={activities} type="sport" days={30} />
            <ActivityBar activities={activities} type="cheat_meal" days={30} />
          </div>
        </div>
      </div>
    </div>
  )
}
