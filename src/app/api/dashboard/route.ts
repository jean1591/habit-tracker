import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

export type DashboardDto = {
  activities: {
    date: string
    count: number
  }[]
}

export async function GET() {
  const session = await getSession()

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const activities = await prisma.activity.groupBy({
    by: ['date'],
    where: {
      userId: session.user.id,
      date: {
        gte: oneYearAgo,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      date: 'asc',
    },
  })

  return NextResponse.json({
    activities: activities.map((c) => ({
      date: c.date.toISOString().split('T')[0],
      count: c._count.id,
    })),
  })
}
