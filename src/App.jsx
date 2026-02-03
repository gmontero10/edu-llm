import { useState } from 'react'
import HeroSection from './components/HeroSection'
import ChatInterface from './components/ChatInterface'
import './styles/hero-section.css'

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSubjectSelect = (subject) => {
    setIsTransitioning(true)
    // Small delay for transition effect
    setTimeout(() => {
      setSelectedSubject(subject)
      setIsTransitioning(false)
    }, 300)
  }

  const handleBack = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedSubject(null)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div className={`app ${isTransitioning ? 'transitioning' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {selectedSubject && (
        <header className="header" role="banner">
          <h1>EduLLM</h1>
          <p>AI-Powered Learning Assistant</p>
          <button
            className="back-button"
            onClick={handleBack}
            aria-label="Go back to subject selection"
          >
            <span className="arrow" aria-hidden="true">←</span>
            Back to Subjects
          </button>
        </header>
      )}
      <main className={`main ${!selectedSubject ? 'main-hero' : ''}`} role="main" id="main-content">
        {!selectedSubject ? (
          <HeroSection onSelect={handleSubjectSelect} />
        ) : (
          <ChatInterface subject={selectedSubject} />
        )}
      </main>
    </div>
  )
}

export default App
