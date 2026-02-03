import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Character from './Character'
import { characters } from '../../utils/characterData'

/**
 * Rotating circular stage with 4 character pedestals
 */
function CharacterStage({
  selectedIndex,
  hoveredIndex,
  onCharacterClick,
  onCharacterHover,
  targetRotation,
  reducedMotion,
}) {
  const stageRef = useRef()
  const currentRotation = useRef(0)

  // Calculate character positions around the stage
  const characterPositions = useMemo(() => {
    const radius = 2.5
    return characters.map((_, index) => {
      const angle = (index / characters.length) * Math.PI * 2
      return {
        position: [Math.sin(angle) * radius, 0, Math.cos(angle) * radius],
        rotation: [0, -angle + Math.PI, 0], // Face outward
      }
    })
  }, [])

  // Smooth stage rotation
  useFrame(() => {
    if (!stageRef.current) return

    if (reducedMotion) {
      // Instant rotation for reduced motion
      currentRotation.current = targetRotation
    } else {
      // Smooth spring animation
      const diff = targetRotation - currentRotation.current

      // Handle wrap-around for shortest path
      let adjustedDiff = diff
      if (diff > Math.PI) adjustedDiff = diff - Math.PI * 2
      if (diff < -Math.PI) adjustedDiff = diff + Math.PI * 2

      currentRotation.current += adjustedDiff * 0.08
    }

    stageRef.current.rotation.y = currentRotation.current
  })

  return (
    <group ref={stageRef}>
      {/* Main circular platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 4, 0.2, 64]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Inner decorative ring */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.2, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Outer decorative ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.3, 3.5, 64]} />
        <meshStandardMaterial
          color="#7b2cbf"
          emissive="#7b2cbf"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Radial lines on platform */}
      {characters.map((_, index) => {
        const angle = (index / characters.length) * Math.PI * 2
        return (
          <mesh
            key={`line-${index}`}
            position={[0, 0.02, 0]}
            rotation={[-Math.PI / 2, angle, 0]}
          >
            <planeGeometry args={[0.02, 3.5]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.1}
            />
          </mesh>
        )
      })}

      {/* Characters */}
      {characters.map((character, index) => (
        <Character
          key={character.id}
          character={character}
          position={characterPositions[index].position}
          rotation={characterPositions[index].rotation}
          isSelected={selectedIndex === index}
          isHovered={hoveredIndex === index}
          onClick={() => onCharacterClick(index)}
          onPointerEnter={() => onCharacterHover(index)}
          onPointerLeave={() => onCharacterHover(null)}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}

export default CharacterStage
