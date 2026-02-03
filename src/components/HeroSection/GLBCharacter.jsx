import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Loads and renders a GLB model for a character
 */
function GLBCharacter({ character, isSelected, isHovered, reducedMotion }) {
  const groupRef = useRef()
  const { scene } = useGLTF(character.modelPath)

  // Clone the scene to avoid sharing materials between instances
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Idle animation
  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return

    const time = state.clock.elapsedTime

    // Subtle breathing/floating motion
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.03

    // Slight rotation when hovered
    if (isHovered && !isSelected) {
      groupRef.current.rotation.y = Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={isSelected ? 1.05 : isHovered ? 1.02 : 1}>
      <primitive
        object={scene}
        scale={character.modelScale || 1}
        position={character.modelPosition || [0, 0, 0]}
        rotation={character.modelRotation || [0, 0, 0]}
      />

      {/* Selection glow ring */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.9, 32]} />
          <meshBasicMaterial
            color={character.themeColor}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  )
}

// Preload the model
GLBCharacter.preload = (path) => {
  useGLTF.preload(path)
}

export default GLBCharacter
