import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.hero}
      >
        <div style={styles.badge}>Free. Always.</div>

        <h1 style={styles.title}>
          Skills aren't<br />
          <span style={styles.accent}>downloaded.</span><br />
          They're built.
        </h1>

        <p style={styles.subtitle}>
          One hour a day. 30 days. Interview ready.<br />
          FORGE takes you from zero to your first tech job — free, forever.
        </p>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>30</span>
            <span style={styles.statLabel}>Days</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNumber}>1hr</span>
            <span style={styles.statLabel}>Per day</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNumber}>0₹</span>
            <span style={styles.statLabel}>Forever</span>
          </div>
        </div>

        <div style={styles.buttons}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={styles.primaryBtn}
            onClick={() => navigate('/signup')}
          >
            Start your 30 days
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={styles.secondaryBtn}
            onClick={() => navigate('/login')}
          >
            Already started? Log in
          </motion.button>
        </div>

        <div style={styles.domains}>
          {['Python', 'JavaScript', 'SQL', 'React', 'DevOps', 'Cloud', 'Cybersecurity', 'ML'].map(d => (
            <span key={d} style={styles.domainTag}>{d}</span>
          ))}
        </div>
      </motion.div>

      <div style={styles.glow} />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
    overflow: 'hidden'
  },
  hero: {
    maxWidth: '600px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,77,0,0.15)',
    color: '#FF4D00',
    padding: '6px 16px',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '32px',
    border: '1px solid rgba(255,77,0,0.3)'
  },
  title: {
    fontSize: '64px',
    fontWeight: '900',
    lineHeight: '1.05',
    marginBottom: '24px',
    letterSpacing: '-2px'
  },
  accent: {
    color: '#FF4D00'
  },
  subtitle: {
    fontSize: '18px',
    color: '#888888',
    lineHeight: '1.7',
    marginBottom: '48px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '48px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#F5F5F5'
  },
  statLabel: {
    fontSize: '12px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: '#222222'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '48px'
  },
  primaryBtn: {
    background: '#FF4D00',
    color: '#fff',
    padding: '16px 48px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    width: '100%',
    maxWidth: '320px'
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#888888',
    padding: '16px 48px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    border: '1px solid #222222',
    width: '100%',
    maxWidth: '320px'
  },
  domains: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center'
  },
  domainTag: {
    background: '#1A1A1A',
    color: '#888888',
    padding: '6px 14px',
    borderRadius: '100px',
    fontSize: '13px',
    border: '1px solid #222222'
  },
  glow: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none'
  }
}