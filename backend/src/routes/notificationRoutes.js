const express = require('express')
const router = express.Router()
const prisma = require('../database')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId },
      orderBy: { sentAt: 'desc' },
      take: 20
    })
    res.json({ notifications })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

router.put('/:id/read', protect, async (req, res) => {
  try {
    await prisma.notification.update({
      where: { id: req.params.id },
      data: { opened: true, openedAt: new Date() }
    })
    res.json({ message: 'Marked as read.' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

module.exports = router