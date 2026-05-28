const { curriculum, getPhaseLabel } = require('../services/curriculumData')
const prisma = require('../database')

const getTodayLesson = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user.domain) {
      return res.status(400).json({ 
        message: 'Complete onboarding first.' 
      })
    }

    const domainCurriculum = curriculum[user.domain]
    const todayLesson = domainCurriculum.days[user.currentDay - 1]

    if (!todayLesson) {
      return res.json({ 
        message: 'You have completed the curriculum. Time to get that job.' 
      })
    }

    const phaseLabel = getPhaseLabel(todayLesson.phase)

    res.json({
      lesson: {
        day: todayLesson.day,
        topic: todayLesson.topic,
        phase: todayLesson.phase,
        phaseLabel,
        domain: domainCurriculum.name
      },
      progress: {
        currentDay: user.currentDay,
        totalDays: domainCurriculum.duration,
        streakCount: user.streakCount,
        percentComplete: Math.round((user.currentDay / domainCurriculum.duration) * 100)
      },
      message: `Day ${user.currentDay}. ${todayLesson.topic}. This is where things start clicking.`
    })

  } catch (error) {
    console.error('Curriculum error:', error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const getFullCurriculum = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user.domain) {
      return res.status(400).json({ 
        message: 'Complete onboarding first.' 
      })
    }

    const domainCurriculum = curriculum[user.domain]

    const days = domainCurriculum.days.map(day => ({
      ...day,
      phaseLabel: getPhaseLabel(day.phase),
      status: day.day < user.currentDay ? 'completed' 
        : day.day === user.currentDay ? 'today' 
        : 'upcoming'
    }))

    res.json({
      domain: domainCurriculum.name,
      totalDays: domainCurriculum.duration,
      currentDay: user.currentDay,
      days
    })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports = { getTodayLesson, getFullCurriculum }