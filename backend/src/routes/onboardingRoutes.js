const express = require('express')
const router = express.Router()
const { completeOnboarding, getOnboardingStatus } = require('../controllers/onboardingController')
const { protect } = require('../middleware/authMiddleware')
const {
  onboardingValidation,
  handleValidationErrors
} = require('../middleware/securityMiddleware')

router.post('/complete',
  protect,
  onboardingValidation,
  handleValidationErrors,
  completeOnboarding
)

router.get('/status', protect, getOnboardingStatus)

module.exports = router