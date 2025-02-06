export type ActivityType = 'sport' | 'cheat_meal' | 'meditation'

export interface Activity {
  id: string
  type: ActivityType
  date: string // ISO date string
}

export interface MetricEntry {
  id: string
  date: string // ISO date string
  type: 'tiredness' | 'stress' | 'mood'
  value: number // 1-5
}
