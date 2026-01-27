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
  return (
    <div className="carousel-container">
      <h2>Choose a Subject to Learn</h2>
      <div className="carousel">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="subject-card"
            onClick={() => onSelect(subject)}
          >
            <div className="subject-icon">{subject.icon}</div>
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubjectCarousel
