import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

export const TitleScreen = ({ day, topic, domain }) => {
  const frame = useCurrentFrame()

  const opacity = interpolate(frame, [0, 30], [0, 1])
  const translateY = interpolate(frame, [0, 30], [40, 0])
  const lineWidth = interpolate(frame, [20, 60], [0, 100])

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A0A00 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ opacity, transform: `translateY(${translateY}px)`, fontSize: 28, fontWeight: 900, color: '#FF4D00', letterSpacing: 6, marginBottom: 48 }}>
        FORGE
      </div>
      <div style={{ opacity, transform: `translateY(${translateY}px)`, background: 'rgba(255,77,0,0.15)', border: '1px solid rgba(255,77,0,0.4)', borderRadius: 100, padding: '8px 24px', fontSize: 16, color: '#FF4D00', fontWeight: 600, marginBottom: 32, letterSpacing: 2 }}>
        DAY {day} — {domain.toUpperCase()}
      </div>
      <div style={{ opacity, transform: `translateY(${translateY}px)`, fontSize: 52, fontWeight: 900, color: '#F5F5F5', textAlign: 'center', maxWidth: 800, lineHeight: 1.2, marginBottom: 32, padding: '0 40px' }}>
        {topic}
      </div>
      <div style={{ width: `${lineWidth}%`, height: 3, background: 'linear-gradient(90deg, #FF4D00, transparent)', borderRadius: 2, marginBottom: 48, maxWidth: 400 }} />
      <div style={{ opacity, fontSize: 16, color: '#888888', letterSpacing: 1 }}>
        20 MINUTES · FOUNDATION
      </div>
    </AbsoluteFill>
  )
}