import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { completeOnboarding } from '../services/api'
import { useAuth } from '../context/AuthContext'

const domains = [
  { id: 'python', name: 'Python Programming', duration: '30 days', color: '#3776AB' },
  { id: 'javascript', name: 'JavaScript & Web Dev', duration: '30 days', color: '#F7DF1E' },
  { id: 'sql', name: 'SQL & Data Analysis', duration: '30 days', color: '#00C851' },
]

const goals = [
  "I want to switch careers",
  "I'm trying to land my first tech job",
  "I want to finally learn this properly",
  "I want to get better at my current job"
]

const levels = [
  "Absolute zero. Never written a line of code.",
  "I know a little. Followed some tutorials.",
  "I know the basics but I get stuck on real problems.",
  "I'm intermediate but have gaps."
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('')
  const [domain, setDomain] = useState('')
  const [studyTime, setStudyTime] = useState('20:00')
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  const handleComplete = async () => {
    setLoading(true)
    try {
      const res = await completeOnboarding({
        goal,
        experienceLevel: level,
        domain,
        studyWindowTime: studyTime,
        voicePreference: 'warm'
      })
      setPlan(res.data.plan)
      setUser(res.data.user)
      setStep(5)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>FORGE</div>

        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p style={styles.question}>What brings you here? Be honest — there's no wrong answer.</p>
              <div style={styles.options}>
                {goals.map(g => (
                  <motion.div
                    key={g}
                    whileTap={{ scale: 0.98 }}
                    style={{ ...styles.option, ...(goal === g ? styles.optionSelected : {}) }}
                    onClick={() => setGoal(g)}
                  >
                    {g}
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={{ ...styles.btn, opacity: goal ? 1 : 0.4 }}
                onClick={() => goal && setStep(2)}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p style={styles.question}>How much do you already know? Don't oversell yourself.</p>
              <div style={styles.options}>
                {levels.map(l => (
                  <motion.div
                    key={l}
                    whileTap={{ scale: 0.98 }}
                    style={{ ...styles.option, ...(level === l ? styles.optionSelected : {}) }}
                    onClick={() => setLevel(l)}
                  >
                    {l}
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={{ ...styles.btn, opacity: level ? 1 : 0.4 }}
                onClick={() => level && setStep(3)}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p style={styles.question}>Which domain do you want to master?</p>
              <div style={styles.domainGrid}>
                {domains.map(d => (
                  <motion.div
                    key={d.id}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      ...styles.domainCard,
                      ...(domain === d.id ? styles.domainSelected : {})
                    }}
                    onClick={() => setDomain(d.id)}
                  >
                    <div style={{ ...styles.domainDot, background: d.color }} />
                    <p style={styles.domainName}>{d.name}</p>
                    <p style={styles.domainDuration}>{d.duration}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={{ ...styles.btn, opacity: domain ? 1 : 0.4 }}
                onClick={() => domain && setStep(4)}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p style={styles.question}>What time do you want to study every day?</p>
              <p style={styles.hint}>Be realistic. Not your ideal time — your actual time.</p>
              <input
                type="time"
                style={styles.timeInput}
                value={studyTime}
                onChange={e => setStudyTime(e.target.value)}
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={styles.btn}
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? 'Building your plan...' : 'Show me my plan →'}
              </motion.button>
            </motion.div>
          )}

          {step === 5 && plan && (
            <motion.div key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={styles.planCard}>
                <p style={styles.planLabel}>Your plan is ready.</p>
                <h2 style={styles.planDomain}>{plan.domain}</h2>
                <div style={styles.planDetails}>
                  <div style={styles.planRow}>
                    <span style={styles.planKey}>Daily commitment</span>
                    <span style={styles.planValue}>1 hour</span>
                  </div>
                  <div style={styles.planRow}>
                    <span style={styles.planKey}>Study time</span>
                    <span style={styles.planValue}>{plan.studyWindowTime}</span>
                  </div>
                  <div style={styles.planRow}>
                    <span style={styles.planKey}>You'll be ready by</span>
<span style={{ ...styles.planValue, color: '#FF4D00' }}>{plan.completionDate}</span>                  </div>
                </div>
                <p style={styles.planMessage}>
                  One hour. Every day. Starting today.<br />
                  Are you in?
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={styles.btn}
                onClick={() => navigate('/dashboard')}
              >
                I'm in. Let's start. →
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>

        <div style={styles.progress}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              ...styles.dot,
              background: step >= i ? '#FF4D00' : '#222222'
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: '#111111',
    border: '1px solid #222222',
    borderRadius: '20px',
    padding: '48px',
    width: '100%',
    maxWidth: '520px'
  },
  logo: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#FF4D00',
    marginBottom: '40px',
    letterSpacing: '2px'
  },
  question: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  hint: {
    fontSize: '14px',
    color: '#888888',
    marginBottom: '24px'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
    marginTop: '20px'
  },
  option: {
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  optionSelected: {
    border: '1px solid #FF4D00',
    background: 'rgba(255,77,0,0.08)',
    color: '#FF4D00'
  },
  domainGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '20px 0 24px'
  },
  domainCard: {
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  domainSelected: {
    border: '1px solid #FF4D00',
    background: 'rgba(255,77,0,0.08)'
  },
  domainDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0
  },
  domainName: {
    fontSize: '15px',
    fontWeight: '600',
    flex: 1
  },
  domainDuration: {
    fontSize: '13px',
    color: '#888888'
  },
  timeInput: {
    width: '100%',
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '24px',
    color: '#F5F5F5',
    marginBottom: '24px',
    marginTop: '20px',
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    background: '#FF4D00',
    color: '#fff',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700'
  },
  planCard: {
    background: '#1A1A1A',
    border: '1px solid #FF4D00',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px'
  },
  planLabel: {
    fontSize: '13px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px'
  },
  planDomain: {
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '24px',
    color: '#FF4D00'
  },
  planDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  planRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  planKey: {
    fontSize: '14px',
    color: '#888888'
  },
  planValue: {
    fontSize: '14px',
    fontWeight: '600'
  },
  planMessage: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#888888'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '32px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background 0.3s'
  }
}