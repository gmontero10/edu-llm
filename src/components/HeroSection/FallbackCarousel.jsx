import { characters } from '../../utils/characterData'

/**
 * Enhanced 2D fallback carousel for non-3D browsers
 */
function FallbackCarousel({ onSelect }) {
  const handleKeyDown = (e, character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(character)
    }
  }

  return (
    <div className="fallback-carousel-container">
      <h2 id="carousel-heading">Choose Your Tutor</h2>
      <p className="fallback-subtitle">
        Learn from history's greatest minds
      </p>

      <div
        className="fallback-carousel"
        role="list"
        aria-labelledby="carousel-heading"
      >
        {characters.map((character) => (
          <div
            key={character.id}
            className="fallback-card"
            role="listitem"
            tabIndex={0}
            onClick={() => onSelect(character)}
            onKeyDown={(e) => handleKeyDown(e, character)}
            style={{ '--card-color': character.themeColor }}
            aria-label={`${character.character}: ${character.name} - ${character.description}`}
          >
            <div className="fallback-card-glow" aria-hidden="true" />
            <div className="fallback-card-content">
              <div className="fallback-icon" aria-hidden="true">
                {character.icon}
              </div>
              <h3 className="fallback-character-name">{character.character}</h3>
              <p className="fallback-subject">{character.name}</p>
              <blockquote className="fallback-quote">{character.quote}</blockquote>
              <p className="fallback-description">{character.description}</p>
              <button
                className="fallback-button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(character)
                }}
              >
                Begin Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FallbackCarousel
