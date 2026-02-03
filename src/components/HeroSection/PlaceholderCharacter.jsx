import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Geometric placeholder character - styled figures representing each subject
 */
function PlaceholderCharacter({ character, isSelected, isHovered, reducedMotion }) {
  const groupRef = useRef()
  const headRef = useRef()
  const bodyRef = useRef()

  const color = useMemo(() => new THREE.Color(character.themeColor), [character.themeColor])

  // Idle breathing animation
  useFrame((state) => {
    if (reducedMotion) return

    const time = state.clock.elapsedTime

    if (groupRef.current) {
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.05

      // Slight rotation when hovered
      if (isHovered) {
        groupRef.current.rotation.y = Math.sin(time * 2) * 0.1
      }
    }

    if (headRef.current) {
      // Head bob
      headRef.current.position.y = 1.6 + Math.sin(time * 2) * 0.02
    }
  })

  // Different body styles based on character type
  const renderBody = () => {
    switch (character.geometryType) {
      case 'scientist':
        return (
          <>
            {/* Einstein-like figure - wild hair, lab coat */}
            <mesh ref={headRef} position={[0, 1.6, 0]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.3 : 0.1} />
            </mesh>
            {/* Wild hair */}
            {[...Array(8)].map((_, i) => (
              <mesh key={i} position={[
                Math.cos(i * Math.PI / 4) * 0.2,
                1.75 + Math.random() * 0.1,
                Math.sin(i * Math.PI / 4) * 0.2
              ]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#cccccc" />
              </mesh>
            ))}
            {/* Body - lab coat shape */}
            <mesh ref={bodyRef} position={[0, 0.9, 0]}>
              <cylinderGeometry args={[0.2, 0.35, 1.2, 8]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Coat details */}
            <mesh position={[0, 0.3, 0.02]}>
              <boxGeometry args={[0.5, 0.6, 0.05]} />
              <meshStandardMaterial color={color} opacity={0.5} transparent />
            </mesh>
          </>
        )

      case 'philosopher':
        return (
          <>
            {/* Pythagoras - bearded figure with robe */}
            <mesh ref={headRef} position={[0, 1.6, 0]}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.3 : 0.1} />
            </mesh>
            {/* Beard */}
            <mesh position={[0, 1.4, 0.1]}>
              <coneGeometry args={[0.15, 0.3, 8]} />
              <meshStandardMaterial color="#8b7355" />
            </mesh>
            {/* Laurel wreath hint */}
            <mesh position={[0, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.2, 0.03, 8, 16]} />
              <meshStandardMaterial color="#90ee90" />
            </mesh>
            {/* Flowing robe */}
            <mesh ref={bodyRef} position={[0, 0.8, 0]}>
              <coneGeometry args={[0.4, 1.4, 8]} />
              <meshStandardMaterial color="#f0e68c" />
            </mesh>
          </>
        )

      case 'historian':
        return (
          <>
            {/* Herodotus - ancient Greek historian */}
            <mesh ref={headRef} position={[0, 1.6, 0]}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.3 : 0.1} />
            </mesh>
            {/* Scroll */}
            <mesh position={[0.35, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
              <meshStandardMaterial color="#f5deb3" />
            </mesh>
            {/* Greek chiton */}
            <mesh ref={bodyRef} position={[0, 0.85, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 1.3, 6]} />
              <meshStandardMaterial color="#deb887" />
            </mesh>
            {/* Belt */}
            <mesh position={[0, 0.9, 0]}>
              <torusGeometry args={[0.28, 0.03, 8, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        )

      case 'naturalist':
        return (
          <>
            {/* Darwin - Victorian naturalist */}
            <mesh ref={headRef} position={[0, 1.6, 0]}>
              <sphereGeometry args={[0.23, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.3 : 0.1} />
            </mesh>
            {/* Big beard */}
            <mesh position={[0, 1.35, 0.08]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#d3d3d3" />
            </mesh>
            {/* Victorian coat */}
            <mesh ref={bodyRef} position={[0, 0.85, 0]}>
              <cylinderGeometry args={[0.22, 0.32, 1.3, 8]} />
              <meshStandardMaterial color="#2f4f4f" />
            </mesh>
            {/* Leaf/nature element */}
            <mesh position={[-0.3, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <coneGeometry args={[0.08, 0.2, 4]} />
              <meshStandardMaterial color="#228b22" />
            </mesh>
          </>
        )

      default:
        return (
          <mesh ref={bodyRef} position={[0, 1, 0]}>
            <capsuleGeometry args={[0.3, 1, 8, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef} scale={isSelected ? 1.1 : isHovered ? 1.05 : 1}>
      {renderBody()}

      {/* Selection glow ring */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  )
}

export default PlaceholderCharacter
