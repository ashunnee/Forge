const express = require('express')
const router = express.Router()
const { completeSession, getSessionHistory } = require('../controllers/sessionController')
const { protect } = require('../middleware/authMiddleware')

router.post('/complete', protect, completeSession)
router.get('/history', protect, getSessionHistory)

module.exports = router