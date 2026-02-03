import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY_PREFIX = 'learningJourney_'

/**
 * Hook to manage the learning journey state for a subject
 * Handles intro → diagnosis → learning flow with localStorage persistence
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
    diagnosticTurn: 0,
    level: savedLevel,
    levelConfidence: isReturningUser ? 1 : 0,
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

  // Transition from intro to diagnosing (called after user sends first message)
  const startDiagnosis = useCallback(() => {
    setJourneyState((prev) => ({
      ...prev,
      stage: 'diagnosing',
      diagnosticTurn: 1,
    }))
  }, [])

  // Process diagnostic metadata from AI response
  const processDiagnosticResponse = useCallback((metadata) => {
    setJourneyState((prev) => {
      const newTurn = prev.diagnosticTurn + 1
      const shouldComplete =
        metadata.confidence >= 0.7 || newTurn >= 5

      if (shouldComplete) {
        return {
          ...prev,
          stage: 'learning',
          diagnosticTurn: newTurn,
          level: metadata.suggestedLevel,
          levelConfidence: metadata.confidence,
        }
      }

      return {
        ...prev,
        diagnosticTurn: newTurn,
        levelConfidence: metadata.confidence,
      }
    })
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
      diagnosticTurn: 0,
      level: null,
      levelConfidence: 0,
    })
  }, [storageKey])

  return {
    ...journeyState,
    isReturningUser,
    startDiagnosis,
    processDiagnosticResponse,
    resetJourney,
  }
}

/**
 * Parse diagnostic metadata from AI response
 * Returns { content, metadata } where metadata may be null
 */
export function parseDiagnosticMetadata(response) {
  const metadataRegex = /<!--DIAGNOSTIC:(.*?)-->/s
  const match = response.match(metadataRegex)

  if (!match) {
    return { content: response, metadata: null }
  }

  try {
    const metadata = JSON.parse(match[1])
    const content = response.replace(metadataRegex, '').trim()
    return { content, metadata }
  } catch (e) {
    console.error('Error parsing diagnostic metadata:', e)
    return { content: response, metadata: null }
  }
}

export default useLearningJourney
