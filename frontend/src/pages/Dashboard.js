import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getTodayLesson, getFullCurriculum } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [curriculum, setCurriculum] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTodayLesson(), getFullCurriculum()])
      .then(([lessonRes, currRes]) => {
        setLesson(lessonRes.data)
        setCurriculum(currRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.loadingText}>Loading your session...</div>
    </div>
  )

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>FORGE</div>
        <div style={styles.headerRight}>
          <div style={styles.streak}>
            🔥 {user?.streakCount || 0} day streak
          </div>
          <button style={styles.logoutBtn} onClick={() => { logoutUser(); navigate('/') }}>
            Log out
          </button>
        </div>
      </div>

      <div style={styles.content}>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.greeting}
        >
          <h1 style={styles.greetingText}>
            Hey {user?.name}. 
          </h1>
          <p style={styles.greetingSubtext}>
            {lesson?.message}
          </p>
        </motion.div>

        {/* Today's Session Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={styles.todayCard}
        >
          <div style={styles.todayHeader}>
            <div>
              <div style={styles.todayLabel}>Today — Day {lesson?.lesson?.day}</div>
              <h2 style={styles.todayTopic}>{lesson?.lesson?.topic}</h2>
              <div style={styles.phaseTag}>{lesson?.lesson?.phaseLabel}</div>
            </div>
            <div style={styles.progressCircle}>
              <span style={styles.progressNumber}>{lesson?.progress?.percentComplete}%</span>
            </div>
          </div>

          <div style={styles.sessionBreakdown}>
            <div style={styles.sessionBlock}>
              <div style={styles.sessionTime}>20 min</div>
              <div style={styles.sessionType}>Watch</div>
            </div>
            <div style={styles.sessionArrow}>→</div>
            <div style={styles.sessionBlock}>
              <div style={styles.sessionTime}>20 min</div>
              <div style={styles.sessionType}>Practice</div>
            </div>
            <div style={styles.sessionArrow}>→</div>
            <div style={styles.sessionBlock}>
              <div style={styles.sessionTime}>20 min</div>
              <div style={styles.sessionType}>Questions</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={styles.startBtn}
            onClick={() => navigate('/session')}
          >
            Start today's session →
          </motion.button>
        </motion.div>

        {/* Progress Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.progressSection}
        >
          <h3 style={styles.sectionTitle}>Your 30-day journey</h3>
          <div style={styles.dayGrid}>
            {curriculum?.days?.map(day => (
              <motion.div
                key={day.day}
                whileHover={{ scale: 1.1 }}
                style={{
                  ...styles.dayDot,
                  background: day.status === 'completed' ? '#00C851'
                    : day.status === 'today' ? '#FF4D00'
                    : '#1A1A1A',
                  border: day.status === 'today' ? '2px solid #FF4D00' : '2px solid #222222'
                }}
                title={`Day ${day.day}: ${day.topic}`}
              >
                {day.status === 'completed' ? '✓' : day.day}
              </motion.div>
            ))}
          </div>

          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, background: '#00C851' }} />
              <span>Completed</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, background: '#FF4D00' }} />
              <span>Today</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, background: '#1A1A1A', border: '1px solid #222' }} />
              <span>Upcoming</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.statsRow}
        >
          <div style={styles.statCard}>
            <div style={styles.statValue}>{lesson?.progress?.currentDay}</div>
            <div style={styles.statLabel}>Current day</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{lesson?.progress?.totalDays - lesson?.progress?.currentDay + 1}</div>
            <div style={styles.statLabel}>Days left</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{user?.streakCount || 0}</div>
            <div style={styles.statLabel}>Day streak</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{lesson?.progress?.percentComplete}%</div>
            <div style={styles.statLabel}>Complete</div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0A0A0A'
  },
  loading: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#888888',
    fontSize: '16px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #1A1A1A'
  },
  logo: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#FF4D00',
    letterSpacing: '2px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  streak: {
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '100px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600'
  },
  logoutBtn: {
    background: 'transparent',
    color: '#888888',
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #222222'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  greeting: {
    marginBottom: '32px'
  },
  greetingText: {
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '8px'
  },
  greetingSubtext: {
    fontSize: '16px',
    color: '#888888',
    lineHeight: '1.6'
  },
  todayCard: {
    background: '#111111',
    border: '1px solid #FF4D00',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px'
  },
  todayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  todayLabel: {
    fontSize: '13px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px'
  },
  todayTopic: {
    fontSize: '22px',
    fontWeight: '800',
    marginBottom: '12px',
    lineHeight: '1.3'
  },
  phaseTag: {
    display: 'inline-block',
    background: 'rgba(255,77,0,0.15)',
    color: '#FF4D00',
    padding: '4px 12px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600'
  },
  progressCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '3px solid #FF4D00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  progressNumber: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#FF4D00'
  },
  sessionBreakdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    background: '#1A1A1A',
    borderRadius: '12px',
    padding: '16px'
  },
  sessionBlock: {
    flex: 1,
    textAlign: 'center'
  },
  sessionTime: {
    fontSize: '18px',
    fontWeight: '800',
    marginBottom: '4px'
  },
  sessionType: {
    fontSize: '12px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  sessionArrow: {
    color: '#444444',
    fontSize: '18px'
  },
  startBtn: {
    width: '100%',
    background: '#FF4D00',
    color: '#fff',
    padding: '18px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700'
  },
  progressSection: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  dayGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px'
  },
  dayDot: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#F5F5F5'
  },
  legend: {
    display: 'flex',
    gap: '20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#888888'
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '3px'
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  statCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#FF4D00',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }
}