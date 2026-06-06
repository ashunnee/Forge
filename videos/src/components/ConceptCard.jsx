import { useCurrentFrame, interpolate } from 'remotion'

export const ConceptCard = ({ title, description, icon, startFrame = 0, color = '#FF4D00' }) => {
  const frame = useCurrentFrame()

  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })
  const scale = interpolate(frame, [startFrame, startFrame + 20], [0.8, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })
  const translateY = interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })

  return (
    <div style={{
      opacity, transform: `translateY(${translateY}px) scale(${scale})`,
      background: '#111111', border: `1px solid ${color}33`,
      borderRadius: 16, padding: 32,
      display: 'flex', flexDirection: 'column', gap: 16
    }}>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#F5F5F5' }}>{title}</div>
      <div style={{ fontSize: 18, color: '#888888', lineHeight: 1.6 }}>{description}</div>
      <div style={{ width: 40, height: 3, background: color, borderRadius: 2 }} />
    </div>
  )
}