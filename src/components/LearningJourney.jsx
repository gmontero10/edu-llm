import { useLearningJourney } from '../hooks/useLearningJourney'
import TutorIntro from './TutorIntro'
import DiagnosticQuiz from './DiagnosticQuiz'
import ChatInterface from './ChatInterface'

/**
 * Main container that orchestrates the learning journey phases:
 * - Intro: Full-screen tutor with speech bubble
 * - Quiz: Multiple-choice diagnostic assessment
 * - Learning: Split layout with tutor panel + chat
 */
function LearningJourney({ subject, onBack }) {
  const journey = useLearningJourney(subject.id)

  // Intro phase - full-screen tutor with passionate intro
  if (journey.stage === 'intro') {
    return (
      <TutorIntro
        subject={subject}
        onBeginQuiz={journey.startQuiz}
      />
    )
  }

  // Quiz phase - diagnostic assessment
  if (journey.stage === 'quiz') {
    return (
      <DiagnosticQuiz
        subject={subject}
        onComplete={(level) => journey.completeQuiz(level)}
      />
    )
  }

  // Learning phase - chat interface with tutor panel
  return (
    <ChatInterface
      subject={subject}
      level={journey.level}
      onStartFresh={journey.resetJourney}
      isReturningUser={journey.isReturningUser}
    />
  )
}

export default LearningJourney
