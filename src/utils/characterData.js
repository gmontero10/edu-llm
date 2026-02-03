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
    diagnosticQuestions: [
      {
        question: 'What happens when you drop a ball from a height?',
        options: [
          { text: 'It floats upward', level: 'beginner' },
          { text: 'It falls due to gravity', level: 'beginner' },
          { text: 'It accelerates at 9.8 m/s²', level: 'intermediate' },
          { text: 'It follows a geodesic in curved spacetime', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'Why does ice float on water?',
        options: [
          { text: 'Ice is colder than water', level: 'beginner' },
          { text: 'Ice is less dense than liquid water', level: 'beginner' },
          { text: 'Hydrogen bonds create an open lattice structure in ice', level: 'intermediate' },
          { text: 'The anomalous expansion of water below 4°C creates density inversion', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is energy?',
        options: [
          { text: 'Something that makes things move', level: 'beginner' },
          { text: 'The ability to do work', level: 'beginner' },
          { text: 'A conserved quantity in isolated systems', level: 'intermediate' },
          { text: 'The time component of the four-momentum vector', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'How do magnets work?',
        options: [
          { text: 'They have a special glue', level: 'beginner' },
          { text: 'They have north and south poles that attract or repel', level: 'beginner' },
          { text: 'Moving electric charges create magnetic fields', level: 'intermediate' },
          { text: 'Electron spin alignment creates magnetic dipole moments', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is light?',
        options: [
          { text: 'Something that helps us see', level: 'beginner' },
          { text: 'A type of wave', level: 'beginner' },
          { text: 'An electromagnetic wave that travels at constant speed', level: 'intermediate' },
          { text: 'Quantized excitations of the electromagnetic field', level: 'advanced' },
        ],
        correctIndex: 1,
      },
    ],
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
    diagnosticQuestions: [
      {
        question: 'What is 7 × 8?',
        options: [
          { text: '54', level: 'beginner' },
          { text: '56', level: 'beginner' },
          { text: '8 × 7 by the commutative property', level: 'intermediate' },
          { text: '2³ × 7 in prime factorization', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is x if 2x + 5 = 13?',
        options: [
          { text: 'I need help with this', level: 'beginner' },
          { text: 'x = 4', level: 'beginner' },
          { text: 'x = 4, found by isolating the variable', level: 'intermediate' },
          { text: 'x ∈ {4} is the solution set of this linear equation', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the Pythagorean theorem?',
        options: [
          { text: 'I don\'t know yet', level: 'beginner' },
          { text: 'a² + b² = c² for right triangles', level: 'beginner' },
          { text: 'The sum of squares of legs equals the hypotenuse squared', level: 'intermediate' },
          { text: 'A special case of the law of cosines when the angle is 90°', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is a function?',
        options: [
          { text: 'A math thing with f(x)', level: 'beginner' },
          { text: 'A rule that gives one output for each input', level: 'beginner' },
          { text: 'A relation where each element maps to exactly one element', level: 'intermediate' },
          { text: 'A morphism in the category of sets', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What does the derivative measure?',
        options: [
          { text: 'I haven\'t learned this yet', level: 'beginner' },
          { text: 'How fast something changes', level: 'beginner' },
          { text: 'The instantaneous rate of change of a function', level: 'intermediate' },
          { text: 'The limit of the difference quotient as h approaches zero', level: 'advanced' },
        ],
        correctIndex: 1,
      },
    ],
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
    diagnosticQuestions: [
      {
        question: 'Who built the Great Pyramid of Giza?',
        options: [
          { text: 'I\'m not sure', level: 'beginner' },
          { text: 'The ancient Egyptians', level: 'beginner' },
          { text: 'Built during Pharaoh Khufu\'s reign around 2560 BCE', level: 'intermediate' },
          { text: 'Constructed using corvée labor during the Old Kingdom\'s Fourth Dynasty', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What caused World War I?',
        options: [
          { text: 'Countries were fighting', level: 'beginner' },
          { text: 'The assassination of Archduke Franz Ferdinand', level: 'beginner' },
          { text: 'A combination of militarism, alliances, imperialism, and nationalism', level: 'intermediate' },
          { text: 'Structural tensions in the European state system exacerbated by the July Crisis', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What was the Renaissance?',
        options: [
          { text: 'Something that happened long ago', level: 'beginner' },
          { text: 'A time of art and learning in Europe', level: 'beginner' },
          { text: 'A cultural movement emphasizing classical learning and humanism', level: 'intermediate' },
          { text: 'A historiographical construct describing 14th-17th century cultural transformations', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'Why did the Roman Empire fall?',
        options: [
          { text: 'It got old', level: 'beginner' },
          { text: 'Invasions by barbarian tribes', level: 'beginner' },
          { text: 'A combination of military, economic, and political factors over centuries', level: 'intermediate' },
          { text: 'A gradual transformation rather than collapse, as argued by Peter Brown\'s Late Antiquity thesis', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is primary source evidence?',
        options: [
          { text: 'The main evidence', level: 'beginner' },
          { text: 'Documents or objects from the time period being studied', level: 'beginner' },
          { text: 'First-hand accounts that require critical analysis for bias', level: 'intermediate' },
          { text: 'Sources requiring hermeneutical interpretation within their historical context', level: 'advanced' },
        ],
        correctIndex: 1,
      },
    ],
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
    diagnosticQuestions: [
      {
        question: 'What is a cell?',
        options: [
          { text: 'A small room', level: 'beginner' },
          { text: 'The basic unit of all living things', level: 'beginner' },
          { text: 'The smallest structural unit capable of independent function', level: 'intermediate' },
          { text: 'A membrane-bound compartment with organelles and genetic material', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is DNA?',
        options: [
          { text: 'Something in our bodies', level: 'beginner' },
          { text: 'The molecule that carries genetic information', level: 'beginner' },
          { text: 'A double helix polymer of nucleotides', level: 'intermediate' },
          { text: 'A nucleic acid encoding genetic instructions via codon sequences', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'How does evolution work?',
        options: [
          { text: 'Animals change over time', level: 'beginner' },
          { text: 'Natural selection favors traits that help survival', level: 'beginner' },
          { text: 'Differential reproductive success leads to changes in allele frequencies', level: 'intermediate' },
          { text: 'Selection acts on phenotypic variation arising from genetic mutation and recombination', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is photosynthesis?',
        options: [
          { text: 'How plants eat', level: 'beginner' },
          { text: 'How plants make food from sunlight', level: 'beginner' },
          { text: 'Converting light energy to chemical energy in glucose', level: 'intermediate' },
          { text: 'Light-dependent and Calvin cycle reactions producing C6H12O6', level: 'advanced' },
        ],
        correctIndex: 1,
      },
      {
        question: 'What is an ecosystem?',
        options: [
          { text: 'Nature and animals', level: 'beginner' },
          { text: 'Living things and their environment interacting together', level: 'beginner' },
          { text: 'A community of organisms plus abiotic factors in energy and nutrient cycles', level: 'intermediate' },
          { text: 'A complex adaptive system with trophic levels and biogeochemical cycling', level: 'advanced' },
        ],
        correctIndex: 1,
      },
    ],
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
