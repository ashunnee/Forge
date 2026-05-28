const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../database')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email and password are required.' 
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ 
        message: 'An account with this email already exists.' 
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      message: `Welcome to FORGE, ${user.name}. Your journey starts now.`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        currentDay: user.currentDay,
        streakCount: user.streakCount
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ 
      message: 'Something went wrong. Try again.' 
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required.' 
      })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ 
        message: 'No account found with this email.' 
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ 
        message: 'Wrong password. Try again.' 
      })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      message: `Welcome back, ${user.name}.`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        domain: user.domain,
        currentDay: user.currentDay,
        streakCount: user.streakCount,
        voicePreference: user.voicePreference
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: 'Something went wrong. Try again.' 
    })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found.' 
      })
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        domain: user.domain,
        currentDay: user.currentDay,
        phase: user.phase,
        streakCount: user.streakCount,
        streakRecord: user.streakRecord,
        lifeHappensPassUsed: user.lifeHappensPassUsed,
        studyWindowTime: user.studyWindowTime,
        sessionMode: user.sessionMode,
        voicePreference: user.voicePreference,
        goal: user.goal,
        experienceLevel: user.experienceLevel,
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({ 
      message: 'Something went wrong.' 
    })
  }
}

module.exports = { signup, login, getMe }