import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ReactMarkdown from 'react-markdown'
import { getCharacterById } from '../utils/characterData'
import ChatAvatar from './ChatAvatar'
import { useLearningJourney, parseDiagnosticMetadata } from '../hooks/useLearningJourney'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function ChatInterface({ subject }) {
  const character = getCharacterById(subject.id)
  const journey = useLearningJourney(subject.id)

  // Build initial message based on journey state
  const getInitialMessage = () => {
    if (journey.isReturningUser && journey.stage === 'learning') {
      const levelDesc = character?.levelDescriptions?.[journey.level] || ''
      return `Welcome back! I remember you - you're at the ${journey.level} level. ${levelDesc} What would you like to explore today?`
    }
    // New user: passionate intro + diagnostic opener
    const intro = character?.passionateIntro || ''
    const opener = character?.diagnosticOpener || ''
    return `${intro}\n\n${opener}`
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
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages])

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
    journey.resetJourney()
    // Reset messages with new intro
    const intro = character?.passionateIntro || ''
    const opener = character?.diagnosticOpener || ''
    setMessages([])
    setDisplayMessages([
      {
        role: 'system',
        content: `${intro}\n\n${opener}`,
        timestamp: new Date(),
      },
    ])
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const timestamp = new Date()
    setInput('')

    // Transition from intro to diagnosing on first user message
    if (journey.stage === 'intro') {
      journey.startDiagnosis()
    }

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
            stage: journey.stage === 'intro' ? 'diagnosing' : journey.stage,
            diagnosticTurn: journey.diagnosticTurn,
            level: journey.level,
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get response')
      }

      const data = await response.json()
      let assistantMessage = data.message

      // Parse diagnostic metadata if in diagnosing stage
      if (journey.stage === 'diagnosing' || journey.stage === 'intro') {
        const { content, metadata } = parseDiagnosticMetadata(assistantMessage)
        assistantMessage = content
        if (metadata) {
          journey.processDiagnosticResponse(metadata)
        }
      }

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
    <div className="chat-container" role="region" aria-label={`Chat with ${subject.name} tutor`}>
      <div className="chat-header chat-header-with-avatar">
        {character && (
          <div className="chat-avatar-container">
            <Canvas
              camera={{ position: [0, 0.3, 2], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ChatAvatar character={character} />
              </Suspense>
            </Canvas>
          </div>
        )}
        <div className="chat-header-content">
          <h2>
            <span aria-hidden="true">{subject.icon}</span> Learning <span>{subject.name}</span>
            {character && <small style={{ display: 'block', fontSize: '0.7em', opacity: 0.7 }}>with {character.character}</small>}
          </h2>
          {journey.level && (
            <span className={`level-badge level-${journey.level}`}>
              {levelLabels[journey.level]}
            </span>
          )}
        </div>
        {journey.isReturningUser && (
          <button
            className="start-fresh-button"
            onClick={handleStartFresh}
            aria-label="Start fresh and reset your learning level"
          >
            Start Fresh
          </button>
        )}
      </div>
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
  )
}

export default ChatInterface
