const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const onboardingRoutes = require('./routes/onboardingRoutes')
const curriculumRoutes = require('./routes/curriculumRoutes')
const questionsRoutes = require('./routes/questionsRoutes')
const sessionRoutes = require('./routes/sessionRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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

app.listen(PORT, () => {
  console.log(`FORGE backend running on port ${PORT}`)
  console.log(`Test it at: http://localhost:${PORT}`)
})