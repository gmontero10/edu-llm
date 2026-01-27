import { useState, useEffect } from 'react'
import SubjectCarousel from './components/SubjectCarousel'
import ChatInterface from './components/ChatInterface'
import ApiKeyInput from './components/ApiKeyInput'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(null)

  useEffect(() => {
    const savedKey = localStorage.getItem('openai-api-key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleApiKeySubmit = (key) => {
    setApiKey(key)
    localStorage.setItem('openai-api-key', key)
  }

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
  }

  const handleBack = () => {
    setSelectedSubject(null)
  }

  if (!apiKey) {
    return (
      <div className="app">
        <header className="header">
          <h1>EduLLM</h1>
          <p>AI-Powered Learning Assistant</p>
        </header>
        <ApiKeyInput onSubmit={handleApiKeySubmit} />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>EduLLM</h1>
        <p>AI-Powered Learning Assistant</p>
        {selectedSubject && (
          <button className="back-button" onClick={handleBack}>
            Back to Subjects
          </button>
        )}
      </header>
      <main className="main">
        {!selectedSubject ? (
          <SubjectCarousel onSelect={handleSubjectSelect} />
        ) : (
          <ChatInterface subject={selectedSubject} apiKey={apiKey} />
        )}
      </main>
    </div>
  )
}

export default App
