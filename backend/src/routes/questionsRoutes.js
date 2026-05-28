const express = require('express')
const router = express.Router()
const { getQuestions, submitAnswer, getSessionOpening } = require('../controllers/questionsController')
const { protect } = require('../middleware/authMiddleware')

router.get('/generate', protect, getQuestions)
router.post('/submit', protect, submitAnswer)
router.get('/opening', protect, getSessionOpening)

module.exports = router