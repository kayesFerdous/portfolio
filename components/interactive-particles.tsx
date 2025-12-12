"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useEffect, useState } from "react"
import { BufferAttribute, type LineSegments, type Points } from "three"
import * as THREE from "three"

interface ParticleSystemProps {
  count?: number
  mouseX: number
  mouseY: number
}

function ParticleSystem({ count = 200, mouseX, mouseY }: ParticleSystemProps) {
  const pointsRef = useRef<Points>(null!)
  const linesRef = useRef<LineSegments>(null!)
  const { viewport, camera } = useThree()

  // Generate particle positions in 3D space
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = []

    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 3 + Math.random() * 2

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Small random velocities for drift
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      })
    }

    return { positions, velocities }
  }, [count])

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()

    // Drift animation + mouse influence
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Apply drift
      positions[i3] += particles.velocities[i].x
      positions[i3 + 1] += particles.velocities[i].y
      positions[i3 + 2] += particles.velocities[i].z

      // Gentle wave motion
      positions[i3 + 1] += Math.sin(time * 0.3 + positions[i3]) * 0.001

      // Mouse influence (subtle parallax)
      const dx = mouseX * viewport.width * 0.5 - positions[i3]
      const dy = mouseY * viewport.height * 0.5 - positions[i3 + 1]
      positions[i3] += dx * 0.0001
      positions[i3 + 1] += dy * 0.0001
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update connections
    updateLines(positions)

    // Gentle rotation
    pointsRef.current.rotation.y = time * 0.05
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05
    }
  })

  // Draw lines between nearby particles
  const updateLines = (positions: Float32Array) => {
    if (!linesRef.current) return

    const linePositions: number[] = []
    const maxDistance = 1.2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3
        const dx = positions[i3] - positions[j3]
        const dy = positions[i3 + 1] - positions[j3 + 1]
        const dz = positions[i3 + 2] - positions[j3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {
          linePositions.push(positions[i3], positions[i3 + 1], positions[i3 + 2])
          linePositions.push(positions[j3], positions[j3 + 1], positions[j3 + 2])
        }
      }
    }

    linesRef.current.geometry.setAttribute("position", new BufferAttribute(new Float32Array(linePositions), 3))
  }

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#67d7e7"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#67d7e7" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  )
}

export function InteractiveParticles() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
        <ParticleSystem mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </Canvas>
    </div>
  )
}
