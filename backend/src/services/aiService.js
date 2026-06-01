const Groq = require('groq-sdk')
require('dotenv').config()

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const generateQuestions = async (topic, dayNumber, domain, phase) => {
  try {
    const difficultyGuide = phase === 1
      ? 'easy questions only'
      : phase === 2
      ? 'easy and medium questions'
      : phase === 3
      ? 'medium and hard questions'
      : 'all difficulty levels including timed interview style'

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are a senior technical interviewer generating practice questions for a learner on Day ${dayNumber} of their ${domain} learning track. Today's topic is: "${topic}". Generate ${difficultyGuide}.

Return ONLY this exact JSON format, nothing else, no extra text:
{
  "easy": {
    "question": "question text here",
    "hint": "hint if they get stuck"
  },
  "medium": {
    "question": "question text here",
    "hint": "hint if they get stuck"
  },
  "hard": {
    "question": "question text here",
    "hint": "hint if they get stuck"
  }
}

Rules:
- Questions must test EXACTLY what was covered in today's topic
- Never reference concepts beyond Day ${dayNumber}
- Easy tests recall, Medium tests application, Hard tests creation
- Sound like a real technical interviewer, not a textbook
- Keep questions concise and unambiguous`
        }
      ]
    })

    const content = completion.choices[0].message.content
    const cleaned = content.replace(/```json|```/g, '').trim()
    const questions = JSON.parse(cleaned)

    return { success: true, questions }

  } catch (error) {
    console.error('AI question generation error:', error)
    return {
      success: false,
      error: 'Could not generate questions right now.'
    }
  }
}

const evaluateAnswer = async (question, answer, topic, domain) => {
  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are a senior ${domain} technical interviewer evaluating a learner's answer.

Topic: ${topic}
Question: ${question}
Their answer: ${answer}

Return ONLY this exact JSON format, nothing else, no extra text:
{
  "score": 0-100,
  "understood": ["concept they got right"],
  "missed": ["concept they missed"],
  "feedback": "2-3 sentences of specific feedback. Conversational, like a mentor talking.",
  "followUp": "One natural follow-up question like a real interviewer would ask.",
  "encouragement": "One sentence, genuine and specific."
}`
        }
      ]
    })

    const content = completion.choices[0].message.content
    const cleaned = content.replace(/```json|```/g, '').trim()
    const evaluation = JSON.parse(cleaned)

    return { success: true, evaluation }

  } catch (error) {
    console.error('AI evaluation error:', error)
    return {
      success: false,
      error: 'Could not evaluate answer right now.'
    }
  }
}

const generateSessionOpening = async (name, dayNumber, topic, streakCount, voicePreference) => {
  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `Generate a session opening message for ${name} who is starting Day ${dayNumber} covering "${topic}". Their streak is ${streakCount} days. Voice preference: ${voicePreference}.

Rules:
- Under 40 words
- Reference something specific about today's topic
- No generic motivation platitudes
- End with energy
- Match voice: warm=encouraging mentor, direct=no fluff, formal=professional
- Return only the message, nothing else`
        }
      ]
    })

    return {
      success: true,
      message: completion.choices[0].message.content
    }

  } catch (error) {
    console.error('Session opening error:', error)
    return {
      success: true,
      message: `Day ${dayNumber}. ${topic}. Let us get into it.`
    }
  }
}

module.exports = { generateQuestions, evaluateAnswer, generateSessionOpening }