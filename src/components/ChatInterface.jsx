import { useState, useRef, useEffect } from 'react'

function ChatInterface({ subject, apiKey }) {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `Welcome! I'm your ${subject.name} tutor. Ask me anything!`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const systemPrompt = `You are an expert ${subject.name} tutor. Your role is to help students learn ${subject.name} concepts in an engaging and educational way.

Guidelines:
- Explain concepts clearly and simply
- Use examples and analogies when helpful
- Break down complex topics into digestible parts
- Encourage curiosity and questions
- Correct misconceptions gently
- Adapt your explanations to the student's level

Subject focus: ${subject.name} - ${subject.description}`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
              .filter((m) => m.role !== 'system')
              .map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'Failed to get response')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: `Error: ${error.message}. Please check your API key and try again.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>
          {subject.icon} Learning <span>{subject.name}</span>
        </h2>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="loading">
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
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInterface
