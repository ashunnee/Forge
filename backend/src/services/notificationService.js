const prisma = require('../database')
const { curriculum } = require('./curriculumData')

const checkMissedSessions = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        domain: { not: null }
      }
    })

    for (const user of users) {
      const lastSession = await prisma.session.findFirst({
        where: {
          userId: user.id,
          completedAt: { not: null }
        },
        orderBy: { completedAt: 'desc' }
      })

      if (!lastSession) continue

      const now = new Date()
      const lastDate = new Date(lastSession.completedAt)
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        await createNotification(user.id, 'missed_1', getMissed1Message(user.name, user.currentDay, user.streakCount))
      } else if (diffDays === 2) {
        await createNotification(user.id, 'missed_2', getMissed2Message(user.name, user.currentDay))
      } else if (diffDays >= 3) {
        await createNotification(user.id, 'missed_3', getMissed3Message(user.name, user.currentDay))
        await prisma.user.update({
          where: { id: user.id },
          data: {
            streakCount: 0,
            currentDay: Math.max(1, user.currentDay - 3)
          }
        })
      }
    }
  } catch (error) {
    console.error('Check missed sessions error:', error)
  }
}

const createNotification = async (userId, type, message) => {
  const existing = await prisma.notification.findFirst({
    where: {
      userId,
      type,
      sentAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  })

  if (existing) return

  await prisma.notification.create({
    data: { userId, type, message }
  })
}

const getMissed1Message = (name, day, streak) =>
  `${name}, you missed yesterday. Your streak of ${streak} days is gone. Day ${day} is still waiting. Come back today — it costs you nothing except showing up.`

const getMissed2Message = (name, day) =>
  `Two days missed, ${name}. This is the part where most people quietly disappear. You are not most people. Day ${day} is still there. Tonight. One hour.`

const getMissed3Message = (name, day) =>
  `${name}. Three days. Your progress has been set back. Not to zero — but back. This is the cost. The only way forward is through. Open FORGE tonight.`

const getDailyReminder = (name, day, topic, studyTime) =>
  `${name}, Day ${day} is today. ${topic}. Your session starts at ${studyTime}. See you there.`

module.exports = {
  checkMissedSessions,
  createNotification,
  getDailyReminder
}