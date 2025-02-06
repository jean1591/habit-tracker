import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { subDays } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10

  // First, let's create a test user if it doesn't exist
  const testUser = await prisma.user.upsert({
    where: { email: 'mw@example.com' },
    update: {},
    create: {
      email: 'mw@example.com',
      name: 'Mark Watney',
      password: await bcrypt.hash('Azerty123456$', saltRounds),
    },
  })

  // Generate dates for the last 30 days
  const today = new Date()
  const dates = Array.from({ length: 30 }, (_, i) =>
    subDays(today, 29 - i)
  ).map((date) => date.toISOString())

  // Create activities (sport sessions) for specific days
  const sportDays = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29] // Days with sport activities
  for (const dayIndex of sportDays) {
    await prisma.activity.create({
      data: {
        type: 'sport',
        date: dates[dayIndex],
        userId: testUser.id,
      },
    })
  }

  // Create cheat meal activities
  const cheatMealDays = [2, 7, 14, 21, 28] // Days with cheat meals
  for (const dayIndex of cheatMealDays) {
    await prisma.activity.create({
      data: {
        type: 'cheat_meal',
        date: dates[dayIndex],
        userId: testUser.id,
      },
    })
  }

  // Create tiredness metrics
  for (let i = 0; i < dates.length; i++) {
    // Generate realistic tiredness values
    // Higher tiredness on sport days and the day after
    const isSportDay = sportDays.includes(i)
    const isDayAfterSport = sportDays.includes(i - 1)

    let tirednessValue = 2 // base tiredness
    if (isSportDay) tirednessValue = 4
    else if (isDayAfterSport) tirednessValue = 3

    await prisma.metric.create({
      data: {
        type: 'tiredness',
        value: tirednessValue,
        date: dates[i],
        userId: testUser.id,
      },
    })

    // Also create stress metrics
    await prisma.metric.create({
      data: {
        type: 'stress',
        value: Math.floor(Math.random() * 3) + 2, // Random value between 2-4
        date: dates[i],
        userId: testUser.id,
      },
    })

    // And mood metrics
    await prisma.metric.create({
      data: {
        type: 'mood',
        value: Math.floor(Math.random() * 3) + 3, // Random value between 3-5
        date: dates[i],
        userId: testUser.id,
      },
    })
  }

  console.info('Seed data inserted successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
