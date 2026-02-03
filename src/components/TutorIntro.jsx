import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { getCharacterById } from '../utils/characterData'
import GLBCharacter from './HeroSection/GLBCharacter'
import ChatAvatar from './ChatAvatar'

/**
 * Full-screen intro with large tutor, speech bubble, and Begin Assessment button
 */
function TutorIntro({ subject, onBeginQuiz }) {
  const character = getCharacterById(subject.id)
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const introText = character?.passionateIntro || 'Welcome! Let me assess your knowledge level.'

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('')
    setIsTypingComplete(false)
    let index = 0

    const timer = setInterval(() => {
      if (index < introText.length) {
        setDisplayedText(introText.slice(0, index + 1))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, 20)

    return () => clearInterval(timer)
  }, [introText])

  // Allow skipping the typewriter
  const handleSkip = () => {
    setDisplayedText(introText)
    setIsTypingComplete(true)
  }

  return (
    <div
      className="tutor-intro"
      style={{ '--theme-color': character?.themeColor || '#00d4ff' }}
    >
      {/* Speech Bubble */}
      <div className="tutor-intro-speech-bubble" onClick={handleSkip}>
        <p className="tutor-intro-text">{displayedText}</p>
        {!isTypingComplete && (
          <span className="typing-cursor">|</span>
        )}
        {!isTypingComplete && (
          <p className="skip-hint">Click to skip</p>
        )}
      </div>

      {/* Large 3D Tutor */}
      <div className="tutor-intro-character">
        <Canvas
          camera={{ position: [0, 1, 4], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <LargeTutor character={character} />
          </Suspense>
        </Canvas>
      </div>

      {/* Character Name */}
      <div className="tutor-intro-name">
        <span className="tutor-intro-icon">{subject.icon}</span>
        <span>{character?.character}</span>
      </div>

      {/* Begin Assessment Button */}
      <button
        className={`tutor-intro-button ${isTypingComplete ? 'visible' : ''}`}
        onClick={onBeginQuiz}
        disabled={!isTypingComplete}
      >
        <span>Begin Assessment</span>
        <span className="button-arrow">→</span>
      </button>
    </div>
  )
}

/**
 * Large 3D tutor character with idle animation
 */
function LargeTutor({ character }) {
  const hasGLBModel = character?.hasModel && character?.modelPath

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color={character?.themeColor} />
      <pointLight position={[0, -1, 2]} intensity={0.2} color={character?.themeColor} />

      {/* Character - use GLB if available, otherwise ChatAvatar */}
      {hasGLBModel ? (
        <group rotation={[0, Math.PI, 0]}>
          <GLBCharacter character={character} isSelected={false} isHovered={false} />
        </group>
      ) : (
        <group scale={1.8}>
          <ChatAvatar character={character} />
        </group>
      )}

      {/* Glow ring at feet */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.75, 32]} />
        <meshBasicMaterial
          color={character?.themeColor}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

export default TutorIntro
