const prisma = require('../database')
const { curriculum } = require('../services/curriculumData')

const completeSession = async (req, res) => {
  try {
    const { confidenceScore } = req.body

    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user.domain) {
      return res.status(400).json({ message: 'Complete onboarding first.' })
    }

    const domainCurriculum = curriculum[user.domain]
    const todayLesson = domainCurriculum.days[user.currentDay - 1]

    // Create session record
    await prisma.session.create({
      data: {
        userId: user.id,
        dayNumber: user.currentDay,
        topic: todayLesson.topic,
        completedAt: new Date(),
        duration: 60,
        modeUsed: 'full',
        confidenceScore: confidenceScore || 3
      }
    })

    // Calculate new streak
    const now = new Date()
    const lastSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        completedAt: { not: null }
      },
      orderBy: { completedAt: 'desc' },
      skip: 1
    })

    let newStreak = user.streakCount
    if (lastSession) {
      const lastDate = new Date(lastSession.completedAt)
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24))
      if (diffDays <= 1) {
        newStreak = user.streakCount + 1
      } else {
        newStreak = 1
      }
    } else {
      newStreak = 1
    }

    // Advance to next day
    const nextDay = user.currentDay + 1
    const nextPhase = nextDay <= 7 ? 1
      : nextDay <= 16 ? 2
      : nextDay <= 24 ? 3
      : 4

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        currentDay: nextDay > domainCurriculum.duration ? user.currentDay : nextDay,
        phase: nextPhase,
        streakCount: newStreak,
        streakRecord: Math.max(newStreak, user.streakRecord)
      }
    })

    // Streak milestone messages
    let streakMessage = null
    if (newStreak === 7) {
      streakMessage = "Seven days straight. You are not the person who quits. Week 2 starts tomorrow."
    } else if (newStreak === 14) {
      streakMessage = "Two weeks. Most people are gone by now. You are still here."
    } else if (newStreak === 21) {
      streakMessage = "21 days. This is a habit now. One more week and you are done."
    } else if (newStreak === 30) {
      streakMessage = "30 days. You did it. Go get that job."
    }

    res.json({
      message: getCompletionMessage(user.name, user.currentDay, newStreak),
      streakMessage,
      updatedUser: {
        currentDay: updatedUser.currentDay,
        streakCount: updatedUser.streakCount,
        streakRecord: updatedUser.streakRecord,
        phase: updatedUser.phase
      },
      nextLesson: nextDay <= domainCurriculum.duration
        ? domainCurriculum.days[nextDay - 1]
        : null
    })

  } catch (error) {
    console.error('Complete session error:', error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const getSessionHistory = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 30
    })

    res.json({ sessions })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

function getCompletionMessage(name, day, streak) {
  const messages = [
    `Day ${day} done, ${name}. Streak is at ${streak}. See you tomorrow.`,
    `That is ${streak} days straight, ${name}. Keep going.`,
    `Day ${day} complete. ${streak} day streak. You are building something real.`,
    `Done. Day ${day}. Streak: ${streak}. Tomorrow is Day ${day + 1}.`
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

module.exports = { completeSession, getSessionHistory }