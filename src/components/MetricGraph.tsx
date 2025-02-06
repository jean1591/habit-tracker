'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import { MetricEntry } from '@/types/metrics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface MetricGraphProps {
  metrics: MetricEntry[]
  type: 'tiredness' | 'stress' | 'mood'
}

export default function MetricGraph({ metrics, type }: MetricGraphProps) {
  const filteredMetrics = metrics.filter((m) => m.type === type)

  const data = {
    labels: filteredMetrics.map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: filteredMetrics.map((m) => m.value),
        borderColor:
          type === 'tiredness'
            ? 'rgb(255, 99, 132)'
            : type === 'stress'
              ? 'rgb(53, 162, 235)'
              : 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
