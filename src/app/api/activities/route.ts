import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        date: 'asc',
      },
    })

    const metrics = await prisma.metric.findMany({
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json({ activities, metrics })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
