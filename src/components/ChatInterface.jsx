import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function ChatInterface({ subject }) {
  const [messages, setMessages] = useState([])
  const [displayMessages, setDisplayMessages] = useState([
    {
      role: 'system',
      content: `Welcome! I'm your ${subject.name} tutor. Ask me anything!`,
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

  return (
    <div className="chat-container" role="region" aria-label={`Chat with ${subject.name} tutor`}>
      <div className="chat-header">
        <h2>
          <span aria-hidden="true">{subject.icon}</span> Learning <span>{subject.name}</span>
        </h2>
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
              {message.role === 'assistant' ? (
                <>
                  <div className="markdown-content">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  <button
                    className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                    onClick={() => handleCopy(message.content, index)}
                    aria-label={copiedIndex === index ? 'Copied!' : 'Copy message'}
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </button>
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
