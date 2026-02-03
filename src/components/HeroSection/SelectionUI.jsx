import { characters } from '../../utils/characterData'

/**
 * HTML overlay showing selected character info
 */
function SelectionUI({ selectedIndex, onBeginLearning }) {
  if (selectedIndex === null) {
    return (
      <div className="hero-selection-ui hero-selection-empty">
        <p className="hero-hint">Select a tutor to begin your journey</p>
      </div>
    )
  }

  const character = characters[selectedIndex]

  return (
    <div
      className="hero-selection-ui hero-selection-active"
      style={{ '--character-color': character.themeColor }}
    >
      <div className="hero-character-info">
        <div className="hero-character-header">
          <span className="hero-character-icon" aria-hidden="true">
            {character.icon}
          </span>
          <div className="hero-character-titles">
            <h2 className="hero-character-name">{character.character}</h2>
            <p className="hero-character-subject">{character.name} Tutor</p>
          </div>
        </div>

        <blockquote className="hero-character-quote">
          {character.quote}
        </blockquote>

        <p className="hero-character-description">
          {character.description}
        </p>

        <button
          className="hero-begin-button"
          onClick={() => onBeginLearning(character)}
          aria-label={`Begin learning ${character.name} with ${character.character}`}
        >
          <span className="hero-button-text">Begin Learning</span>
          <span className="hero-button-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

export default SelectionUI
