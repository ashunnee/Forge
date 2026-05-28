const prisma = require('../database')
const { generateQuestions, evaluateAnswer, generateSessionOpening } = require('../services/aiService')
const { curriculum, getPhaseLabel } = require('../services/curriculumData')

const getQuestions = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user.domain) {
      return res.status(400).json({ message: 'Complete onboarding first.' })
    }

    const domainCurriculum = curriculum[user.domain]
    const todayLesson = domainCurriculum.days[user.currentDay - 1]

    const result = await generateQuestions(
      todayLesson.topic,
      user.currentDay,
      domainCurriculum.name,
      todayLesson.phase
    )

    if (!result.success) {
      return res.status(500).json({ message: result.error })
    }

    res.json({
      day: user.currentDay,
      topic: todayLesson.topic,
      phase: todayLesson.phase,
      phaseLabel: getPhaseLabel(todayLesson.phase),
      questions: result.questions
    })

  } catch (error) {
    console.error('Get questions error:', error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const submitAnswer = async (req, res) => {
  try {
    const { question, answer, difficulty } = req.body

    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    const domainCurriculum = curriculum[user.domain]
    const todayLesson = domainCurriculum.days[user.currentDay - 1]

    const result = await evaluateAnswer(
      question,
      answer,
      todayLesson.topic,
      domainCurriculum.name
    )

    if (!result.success) {
      return res.status(500).json({ message: result.error })
    }

    const { evaluation } = result

    res.json({
      score: evaluation.score,
      understood: evaluation.understood,
      missed: evaluation.missed,
      feedback: evaluation.feedback,
      followUp: evaluation.followUp,
      encouragement: evaluation.encouragement
    })

  } catch (error) {
    console.error('Submit answer error:', error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const getSessionOpening = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    const domainCurriculum = curriculum[user.domain]
    const todayLesson = domainCurriculum.days[user.currentDay - 1]

    const result = await generateSessionOpening(
      user.name,
      user.currentDay,
      todayLesson.topic,
      user.streakCount,
      user.voicePreference
    )

    res.json({ message: result.message })

  } catch (error) {
    console.error('Session opening error:', error)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports = { getQuestions, submitAnswer, getSessionOpening }