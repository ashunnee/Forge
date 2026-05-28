import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signup } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Fill everything in.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await signup({ name, email, password })
      loginUser(res.data.token, res.data.user)
      navigate('/onboarding')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <div style={styles.logo}>FORGE</div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={styles.question}>First things first — what's your name?</p>
            <input
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name && setStep(2)}
              autoFocus
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={styles.btn}
              onClick={() => name && setStep(2)}
            >
              That's me →
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={styles.question}>Nice to meet you, {name}. Your email?</p>
            <input
              style={styles.input}
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && email && setStep(3)}
              autoFocus
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={styles.btn}
              onClick={() => email && setStep(3)}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={styles.question}>Last one. Create a password.</p>
            <input
              style={styles.input}
              placeholder="Something strong"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignup()}
              autoFocus
            />
            {error && <p style={styles.error}>{error}</p>}
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={styles.btn}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? 'Creating your account...' : "Let's go →"}
            </motion.button>
          </motion.div>
        )}

        <p style={styles.link} onClick={() => navigate('/login')}>
          Already have an account? Log in
        </p>
      </motion.div>
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
    maxWidth: '440px'
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
    marginBottom: '24px',
    lineHeight: '1.4'
  },
  input: {
    width: '100%',
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    color: '#F5F5F5',
    marginBottom: '16px'
  },
  btn: {
    width: '100%',
    background: '#FF4D00',
    color: '#fff',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '24px'
  },
  error: {
    color: '#FF4D00',
    fontSize: '14px',
    marginBottom: '12px'
  },
  link: {
    color: '#888888',
    fontSize: '14px',
    textAlign: 'center',
    cursor: 'pointer'
  }
}