import { useState } from 'react'
import SubjectCarousel from './components/SubjectCarousel'
import ChatInterface from './components/ChatInterface'

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null)

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
  }

  const handleBack = () => {
    setSelectedSubject(null)
  }

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="header" role="banner">
        <h1>EduLLM</h1>
        <p>AI-Powered Learning Assistant</p>
        {selectedSubject && (
          <button
            className="back-button"
            onClick={handleBack}
            aria-label="Go back to subject selection"
          >
            <span className="arrow" aria-hidden="true">←</span>
            Back to Subjects
          </button>
        )}
      </header>
      <main className="main" role="main" id="main-content">
        {!selectedSubject ? (
          <SubjectCarousel onSelect={handleSubjectSelect} />
        ) : (
          <ChatInterface subject={selectedSubject} />
        )}
      </main>
    </div>
  )
}

export default App
