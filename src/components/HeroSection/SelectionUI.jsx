import { characters } from '../../utils/characterData'

/**
 * HTML overlay showing selected character info
 */
function SelectionUI({ selectedIndex, onBeginLearning }) {
  if (selectedIndex === null) {
    return null
  }

  const character = characters[selectedIndex]

  return (
    <div
      className="hero-selection-ui hero-selection-active"
      style={{ '--character-color': character.themeColor }}
    >
      <h2 className="hero-subject-name">{character.name}</h2>

      <button
        className="hero-begin-button"
        onClick={() => onBeginLearning(character)}
        aria-label={`Begin learning ${character.name}`}
      >
        <span className="hero-button-text">Begin Learning</span>
        <span className="hero-button-arrow" aria-hidden="true">→</span>
      </button>
    </div>
  )
}

export default SelectionUI
