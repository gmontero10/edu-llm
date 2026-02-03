import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Ambient particles and atmospheric effects
 */
function EnvironmentEffects({ selectedColor, reducedMotion }) {
  const particlesRef = useRef()
  const particleCount = reducedMotion ? 50 : 200

  // Generate particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a cylinder around the stage
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 5
      const height = Math.random() * 8 - 2

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      scales[i] = Math.random() * 0.5 + 0.5
    }

    return { positions, scales }
  }, [particleCount])

  // Animate particles
  useFrame((state) => {
    if (reducedMotion || !particlesRef.current) return

    const time = state.clock.elapsedTime
    const positions = particlesRef.current.geometry.attributes.position.array

    for (let i = 0; i < particleCount; i++) {
      // Gentle floating motion
      positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.002

      // Slow rotation
      const x = positions[i * 3]
      const z = positions[i * 3 + 2]
      const angle = Math.atan2(z, x) + 0.0005
      const radius = Math.sqrt(x * x + z * z)
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 2] = Math.sin(angle) * radius

      // Wrap around vertically
      if (positions[i * 3 + 1] > 6) {
        positions[i * 3 + 1] = -2
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  const particleColor = useMemo(() => {
    return new THREE.Color(selectedColor || '#00d4ff')
  }, [selectedColor])

  return (
    <>
      {/* Ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={particleColor}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Fog effect */}
      <fog attach="fog" args={['#1a1a2e', 8, 20]} />

      {/* Ground glow */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.05}
        />
      </mesh>
    </>
  )
}

export default EnvironmentEffects
