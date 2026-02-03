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
