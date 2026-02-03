import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Mini 3D avatar for chat header - shows character bust with idle animation
 */
function ChatAvatar({ character }) {
  const groupRef = useRef()
  const color = useMemo(() => new THREE.Color(character.themeColor), [character.themeColor])

  // Subtle idle animation
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime

    // Gentle bob
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.02

    // Slight rotation
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
  })

  // Render appropriate bust based on character type
  const renderBust = () => {
    switch (character.geometryType) {
      case 'scientist':
        return (
          <>
            {/* Einstein head */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Wild hair */}
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[
                Math.cos(i * Math.PI / 3) * 0.18,
                0.45 + Math.random() * 0.08,
                Math.sin(i * Math.PI / 3) * 0.18
              ]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshStandardMaterial color="#cccccc" />
              </mesh>
            ))}
            {/* Shoulders */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 0.3, 8]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </>
        )

      case 'philosopher':
        return (
          <>
            {/* Pythagoras head */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Beard */}
            <mesh position={[0, 0.15, 0.08]}>
              <coneGeometry args={[0.12, 0.2, 8]} />
              <meshStandardMaterial color="#8b7355" />
            </mesh>
            {/* Laurel */}
            <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.18, 0.02, 6, 12]} />
              <meshStandardMaterial color="#90ee90" />
            </mesh>
            {/* Shoulders */}
            <mesh position={[0, -0.05, 0]}>
              <coneGeometry args={[0.25, 0.3, 8]} />
              <meshStandardMaterial color="#f0e68c" />
            </mesh>
          </>
        )

      case 'historian':
        return (
          <>
            {/* Herodotus head */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Shoulders */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[0.18, 0.25, 0.25, 6]} />
              <meshStandardMaterial color="#deb887" />
            </mesh>
            {/* Belt hint */}
            <mesh position={[0, 0.02, 0]}>
              <torusGeometry args={[0.2, 0.02, 6, 12]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        )

      case 'naturalist':
        return (
          <>
            {/* Darwin head */}
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.23, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Big beard */}
            <mesh position={[0, 0.12, 0.06]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#d3d3d3" />
            </mesh>
            {/* Victorian coat shoulders */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[0.18, 0.22, 0.25, 8]} />
              <meshStandardMaterial color="#2f4f4f" />
            </mesh>
          </>
        )

      default:
        return (
          <mesh position={[0, 0.15, 0]}>
            <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {/* Lighting for avatar */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 2]} intensity={0.8} />
      <pointLight position={[-1, 1, 1]} intensity={0.3} color={character.themeColor} />

      {/* Avatar bust */}
      {renderBust()}
    </group>
  )
}

export default ChatAvatar
