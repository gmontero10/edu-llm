import { useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './HeroScene'
import SelectionUI from './SelectionUI'
import NavigationControls from './NavigationControls'
import FallbackCarousel from './FallbackCarousel'
import { useWebGPUSupport } from '../../hooks/useWebGPUSupport'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { characters } from '../../utils/characterData'

/**
 * Main HeroSection - 3D character select screen
 */
function HeroSection({ onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const { tier, isLoading } = useWebGPUSupport()
  const reducedMotion = useReducedMotion()

  const handleCharacterClick = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  const handleCharacterHover = useCallback((index) => {
    setHoveredIndex(index)
  }, [])

  const handleNavigate = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  const handleBeginLearning = useCallback((character) => {
    // Transform character data to match expected subject format
    const subject = {
      id: character.id,
      name: character.name,
      icon: character.icon,
      description: character.description,
    }
    onSelect(subject)
  }, [onSelect])

  // Loading state
  if (isLoading) {
    return (
      <div className="hero-container hero-loading">
        <div className="hero-loading-spinner" aria-label="Loading 3D scene" />
      </div>
    )
  }

  // Fallback for non-WebGL browsers
  if (tier === 'fallback') {
    return <FallbackCarousel onSelect={handleBeginLearning} />
  }

  return (
    <div className="hero-container">
      {/* 3D Canvas */}
      <div className="hero-canvas-container">
        <Canvas
          shadows
          dpr={[1, tier === 'webgpu' ? 2 : 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <color attach="background" args={['#1a1a2e']} />
          <Suspense fallback={null}>
            <HeroScene
              selectedIndex={selectedIndex}
              hoveredIndex={hoveredIndex}
              onCharacterClick={handleCharacterClick}
              onCharacterHover={handleCharacterHover}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="hero-ui-overlay">
        <header className="hero-header">
          <h1 className="hero-title">Choose Your Tutor</h1>
          <p className="hero-subtitle">Learn from history's greatest minds</p>
        </header>

        <SelectionUI
          selectedIndex={selectedIndex}
          onBeginLearning={handleBeginLearning}
        />

        <NavigationControls
          selectedIndex={selectedIndex}
          onNavigate={handleNavigate}
          onSelect={handleBeginLearning}
        />
      </div>

      {/* Screen reader announcements */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedIndex !== null && (
          `Selected ${characters[selectedIndex].character}, ${characters[selectedIndex].name} tutor`
        )}
      </div>
    </div>
  )
}

export default HeroSection
