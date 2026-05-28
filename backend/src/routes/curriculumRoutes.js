const express = require('express')
const router = express.Router()
const { getTodayLesson, getFullCurriculum } = require('../controllers/curriculumController')
const { protect } = require('../middleware/authMiddleware')

router.get('/today', protect, getTodayLesson)
router.get('/full', protect, getFullCurriculum)

module.exports = router