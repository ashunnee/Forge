const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const onboardingRoutes = require('./routes/onboardingRoutes')
const curriculumRoutes = require('./routes/curriculumRoutes')
const questionsRoutes = require('./routes/questionsRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const { checkMissedSessions } = require('./services/notificationService')
const {
  helmetMiddleware,
  generalLimiter,
  sanitizeInputs
} = require('./middleware/securityMiddleware')

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmetMiddleware)
app.use(cors({
  origin: ['http://localhost:3000', 'https://forge-learn.vercel.app'],
  credentials: true
}))
app.use(express.json({ limit: '10kb' }))
app.use(generalLimiter)
app.use(sanitizeInputs)

app.get('/', (req, res) => {
  res.json({
    message: 'FORGE backend is alive.',
    status: 'running',
    version: '1.0.0'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/curriculum', curriculumRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/session', sessionRoutes)
app.use('/api/notifications', notificationRoutes)

setInterval(checkMissedSessions, 60 * 60 * 1000)

app.listen(PORT, () => {
  console.log(`FORGE backend running on port ${PORT}`)
  console.log(`Test it at: http://localhost:${PORT}`)
})