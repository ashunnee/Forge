import { useCurrentFrame, interpolate } from 'remotion'

export const AnimatedCode = ({ code, startFrame = 0, language = 'python' }) => {
  const frame = useCurrentFrame()

  const lines = code.split('\n')
  const charsPerFrame = 3
  const charsVisible = Math.max(0, (frame - startFrame) * charsPerFrame)

  let count = 0
  const visibleLines = lines.map(line => {
    if (count >= charsVisible) return ''
    const lineChars = Math.min(line.length, charsVisible - count)
    count += line.length + 1
    return line.substring(0, lineChars)
  })

  const containerOpacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })

  const getColor = (text) => {
    if (text.startsWith('#')) return '#888888'
    if (text.match(/^(def |class |import |from |if |else|elif |for |while |return |print)/)) return '#FF4D00'
    return '#F5F5F5'
  }

  return (
    <div style={{
      opacity: containerOpacity,
      background: '#111111', border: '1px solid #222222',
      borderRadius: 16, padding: 32,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 22, lineHeight: 1.8
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['#FF5F57', '#FFBD2E', '#28C840'].map((color, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />
        ))}
        <span style={{ color: '#888888', fontSize: 14, marginLeft: 8, alignSelf: 'center' }}>
          {language === 'python' ? 'main.py' : 'index.js'}
        </span>
      </div>
      {visibleLines.map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: 24 }}>
          <span style={{ color: '#444444', minWidth: 24 }}>{i + 1}</span>
          <span style={{ color: getColor(line) }}>{line}</span>
        </div>
      ))}
    </div>
  )
}