import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { TitleScreen } from '../components/TitleScreen'
import { AnimatedCode } from '../components/AnimatedCode'
import { ConceptCard } from '../components/ConceptCard'

const SCENE_TITLE = 0
const SCENE_HOOK = 150
const SCENE_CONCEPTS = 300
const SCENE_CODE = 500
const SCENE_REALWORLD = 700
const SCENE_SUMMARY = 900

export const Day1Python = () => {
  const frame = useCurrentFrame()

  const hookOpacity = interpolate(frame, [SCENE_HOOK, SCENE_HOOK + 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })
  const summaryOpacity = interpolate(frame, [SCENE_SUMMARY, SCENE_SUMMARY + 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  })

  return (
    <AbsoluteFill style={{ background: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>

      {frame < SCENE_HOOK && (
        <TitleScreen day={1} topic="What programming actually is and why Python" domain="Python" />
      )}

      {frame >= SCENE_HOOK && frame < SCENE_CONCEPTS && (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, opacity: hookOpacity }}>
          <div style={{ fontSize: 18, color: '#FF4D00', letterSpacing: 2, marginBottom: 24, fontWeight: 600 }}>BEFORE WE START</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#F5F5F5', textAlign: 'center', lineHeight: 1.2, marginBottom: 32 }}>
            Every app on your phone was built by someone who once knew nothing.
          </div>
          <div style={{ fontSize: 24, color: '#888888', textAlign: 'center', maxWidth: 700, lineHeight: 1.6 }}>
            Today you take the first step. Not the last — just the first. That's enough for today.
          </div>
        </AbsoluteFill>
      )}

      {frame >= SCENE_CONCEPTS && frame < SCENE_CODE && (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', padding: 80, gap: 32 }}>
          <div style={{ fontSize: 18, color: '#FF4D00', letterSpacing: 2, fontWeight: 600 }}>THREE THINGS TO UNDERSTAND TODAY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1 }}>
            <ConceptCard title="What is programming?" description="Giving a computer a precise set of instructions. Nothing more. The computer does exactly what you tell it — no more, no less." icon="🧠" startFrame={SCENE_CONCEPTS + 10} />
            <ConceptCard title="Why Python?" description="Python reads almost like English. It's the most popular language for beginners and professionals alike. Used at Google, Netflix, NASA." icon="🐍" startFrame={SCENE_CONCEPTS + 30} color="#3776AB" />
            <ConceptCard title="What will you build?" description="In 30 days you will build real projects — a calculator, a contact book, a weather app using real APIs. Starting today." icon="🏗️" startFrame={SCENE_CONCEPTS + 50} color="#00C851" />
          </div>
        </AbsoluteFill>
      )}

      {frame >= SCENE_CODE && frame < SCENE_REALWORLD && (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', padding: 80, gap: 32 }}>
          <div style={{ fontSize: 18, color: '#FF4D00', letterSpacing: 2, fontWeight: 600 }}>YOUR FIRST PYTHON PROGRAM</div>
          <div style={{ fontSize: 28, color: '#F5F5F5', fontWeight: 700, marginBottom: 8 }}>Watch this run. Understand every line.</div>
          <AnimatedCode startFrame={SCENE_CODE + 20} language="python" code={`# This is your first Python program
# The # symbol means this line is a comment
# Comments are notes for humans, not the computer

# print() shows text on the screen
print("Hello from FORGE")

# You can print anything
name = "Ashwin"
print("Welcome,", name)

# Python runs line by line, top to bottom
print("Day 1 complete.")`} />
        </AbsoluteFill>
      )}

      {frame >= SCENE_REALWORLD && frame < SCENE_SUMMARY && (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, gap: 40 }}>
          <div style={{ fontSize: 18, color: '#FF4D00', letterSpacing: 2, fontWeight: 600 }}>WHERE PYTHON IS USED RIGHT NOW</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', maxWidth: 900 }}>
            {[
              { company: 'Instagram', use: 'The entire backend runs on Python', sf: SCENE_REALWORLD + 10 },
              { company: 'Netflix', use: 'Recommendation algorithm built in Python', sf: SCENE_REALWORLD + 20 },
              { company: 'NASA', use: 'Space mission data analysis uses Python', sf: SCENE_REALWORLD + 30 },
              { company: 'Spotify', use: 'Music discovery and playlist features', sf: SCENE_REALWORLD + 40 }
            ].map(item => (
              <div key={item.company} style={{
                opacity: interpolate(frame, [item.sf, item.sf + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                background: '#111111', border: '1px solid #222222', borderRadius: 16, padding: 28
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#FF4D00', marginBottom: 8 }}>{item.company}</div>
                <div style={{ fontSize: 18, color: '#888888', lineHeight: 1.5 }}>{item.use}</div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      )}

      {frame >= SCENE_SUMMARY && (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, opacity: summaryOpacity, gap: 32 }}>
          <div style={{ fontSize: 18, color: '#FF4D00', letterSpacing: 2, fontWeight: 600 }}>DAY 1 COMPLETE</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#F5F5F5', textAlign: 'center', lineHeight: 1.2 }}>
            You now know what programming is and why Python exists.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', marginTop: 16 }}>
            {[
              'Programming = instructions for a computer',
              'Python = readable, powerful, industry standard',
              'Tomorrow: variables and how memory works'
            ].map((point, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                opacity: interpolate(frame, [SCENE_SUMMARY + 20 + i * 15, SCENE_SUMMARY + 40 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4D00', flexShrink: 0 }} />
                <span style={{ fontSize: 22, color: '#888888' }}>{point}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, fontSize: 20, color: '#444444' }}>See you tomorrow. Day 2 starts in 24 hours.</div>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  )
}