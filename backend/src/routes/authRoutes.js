const express = require('express')
const router = express.Router()
const { signup, login, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
const {
  authLimiter,
  signupValidation,
  loginValidation,
  handleValidationErrors
} = require('../middleware/securityMiddleware')

router.post('/signup',
  authLimiter,
  signupValidation,
  handleValidationErrors,
  signup
)

router.post('/login',
  authLimiter,
  loginValidation,
  handleValidationErrors,
  login
)

router.get('/me', protect, getMe)

module.exports = router