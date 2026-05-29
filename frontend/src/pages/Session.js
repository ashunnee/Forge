import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTodayLesson } from '../services/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PHASES = ['watch', 'practice', 'questions', 'complete']

export default function Session() {
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [phase, setPhase] = useState('watch')
  const [timeLeft, setTimeLeft] = useState(20 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [confidenceScore, setConfidenceScore] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    getTodayLesson()
      .then(res => setLesson(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current)
      setTimerRunning(false)
    }
    return () => clearInterval(intervalRef.current)
  }, [timerRunning, timeLeft])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const nextPhase = () => {
    clearInterval(intervalRef.current)
    setTimerRunning(false)
    if (phase === 'watch') {
      setPhase('practice')
      setTimeLeft(20 * 60)
    } else if (phase === 'practice') {
      setPhase('questions')
      setTimeLeft(20 * 60)
    } else if (phase === 'questions') {
      setPhase('complete')
    }
  }

  const questions = {
    easy: `What is the main purpose of a database? Explain in your own words.`,
    medium: `What is the difference between a database and a spreadsheet like Excel? When would you use one over the other?`,
    hard: `Design a simple database structure for a school system. What tables would you need and why?`
  }

  if (!lesson) return (
    <div style={styles.loading}>Loading your session...</div>
  )

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <div style={styles.headerCenter}>
          <span style={styles.dayLabel}>Day {lesson.lesson?.day}</span>
          <span style={styles.topicLabel}>{lesson.lesson?.topic}</span>
        </div>
        <div style={styles.timerDisplay}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Phase Indicators */}
      <div style={styles.phaseBar}>
        {['watch', 'practice', 'questions'].map((p, i) => (
          <div key={p} style={styles.phaseItem}>
            <div style={{
              ...styles.phaseCircle,
              background: phase === p ? '#FF4D00'
                : PHASES.indexOf(phase) > i ? '#00C851'
                : '#222222'
            }}>
              {PHASES.indexOf(phase) > i ? '✓' : i + 1}
            </div>
            <span style={{
              ...styles.phaseText,
              color: phase === p ? '#FF4D00' : '#888888'
            }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <AnimatePresence mode="wait">

          {/* WATCH PHASE */}
          {phase === 'watch' && (
            <motion.div key="watch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={styles.phaseContent}
            >
              <h2 style={styles.phaseTitle}>Watch & Learn</h2>
              <p style={styles.phaseSubtitle}>
                Today: <strong>{lesson.lesson?.topic}</strong>
              </p>

              {/* Video Placeholder */}
              <div style={styles.videoPlaceholder}>
                <div style={styles.videoInner}>
                  <div style={styles.playIcon}>▶</div>
                  <p style={styles.videoText}>
                    Animated lesson video
                  </p>
                  <p style={styles.videoSubtext}>
                    {lesson.lesson?.topic}
                  </p>
                </div>
              </div>

              {/* Key Concepts */}
              <div style={styles.conceptsCard}>
                <h3 style={styles.conceptsTitle}>Key concepts in today's lesson</h3>
                <div style={styles.conceptsList}>
                  {getKeyConcepts(lesson.lesson?.topic).map((concept, i) => (
                    <div key={i} style={styles.conceptItem}>
                      <div style={styles.conceptDot} />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.timerControls}>
                {!timerRunning ? (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    style={styles.primaryBtn}
                    onClick={() => setTimerRunning(true)}
                  >
                    Start 20-minute timer
                  </motion.button>
                ) : (
                  <div style={styles.timerRunning}>
                    <div style={styles.timerBig}>{formatTime(timeLeft)}</div>
                    <p style={styles.timerHint}>Timer running — focus on the lesson</p>
                  </div>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={styles.secondaryBtn}
                  onClick={nextPhase}
                >
                  Done watching → Move to Practice
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* PRACTICE PHASE */}
          {phase === 'practice' && (
            <motion.div key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={styles.phaseContent}
            >
              <h2 style={styles.phaseTitle}>Hands-on Practice</h2>
              <p style={styles.phaseSubtitle}>
                Now do it yourself. Not just reading — actually doing.
              </p>

              <div style={styles.exerciseCard}>
                <div style={styles.exerciseLabel}>Today's Exercise</div>
                <h3 style={styles.exerciseTitle}>
                  {getPracticeExercise(lesson.lesson?.topic)}
                </h3>
                <div style={styles.exerciseSteps}>
                  {getPracticeSteps(lesson.lesson?.topic).map((step, i) => (
                    <div key={i} style={styles.exerciseStep}>
                      <div style={styles.stepNumber}>{i + 1}</div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.timerControls}>
                {!timerRunning ? (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    style={styles.primaryBtn}
                    onClick={() => setTimerRunning(true)}
                  >
                    Start 20-minute timer
                  </motion.button>
                ) : (
                  <div style={styles.timerRunning}>
                    <div style={styles.timerBig}>{formatTime(timeLeft)}</div>
                    <p style={styles.timerHint}>Timer running — work through the exercise</p>
                  </div>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={styles.secondaryBtn}
                  onClick={nextPhase}
                >
                  Done practicing → Move to Questions
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUESTIONS PHASE */}
          {phase === 'questions' && (
            <motion.div key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={styles.phaseContent}
            >
              <h2 style={styles.phaseTitle}>Practice Questions</h2>
              <p style={styles.phaseSubtitle}>
                Answer in your own words. No copy-paste. Think it through.
              </p>

              <div style={styles.questionsContainer}>
                {Object.entries(questions).map(([level, question]) => (
                  <div key={level} style={styles.questionCard}>
                    <div style={{
                      ...styles.difficultyTag,
                      background: level === 'easy' ? 'rgba(0,200,81,0.15)'
                        : level === 'medium' ? 'rgba(255,179,0,0.15)'
                        : 'rgba(255,77,0,0.15)',
                      color: level === 'easy' ? '#00C851'
                        : level === 'medium' ? '#FFB300'
                        : '#FF4D00'
                    }}>
                      {level.toUpperCase()}
                    </div>
                    <p style={styles.questionText}>{question}</p>
                    <textarea
                      style={styles.answerInput}
                      placeholder="Type your answer here..."
                      rows={4}
                    />
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                style={styles.primaryBtn}
                onClick={nextPhase}
              >
                Submit answers → Complete session
              </motion.button>
            </motion.div>
          )}

          {/* COMPLETE PHASE */}
          {phase === 'complete' && (
            <motion.div key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.completeContent}
            >
              <div style={styles.completeBadge}>✓</div>
              <h2 style={styles.completeTitle}>Day {lesson.lesson?.day} done.</h2>
              <p style={styles.completeSubtitle}>
                You just spent an hour on something that matters.<br />
                That's not nothing. See you tomorrow.
              </p>

              <div style={styles.confidenceSection}>
                <p style={styles.confidenceQuestion}>
                  How solid do you feel on today's content?
                </p>
                <div style={styles.confidenceOptions}>
                  {[1, 2, 3, 4, 5].map(score => (
                    <motion.button
                      key={score}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        ...styles.confidenceBtn,
                        background: confidenceScore === score ? '#FF4D00' : '#1A1A1A',
                        border: confidenceScore === score ? '2px solid #FF4D00' : '2px solid #222222'
                      }}
                      onClick={() => setConfidenceScore(score)}
                    >
                      {score}
                    </motion.button>
                  ))}
                </div>
                <div style={styles.confidenceLabels}>
                  <span>Not confident</span>
                  <span>Very confident</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                style={styles.primaryBtn}
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('forge_token')
                    await axios.post('http://localhost:5000/api/session/complete',
                      { confidenceScore },
                      { headers: { Authorization: `Bearer ${token}` }}
                    )
                  } catch (err) {
                    console.error(err)
                  }
                  navigate('/dashboard')
                }}
              >
                Back to dashboard →
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

// Helper functions for dynamic content
function getKeyConcepts(topic) {
  const concepts = {
    'What databases are and why SQL exists': [
      'A database stores structured data permanently',
      'SQL is the language used to talk to databases',
      'Tables organize data into rows and columns',
      'Databases are used in almost every app you use'
    ],
    'What programming actually is and why Python': [
      'Programming is giving instructions to a computer',
      'Python is readable and beginner-friendly',
      'Code runs line by line, top to bottom',
      'Every app, website, and AI is built with code'
    ]
  }
  return concepts[topic] || [
    'Core concept 1 for this topic',
    'Core concept 2 for this topic',
    'Core concept 3 for this topic',
    'Core concept 4 for this topic'
  ]
}

function getPracticeExercise(topic) {
  const exercises = {
    'What databases are and why SQL exists': 'Sketch your first database design',
    'What programming actually is and why Python': 'Write and run your first Python program'
  }
  return exercises[topic] || `Practice exercise for: ${topic}`
}

function getPracticeSteps(topic) {
  const steps = {
    'What databases are and why SQL exists': [
      'Open a notepad or paper',
      'Think of a simple app — like a contacts app',
      'List what information it needs to store',
      'Organize that information into a table with column names',
      'Ask yourself: what would you search for in this data?'
    ],
    'What programming actually is and why Python': [
      'Open your terminal or command prompt',
      'Type: python --version to check Python is installed',
      'Type: python to open the Python interpreter',
      'Type: print("Hello from FORGE") and press Enter',
      'You just ran your first program. Notice how it works.'
    ]
  }
  return steps[topic] || [
    'Step 1: Review the key concepts from the video',
    'Step 2: Try to explain the concept in your own words',
    'Step 3: Apply the concept to a real example',
    'Step 4: Note down anything you are unsure about'
  ]
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
    justifyContent: 'center',
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
  backBtn: {
    background: 'transparent',
    color: '#888888',
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #222222'
  },
  headerCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  dayLabel: {
    fontSize: '12px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  topicLabel: {
    fontSize: '16px',
    fontWeight: '700',
    maxWidth: '400px',
    textAlign: 'center'
  },
  timerDisplay: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#FF4D00',
    fontFamily: 'JetBrains Mono, monospace'
  },
  phaseBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    padding: '24px',
    borderBottom: '1px solid #1A1A1A'
  },
  phaseItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  phaseCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#fff'
  },
  phaseText: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  content: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  phaseContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  phaseTitle: {
    fontSize: '32px',
    fontWeight: '800'
  },
  phaseSubtitle: {
    fontSize: '16px',
    color: '#888888',
    lineHeight: '1.6'
  },
  videoPlaceholder: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    aspectRatio: '16/9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoInner: {
    textAlign: 'center'
  },
  playIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    color: '#FF4D00'
  },
  videoText: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  videoSubtext: {
    fontSize: '14px',
    color: '#888888'
  },
  conceptsCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    padding: '24px'
  },
  conceptsTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '16px'
  },
  conceptsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  conceptItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: '#888888'
  },
  conceptDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#FF4D00',
    flexShrink: 0
  },
  timerControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  timerRunning: {
    textAlign: 'center',
    padding: '24px',
    background: '#111111',
    border: '1px solid #FF4D00',
    borderRadius: '16px'
  },
  timerBig: {
    fontSize: '64px',
    fontWeight: '900',
    color: '#FF4D00',
    fontFamily: 'monospace',
    marginBottom: '8px'
  },
  timerHint: {
    fontSize: '14px',
    color: '#888888'
  },
  primaryBtn: {
    width: '100%',
    background: '#FF4D00',
    color: '#fff',
    padding: '18px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer'
  },
  secondaryBtn: {
    width: '100%',
    background: 'transparent',
    color: '#888888',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '15px',
    border: '1px solid #222222',
    cursor: 'pointer'
  },
  exerciseCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    padding: '24px'
  },
  exerciseLabel: {
    fontSize: '12px',
    color: '#FF4D00',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  exerciseTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  exerciseSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  exerciseStep: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '15px',
    color: '#888888'
  },
  stepNumber: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#1A1A1A',
    border: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    flexShrink: 0,
    color: '#FF4D00'
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  questionCard: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    padding: '24px'
  },
  difficultyTag: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  questionText: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  answerInput: {
    width: '100%',
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '15px',
    color: '#F5F5F5',
    resize: 'vertical',
    fontFamily: 'Inter, sans-serif'
  },
  completeContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px'
  },
  completeBadge: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(0,200,81,0.15)',
    border: '2px solid #00C851',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    color: '#00C851'
  },
  completeTitle: {
    fontSize: '36px',
    fontWeight: '900'
  },
  completeSubtitle: {
    fontSize: '16px',
    color: '#888888',
    lineHeight: '1.7'
  },
  confidenceSection: {
    width: '100%',
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '16px',
    padding: '24px'
  },
  confidenceQuestion: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  confidenceOptions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  confidenceBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#F5F5F5'
  },
  confidenceLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#888888',
    marginTop: '8px'
  }
}