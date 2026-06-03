import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('forge_token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const signup = (data) => API.post('/auth/signup', data)
export const login = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')
export const completeOnboarding = (data) => API.post('/onboarding/complete', data)
export const getOnboardingStatus = () => API.get('/onboarding/status')
export const getTodayLesson = () => API.get('/curriculum/today')
export const getFullCurriculum = () => API.get('/curriculum/full')
export const generateQuestions = () => API.get('/questions/generate')
export const submitAnswer = (data) => API.post('/questions/submit', data)
export const getSessionOpening = () => API.get('/questions/opening')