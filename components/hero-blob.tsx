"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import type { Mesh } from "three"

function AnimatedBlob() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
  })

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#77d7e7"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  )
}

export function HeroBlob() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a78bfa" />
        <AnimatedBlob />
      </Canvas>
    </div>
  )
}
