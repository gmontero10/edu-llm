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
          <ChatInterface subject={selectedSubject} />
        )}
      </main>
    </div>
  )
}

export default App
