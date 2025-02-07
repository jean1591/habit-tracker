import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { date, type } = body

  try {
    // Check if activity exists
    const existingActivity = await prisma.activity.findFirst({
      where: {
        userId: session.user.id,
        date: new Date(date),
        type,
      },
    })

    if (existingActivity) {
      // Delete if exists
      await prisma.activity.delete({
        where: { id: existingActivity.id },
      })
    } else {
      // Create if doesn't exist
      await prisma.activity.create({
        data: {
          userId: session.user.id,
          date: new Date(date),
          type,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to toggle activity' },
      { status: 500 }
    )
  }
}
