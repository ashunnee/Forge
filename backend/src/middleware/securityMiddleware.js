const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')

// Helmet — sets 15 security headers automatically
const helmetMiddleware = helmet({
  contentSecurityPolicy: false // we disable this for development
})

// Rate limiting — blocks brute force attacks
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes per IP
  message: {
    message: 'Too many requests from this device. Try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // only 10 login/signup attempts per 15 minutes
  message: {
    message: 'Too many login attempts. Try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 AI requests per minute
  message: {
    message: 'Slow down. Max 20 AI requests per minute.'
  }
})

// Input validation rules
const signupValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters.')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
]

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
]

const onboardingValidation = [
  body('domain')
    .trim()
    .notEmpty().withMessage('Please choose a domain.')
    .isIn(['python', 'javascript', 'sql', 'react', 'devops', 'cloud', 'cybersecurity', 'ml'])
    .withMessage('Invalid domain selected.'),
  body('studyWindowTime')
    .trim()
    .notEmpty().withMessage('Please set a study time.')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format.'),
  body('voicePreference')
    .optional()
    .isIn(['warm', 'direct', 'formal']).withMessage('Invalid voice preference.')
]

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg
    })
  }
  next()
}

// Sanitize all string inputs
const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim()
      }
    })
  }
  next()
}

module.exports = {
  helmetMiddleware,
  generalLimiter,
  authLimiter,
  aiLimiter,
  signupValidation,
  loginValidation,
  onboardingValidation,
  handleValidationErrors,
  sanitizeInputs
}