import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY_PREFIX = 'learningJourney_'

/**
 * Hook to manage the learning journey state for a subject
 * Handles intro → quiz → learning flow with localStorage persistence
 */
export function useLearningJourney(subjectId) {
  const storageKey = `${STORAGE_KEY_PREFIX}${subjectId}`

  // Check localStorage for existing level
  const getSavedLevel = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.level || null
      }
    } catch (e) {
      console.error('Error reading learning journey from localStorage:', e)
    }
    return null
  }, [storageKey])

  const savedLevel = getSavedLevel()
  const isReturningUser = savedLevel !== null

  // Initialize state based on whether user has a saved level
  const [journeyState, setJourneyState] = useState(() => ({
    stage: isReturningUser ? 'learning' : 'intro',
    quizAnswers: [],
    currentQuestion: 0,
    level: savedLevel,
  }))

  // Save level to localStorage when it changes
  useEffect(() => {
    if (journeyState.level) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            level: journeyState.level,
            savedAt: new Date().toISOString(),
          })
        )
      } catch (e) {
        console.error('Error saving learning journey to localStorage:', e)
      }
    }
  }, [journeyState.level, storageKey])

  // Transition from intro to quiz
  const startQuiz = useCallback(() => {
    setJourneyState((prev) => ({
      ...prev,
      stage: 'quiz',
      currentQuestion: 0,
      quizAnswers: [],
    }))
  }, [])

  // Record an answer and advance to next question
  const answerQuestion = useCallback((answerLevel) => {
    setJourneyState((prev) => ({
      ...prev,
      quizAnswers: [...prev.quizAnswers, answerLevel],
      currentQuestion: prev.currentQuestion + 1,
    }))
  }, [])

  // Complete the quiz and transition to learning
  const completeQuiz = useCallback((calculatedLevel) => {
    setJourneyState((prev) => ({
      ...prev,
      stage: 'learning',
      level: calculatedLevel,
    }))
  }, [])

  // Reset journey to start fresh
  const resetJourney = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
    } catch (e) {
      console.error('Error removing learning journey from localStorage:', e)
    }
    setJourneyState({
      stage: 'intro',
      quizAnswers: [],
      currentQuestion: 0,
      level: null,
    })
  }, [storageKey])

  return {
    ...journeyState,
    isReturningUser,
    startQuiz,
    answerQuestion,
    completeQuiz,
    resetJourney,
  }
}

/**
 * Calculate the user's level based on quiz answers
 * Each answer is tagged with difficulty: beginner=1, intermediate=2, advanced=3
 * Average score determines final level
 */
export function calculateLevel(answers) {
  if (!answers || answers.length === 0) return 'beginner'

  const levelScores = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  }

  const totalScore = answers.reduce((sum, level) => sum + (levelScores[level] || 1), 0)
  const avgScore = totalScore / answers.length

  if (avgScore < 1.5) return 'beginner'
  if (avgScore <= 2.5) return 'intermediate'
  return 'advanced'
}

export default useLearningJourney
