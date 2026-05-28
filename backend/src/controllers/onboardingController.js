const prisma = require('../database')
const { curriculum, calculateCompletionDate } = require('../services/curriculumData')

const completeOnboarding = async (req, res) => {
  try {
    const { 
      name, 
      goal, 
      experienceLevel, 
      domain, 
      studyWindowTime,
      voicePreference 
    } = req.body

    if (!domain || !curriculum[domain]) {
      return res.status(400).json({ 
        message: 'Please choose a valid domain.' 
      })
    }

    const selectedCurriculum = curriculum[domain]
    const completionDate = calculateCompletionDate(
      new Date(), 
      selectedCurriculum.duration
    )

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name: name || undefined,
        goal,
        experienceLevel,
        domain,
        studyWindowTime,
        voicePreference: voicePreference || 'warm',
        currentDay: 1,
        phase: 1
      }
    })

    res.json({
      message: `Alright ${user.name}. Here is your plan. ${selectedCurriculum.duration} days. One hour. Every day. By ${completionDate} you will be ready for your first ${selectedCurriculum.promise}. Let us go.`,
      plan: {
        domain: selectedCurriculum.name,
        totalDays: selectedCurriculum.duration,
        completionDate,
        studyWindowTime,
        firstLesson: selectedCurriculum.days[0],
        promise: selectedCurriculum.promise
      },
      user: {
        id: user.id,
        name: user.name,
        domain: user.domain,
        currentDay: user.currentDay,
        voicePreference: user.voicePreference
      }
    })

  } catch (error) {
    console.error('Onboarding error:', error)
    res.status(500).json({ 
      message: 'Something went wrong during onboarding.' 
    })
  }
}

const getOnboardingStatus = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    const isOnboarded = user.domain !== null

    res.json({
      isOnboarded,
      user: {
        name: user.name,
        domain: user.domain,
        currentDay: user.currentDay,
        goal: user.goal
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports = { completeOnboarding, getOnboardingStatus }