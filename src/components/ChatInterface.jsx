import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ReactMarkdown from 'react-markdown'
import { getCharacterById } from '../utils/characterData'
import GLBCharacter from './HeroSection/GLBCharacter'
import ChatAvatar from './ChatAvatar'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

const encouragingQuotes = [
  "You're making great progress!",
  "Curiosity is the key to learning.",
  "Every question brings understanding.",
  "Keep exploring!",
  "Your mind is growing stronger.",
]

function ChatInterface({ subject, level, onStartFresh, isReturningUser }) {
  const character = getCharacterById(subject.id)

  // Build initial message based on level
  const getInitialMessage = () => {
    const levelDesc = character?.levelDescriptions?.[level] || ''
    if (isReturningUser) {
      return `Welcome back! I remember you - you're at the ${level} level. ${levelDesc} What would you like to explore today?`
    }
    return `Excellent! Based on your assessment, I can see you're at the ${level} level. ${levelDesc} What would you like to learn about?`
  }

  const [messages, setMessages] = useState([])
  const [displayMessages, setDisplayMessages] = useState([
    {
      role: 'system',
      content: getInitialMessage(),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [encouragement, setEncouragement] = useState(encouragingQuotes[0])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages])

  // Rotate encouragement quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setEncouragement(encouragingQuotes[Math.floor(Math.random() * encouragingQuotes.length)])
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = async (content, index) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleStartFresh = () => {
    onStartFresh()
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const timestamp = new Date()
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setDisplayMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage, timestamp },
    ])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          subject: subject,
          journeyState: {
            stage: 'learning',
            level: level,
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get response')
      }

      const data = await response.json()
      const assistantMessage = data.message

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }])
      setDisplayMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage, timestamp: new Date() },
      ])
    } catch (error) {
      setDisplayMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: `Error: ${error.message}. Please try again.`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }

  return (
    <div
      className="learning-container"
      style={{ '--theme-color': character?.themeColor || '#00d4ff' }}
    >
      {/* Tutor Panel (Left) */}
      <div className="tutor-panel">
        <div className="tutor-panel-character">
          <Canvas
            camera={{ position: [0, 1, 4], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <TutorPanelCharacter character={character} />
            </Suspense>
          </Canvas>
        </div>

        <div className="tutor-panel-info">
          <h3 className="tutor-panel-name">
            <span className="tutor-panel-icon">{subject.icon}</span>
            {character?.character}
          </h3>

          {level && (
            <span className={`level-badge level-${level}`}>
              {levelLabels[level]}
            </span>
          )}

          <p className="tutor-panel-quote">{encouragement}</p>

          <button
            className="start-fresh-button"
            onClick={handleStartFresh}
            aria-label="Start fresh and reset your learning level"
          >
            Start Fresh
          </button>
        </div>
      </div>

      {/* Chat Panel (Right) */}
      <div className="chat-panel" role="region" aria-label={`Chat with ${subject.name} tutor`}>
        <div className="messages" role="log" aria-live="polite" aria-label="Chat messages">
          {displayMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role}`}
              role="article"
              aria-label={`${message.role === 'user' ? 'You' : message.role === 'assistant' ? 'Tutor' : 'System'} said`}
            >
              <div className="message-content">
                {message.role === 'assistant' || message.role === 'system' ? (
                  <>
                    <div className="markdown-content">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    {message.role === 'assistant' && (
                      <button
                        className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                        onClick={() => handleCopy(message.content, index)}
                        aria-label={copiedIndex === index ? 'Copied!' : 'Copy message'}
                      >
                        {copiedIndex === index ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </>
                ) : (
                  message.content
                )}
              </div>
              {message.timestamp && (
                <div className="message-timestamp" aria-label={`Sent at ${formatTime(message.timestamp)}`}>
                  {formatTime(message.timestamp)}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message assistant" role="status" aria-label="Tutor is typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-container" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything about ${subject.name}...`}
            disabled={isLoading}
            aria-label={`Type your question about ${subject.name}`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

/**
 * Tutor character for the side panel - uses GLB model if available
 */
function TutorPanelCharacter({ character }) {
  const hasGLBModel = character?.hasModel && character?.modelPath

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color={character?.themeColor} />

      {/* Character - use GLB if available, otherwise ChatAvatar */}
      {hasGLBModel ? (
        <group rotation={[0, Math.PI, 0]}>
          <GLBCharacter character={character} isSelected={false} isHovered={false} />
        </group>
      ) : (
        <group scale={1.3}>
          <ChatAvatar character={character} />
        </group>
      )}
    </group>
  )
}

export default ChatInterface
