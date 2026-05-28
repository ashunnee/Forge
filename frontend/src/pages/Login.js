import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Fill everything in.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await login({ email, password })
      loginUser(res.data.token, res.data.user)
      if (res.data.user.domain) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
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
        <p style={styles.title}>Welcome back.</p>
        <p style={styles.subtitle}>Pick up exactly where you left off.</p>

        <input
          style={styles.input}
          placeholder="your@email.com"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {error && <p style={styles.error}>{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          style={styles.btn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging you in...' : 'Log in →'}
        </motion.button>

        <p style={styles.link} onClick={() => navigate('/signup')}>
          No account yet? Start your 30 days
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
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '15px',
    color: '#888888',
    marginBottom: '32px'
  },
  input: {
    width: '100%',
    background: '#1A1A1A',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    color: '#F5F5F5',
    marginBottom: '12px'
  },
  btn: {
    width: '100%',
    background: '#FF4D00',
    color: '#fff',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '24px',
    marginTop: '8px'
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