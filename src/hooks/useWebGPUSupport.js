import { useState, useEffect } from 'react'

/**
 * Detects WebGPU/WebGL capability for the current browser
 * Returns: { tier: 'webgpu' | 'webgl' | 'fallback', isLoading: boolean }
 */
export function useWebGPUSupport() {
  const [support, setSupport] = useState({ tier: 'fallback', isLoading: true })

  useEffect(() => {
    async function detectSupport() {
      // Check for WebGPU support (Chrome 113+, Safari 18+)
      if ('gpu' in navigator) {
        try {
          const adapter = await navigator.gpu?.requestAdapter()
          if (adapter) {
            setSupport({ tier: 'webgpu', isLoading: false })
            return
          }
        } catch (e) {
          // WebGPU not available, fall through to WebGL check
        }
      }

      // Check for WebGL2 support
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
        if (gl) {
          setSupport({ tier: 'webgl', isLoading: false })
          return
        }
      } catch (e) {
        // WebGL not available
      }

      // Fallback to 2D
      setSupport({ tier: 'fallback', isLoading: false })
    }

    detectSupport()
  }, [])

  return support
}

export default useWebGPUSupport
