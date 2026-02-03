import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ChatAvatar from './ChatAvatar'
import { getCharacterById } from '../utils/characterData'
import { calculateLevel } from '../hooks/useLearningJourney'

/**
 * Game-like multiple choice quiz with tutor on left, questions on right
 */
function DiagnosticQuiz({ subject, onComplete }) {
  const character = getCharacterById(subject.id)
  const questions = character?.diagnosticQuestions || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [tutorMessage, setTutorMessage] = useState("Let's see what you know!")

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1

  const tutorEncouragement = [
    "Interesting choice!",
    "I see where you're coming from.",
    "Ah, let me consider that...",
    "That tells me something!",
    "Good thinking!",
  ]

  const handleOptionClick = (option, index) => {
    if (showFeedback) return

    setSelectedOption(index)
    setShowFeedback(true)
    setTutorMessage(tutorEncouragement[Math.floor(Math.random() * tutorEncouragement.length)])

    const newAnswers = [...answers, option.level]
    setAnswers(newAnswers)

    // Auto-advance after delay
    setTimeout(() => {
      if (isLastQuestion) {
        const level = calculateLevel(newAnswers)
        onComplete(level)
      } else {
        setCurrentIndex(currentIndex + 1)
        setSelectedOption(null)
        setShowFeedback(false)
        setTutorMessage("Let's see what you know!")
      }
    }, 1000)
  }

  if (!currentQuestion) {
    return <div className="quiz-loading">Loading questions...</div>
  }

  return (
    <div
      className="quiz-container"
      style={{ '--theme-color': character?.themeColor || '#00d4ff' }}
    >
      {/* Tutor Panel (Left) */}
      <div className="quiz-tutor-panel">
        <div className="quiz-tutor-character">
          <Canvas
            camera={{ position: [0, 0.5, 3], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <QuizTutor character={character} isThinking={showFeedback} />
            </Suspense>
          </Canvas>
        </div>

        <div className="quiz-tutor-info">
          <span className="quiz-tutor-name">{character?.character}</span>
          <div className="quiz-tutor-speech">
            <p>{tutorMessage}</p>
          </div>
        </div>
      </div>

      {/* Quiz Panel (Right) */}
      <div className="quiz-question-panel">
        {/* Progress Bar */}
        <div className="quiz-progress">
          <div className="quiz-progress-text">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="quiz-question">
          <h2>{currentQuestion.question}</h2>
        </div>

        {/* Options */}
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedOption === index ? 'selected' : ''
              } ${showFeedback && selectedOption === index ? 'answered' : ''}`}
              onClick={() => handleOptionClick(option, index)}
              disabled={showFeedback}
            >
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="quiz-option-text">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Tutor character for the quiz with thinking animation
 */
function QuizTutor({ character, isThinking }) {
  return (
    <group scale={1.5}>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color={character?.themeColor} />

      {/* Avatar */}
      <ChatAvatar character={character} />

      {/* Thinking indicator */}
      {isThinking && (
        <mesh position={[0.4, 0.6, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={character?.themeColor} />
        </mesh>
      )}
    </group>
  )
}

export default DiagnosticQuiz
