const express = require('express')
const router = express.Router()
const { completeOnboarding, getOnboardingStatus } = require('../controllers/onboardingController')
const { protect } = require('../middleware/authMiddleware')

router.post('/complete', protect, completeOnboarding)
router.get('/status', protect, getOnboardingStatus)

module.exports = router