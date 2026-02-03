/**
 * Extended subject data with 3D character configuration
 */
export const characters = [
  {
    id: 'physics',
    name: 'Physics',
    character: 'Albert Einstein',
    icon: '⚛️',
    description: 'Discover mechanics, thermodynamics, and quantum physics',
    quote: '"Imagination is more important than knowledge."',
    themeColor: '#00d4ff', // Electric Blue
    pedestalColor: '#0066aa',
    spotlightColor: '#00d4ff',
    greeting: 'Ah, curious mind! Let us explore the mysteries of the universe together.',
    modelPath: '/models/einstein.glb',
    hasModel: true,
    modelScale: 2.5,
    modelPosition: [0, 0, 0],
    modelRotation: [0, Math.PI / 2, 0],
    geometryType: 'scientist', // Fallback
    passionateIntro:
      "Physics is not merely equations - it is humanity's attempt to understand reality itself! When I was young, I wondered what it would be like to ride alongside a beam of light. That simple question led me to discoveries that changed how we see space and time. Every falling apple, every dancing flame, every twinkling star follows the same elegant laws waiting to be understood.",
    diagnosticOpener:
      'But first, tell me - what has sparked your interest in physics? Perhaps a phenomenon that puzzled you, or a question about how the universe works?',
    subjectTopics: [
      'mechanics',
      'thermodynamics',
      'waves',
      'electromagnetism',
      'modern physics',
    ],
    levelDescriptions: {
      beginner:
        'We shall begin with motion, forces, and energy - the building blocks of our physical world!',
      intermediate:
        'You have good foundations! Let us explore waves, electricity, and magnetism together.',
      advanced:
        'Wonderful! We can dive into relativity and the strange world of quantum mechanics.',
    },
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    character: 'Pythagoras',
    icon: '📐',
    description: 'Learn algebra, calculus, geometry, and more',
    quote: '"Number rules the universe."',
    themeColor: '#ffd700', // Gold
    pedestalColor: '#aa8800',
    spotlightColor: '#ffd700',
    greeting: 'Welcome, seeker of truth! The beauty of numbers awaits.',
    modelPath: '/models/pythagoras.glb',
    geometryType: 'philosopher',
    passionateIntro:
      'Mathematics is the language in which the gods have written the universe! In numbers and shapes, we find perfect truth - unchanging, eternal, beautiful. When I discovered that the square on the hypotenuse equals the sum of squares on the other sides, I wept at the perfection of it. This same perfection awaits you in every theorem, every proof, every elegant solution.',
    diagnosticOpener:
      'Tell me, what draws you to the study of numbers and shapes? Have you encountered a mathematical puzzle that intrigued you?',
    subjectTopics: [
      'arithmetic',
      'algebra',
      'geometry',
      'trigonometry',
      'calculus',
    ],
    levelDescriptions: {
      beginner:
        'Let us start with the foundations - numbers, equations, and basic geometric truths.',
      intermediate:
        'You have mastered the basics! We shall explore functions, proofs, and trigonometry.',
      advanced:
        'Excellent! We can venture into calculus, complex numbers, and abstract reasoning.',
    },
  },
  {
    id: 'history',
    name: 'History',
    character: 'Herodotus',
    icon: '🏛️',
    description: 'Explore civilizations, events, and historical figures',
    quote: '"Great deeds are usually wrought at great risks."',
    themeColor: '#cd7f32', // Bronze
    pedestalColor: '#8b4513',
    spotlightColor: '#cd7f32',
    greeting: 'Greetings, traveler! Let me tell you tales of ages past.',
    modelPath: '/models/herodotus.glb',
    geometryType: 'historian',
    passionateIntro:
      'I have walked the lands of Egypt, Persia, and Greece, recording the great deeds and follies of mankind! History is not a dusty collection of dates - it is the living memory of humanity. Every war, every treaty, every rise and fall of empires teaches us who we are. Through history, we speak with the dead and prepare for the future.',
    diagnosticOpener:
      'What era or civilization calls to you? Perhaps a battle that changed the world, or a figure whose life fascinates you?',
    subjectTopics: [
      'ancient civilizations',
      'medieval history',
      'modern history',
      'world wars',
      'cultural history',
    ],
    levelDescriptions: {
      beginner:
        'We shall explore the great stories - the rise of civilizations, legendary figures, and pivotal moments.',
      intermediate:
        'You know the stories! Let us analyze causes, connections, and the forces that shape events.',
      advanced:
        'Splendid! We can debate historiography, examine primary sources, and challenge accepted narratives.',
    },
  },
  {
    id: 'biology',
    name: 'Biology',
    character: 'Charles Darwin',
    icon: '🧬',
    description: 'Study life sciences, genetics, and ecosystems',
    quote: '"It is not the strongest that survives, but the most adaptable."',
    themeColor: '#228b22', // Forest Green
    pedestalColor: '#145214',
    spotlightColor: '#228b22',
    greeting: 'Hello, naturalist! The wonder of life in all its forms awaits us.',
    modelPath: '/models/darwin.glb',
    geometryType: 'naturalist',
    passionateIntro:
      "When I sailed on the Beagle and saw the finches of the Galapagos, each perfectly adapted to its island, I glimpsed the grand tapestry of life itself! From the smallest bacterium to the mightiest whale, all living things are connected by an unbroken chain of ancestry stretching back billions of years. Every creature is a masterpiece of adaptation, shaped by nature's patient hand.",
    diagnosticOpener:
      'What aspect of the living world fascinates you most? Perhaps the workings of cells, the diversity of species, or how life evolves and adapts?',
    subjectTopics: [
      'cell biology',
      'genetics',
      'evolution',
      'ecology',
      'human biology',
    ],
    levelDescriptions: {
      beginner:
        'Let us discover the basics - cells, organisms, and the wonderful diversity of life on Earth.',
      intermediate:
        'You understand the fundamentals! We can explore genetics, inheritance, and how organisms interact.',
      advanced:
        'Marvelous! We shall delve into molecular biology, evolutionary mechanisms, and complex ecosystems.',
    },
  },
]

/**
 * Get character by subject ID
 */
export function getCharacterById(id) {
  return characters.find((c) => c.id === id)
}

/**
 * Get character index by subject ID
 */
export function getCharacterIndex(id) {
  return characters.findIndex((c) => c.id === id)
}

export default characters
