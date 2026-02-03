import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import PlaceholderCharacter from './PlaceholderCharacter'
import GLBCharacter from './GLBCharacter'

/**
 * Individual character wrapper with pedestal
 * Handles character state and animations
 */
function Character({
  character,
  position,
  rotation,
  isSelected,
  isHovered,
  onClick,
  onPointerEnter,
  onPointerLeave,
  reducedMotion,
}) {
  const pedestalRef = useRef()

  // Pedestal glow animation
  useFrame((state) => {
    if (reducedMotion || !pedestalRef.current) return

    const time = state.clock.elapsedTime
    const intensity = isSelected ? 0.5 + Math.sin(time * 3) * 0.2 : isHovered ? 0.3 : 0.1

    pedestalRef.current.material.emissiveIntensity = intensity
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Pedestal */}
      <mesh
        ref={pedestalRef}
        position={[0, 0.15, 0]}
        onClick={onClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <cylinderGeometry args={[0.6, 0.7, 0.3, 32]} />
        <meshStandardMaterial
          color={character.pedestalColor}
          emissive={character.themeColor}
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Pedestal top */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
        <meshStandardMaterial
          color={character.themeColor}
          emissive={character.themeColor}
          emissiveIntensity={isSelected ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Character on pedestal */}
      <group position={[0, 0.35, 0]}>
        {character.hasModel ? (
          <Suspense fallback={
            <PlaceholderCharacter
              character={character}
              isSelected={isSelected}
              isHovered={isHovered}
              reducedMotion={reducedMotion}
            />
          }>
            <GLBCharacter
              character={character}
              isSelected={isSelected}
              isHovered={isHovered}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        ) : (
          <PlaceholderCharacter
            character={character}
            isSelected={isSelected}
            isHovered={isHovered}
            reducedMotion={reducedMotion}
          />
        )}
      </group>

      {/* Character spotlight */}
      <spotLight
        position={[0, 4, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={isSelected ? 2 : isHovered ? 1.2 : 0.5}
        color={character.spotlightColor}
        castShadow
        target-position={[0, 1, 0]}
      />

      {/* Subject name floating text - visible when selected */}
      {isSelected && (
        <group position={[0, 2.8, 0]}>
          {/* Glow backdrop */}
          <mesh>
            <planeGeometry args={[1.5, 0.4]} />
            <meshBasicMaterial
              color={character.themeColor}
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

export default Character
