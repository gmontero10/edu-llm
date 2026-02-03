import { useEffect, useCallback } from 'react'
import { characters } from '../../utils/characterData'

/**
 * Navigation arrows and keyboard controls for character selection
 */
function NavigationControls({
  selectedIndex,
  onNavigate,
  onSelect,
}) {
  const characterCount = characters.length

  const navigatePrev = useCallback(() => {
    const newIndex = selectedIndex === null
      ? characterCount - 1
      : (selectedIndex - 1 + characterCount) % characterCount
    onNavigate(newIndex)
  }, [selectedIndex, characterCount, onNavigate])

  const navigateNext = useCallback(() => {
    const newIndex = selectedIndex === null
      ? 0
      : (selectedIndex + 1) % characterCount
    onNavigate(newIndex)
  }, [selectedIndex, characterCount, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          navigatePrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          navigateNext()
          break
        case 'Enter':
        case ' ':
          if (selectedIndex !== null) {
            e.preventDefault()
            onSelect(characters[selectedIndex])
          }
          break
        case 'Tab':
          // Allow natural tab flow for accessibility
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, navigatePrev, navigateNext, onSelect])

  return (
    <div className="hero-navigation" role="navigation" aria-label="Character selection">
      <button
        className="hero-nav-button hero-nav-prev"
        onClick={navigatePrev}
        aria-label="Previous character"
      >
        <span className="hero-nav-arrow" aria-hidden="true">‹</span>
      </button>

      {/* Character indicators */}
      <div className="hero-indicators" role="tablist" aria-label="Characters">
        {characters.map((character, index) => (
          <button
            key={character.id}
            className={`hero-indicator ${selectedIndex === index ? 'active' : ''}`}
            style={{ '--indicator-color': character.themeColor }}
            onClick={() => onNavigate(index)}
            role="tab"
            aria-selected={selectedIndex === index}
            aria-label={`${character.character}, ${character.name}`}
            tabIndex={selectedIndex === index ? 0 : -1}
          />
        ))}
      </div>

      <button
        className="hero-nav-button hero-nav-next"
        onClick={navigateNext}
        aria-label="Next character"
      >
        <span className="hero-nav-arrow" aria-hidden="true">›</span>
      </button>

      {/* Keyboard hint */}
      <p className="hero-keyboard-hint" aria-hidden="true">
        Use ← → arrows to navigate, Enter to select
      </p>
    </div>
  )
}

export default NavigationControls
