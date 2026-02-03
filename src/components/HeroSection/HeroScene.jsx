import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CharacterStage from './CharacterStage'
import EnvironmentEffects from './EnvironmentEffects'
import { characters } from '../../utils/characterData'

/**
 * Main 3D scene with lighting, camera, and stage
 */
function HeroScene({
  selectedIndex,
  hoveredIndex,
  onCharacterClick,
  onCharacterHover,
  reducedMotion,
}) {
  const cameraRef = useRef()
  const targetCameraPosition = useRef({ x: 0, y: 3.5, z: 8 })
  const targetLookAt = useRef({ x: 0, y: 1, z: 0 })

  // Calculate stage rotation based on selected character
  const targetRotation = (-selectedIndex / characters.length) * Math.PI * 2

  // Update camera target when selection changes
  useEffect(() => {
    // Camera zooms in slightly when a character is focused
    if (selectedIndex !== null) {
      targetCameraPosition.current = { x: 0, y: 3, z: 6.5 }
      targetLookAt.current = { x: 0, y: 1.2, z: 0 }
    } else {
      targetCameraPosition.current = { x: 0, y: 3.5, z: 8 }
      targetLookAt.current = { x: 0, y: 1, z: 0 }
    }
  }, [selectedIndex])

  // Smooth camera movement
  useFrame(() => {
    if (!cameraRef.current) return

    const cam = cameraRef.current
    const speed = reducedMotion ? 1 : 0.05

    // Lerp camera position
    cam.position.x += (targetCameraPosition.current.x - cam.position.x) * speed
    cam.position.y += (targetCameraPosition.current.y - cam.position.y) * speed
    cam.position.z += (targetCameraPosition.current.z - cam.position.z) * speed

    // Update camera look target
    cam.lookAt(
      targetLookAt.current.x,
      targetLookAt.current.y,
      targetLookAt.current.z
    )
  })

  const selectedColor = selectedIndex !== null
    ? characters[selectedIndex].themeColor
    : '#00d4ff'

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 3.5, 8]}
        fov={50}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Key light from above */}
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#ffffff" />

      {/* Rim lights */}
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#7b2cbf" />
      <pointLight position={[5, 3, -5]} intensity={0.3} color="#00d4ff" />

      {/* Stage with characters */}
      <CharacterStage
        selectedIndex={selectedIndex}
        hoveredIndex={hoveredIndex}
        onCharacterClick={onCharacterClick}
        onCharacterHover={onCharacterHover}
        targetRotation={targetRotation}
        reducedMotion={reducedMotion}
      />

      {/* Environment effects */}
      <EnvironmentEffects
        selectedColor={selectedColor}
        reducedMotion={reducedMotion}
      />
    </>
  )
}

export default HeroScene
