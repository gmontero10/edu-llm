const subjects = [
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'Explore civilizations, events, and historical figures',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    description: 'Learn algebra, calculus, geometry, and more',
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    description: 'Discover mechanics, thermodynamics, and quantum physics',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Study life sciences, genetics, and ecosystems',
  },
]

function SubjectCarousel({ onSelect }) {
  const handleKeyDown = (e, subject) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(subject)
    }
  }

  return (
    <div className="carousel-container">
      <h2 id="carousel-heading">Choose a Subject to Learn</h2>
      <div
        className="carousel"
        role="list"
        aria-labelledby="carousel-heading"
      >
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="subject-card"
            role="listitem"
            tabIndex={0}
            onClick={() => onSelect(subject)}
            onKeyDown={(e) => handleKeyDown(e, subject)}
            aria-label={`${subject.name}: ${subject.description}`}
          >
            <div className="subject-icon" aria-hidden="true">
              {subject.icon}
            </div>
            <div className="subject-card-content">
              <h3>{subject.name}</h3>
              <p>{subject.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubjectCarousel
