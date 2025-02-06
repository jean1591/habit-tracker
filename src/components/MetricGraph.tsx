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
  types: ('tiredness' | 'stress' | 'mood')[]
}

export default function MetricGraph({ metrics, types }: MetricGraphProps) {
  const getColor = (type: string) =>
    type === 'tiredness'
      ? 'rgb(255, 99, 132)'
      : type === 'stress'
        ? 'rgb(53, 162, 235)'
        : 'rgb(75, 192, 192)'

  const data = {
    labels: Array.from(
      new Set(metrics.map((m) => new Date(m.date).toLocaleDateString()))
    ),
    datasets: types.map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      data: metrics.filter((m) => m.type === type).map((m) => m.value),
      borderColor: getColor(type),
      tension: 0.4,
      borderWidth: 1.5,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    })),
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    },
  }

  return <Line data={data} options={options} />
}
