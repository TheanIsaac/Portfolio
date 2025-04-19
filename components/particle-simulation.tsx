"use client"

import { useEffect, useRef } from "react"
import { useParticleEffect } from "@/hooks/use-particle-effect"

interface Particle {
  x: number
  y: number
  oldX: number
  oldY: number
  radius: number
  color: string
}

export default function ParticleSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const { isSwirlActive } = useParticleEffect()

  // Initialize the simulation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // Create particles
    const createParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.3), 500)

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        particles.current.push({
          x,
          y,
          oldX: x,
          oldY: y,
          radius,
          color: `hsla(${Math.random() * 360}, 70%, 70%, 0.5)`,
        })
      }
    }

    // Verlet integration step
    const updateParticles = () => {
      const gravity = 0.00
      const friction = 0.99

      // Calculate center of screen for swirl effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const swirlStrength = 0.05
      const pullStrength = 0.0004
      const centerThreshold = 150 // Distance from center to trigger teleportation

      particles.current.forEach((p) => {
        // Calculate velocity from previous position
        const vx = (p.x - p.oldX) * friction
        const vy = (p.y - p.oldY) * friction

        // Save current position
        p.oldX = p.x
        p.oldY = p.y

        // Apply velocity and gravity
        p.x += vx
        p.y += vy + gravity

        // Mouse interaction - repel particles
        const dx = p.x - mousePos.current.x
        const dy = p.y - mousePos.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) * 0.02
          p.x += (dx / distance) * force
          p.y += (dy / distance) * force
        }

        // Apply swirl effect if active
        if (isSwirlActive) {
          // Calculate distance from center
          const dxCenter = p.x - centerX
          const dyCenter = p.y - centerY
          const distanceToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)

          if (distanceToCenter < centerThreshold) {
            // Teleport to a random edge when too close to center
            const edge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left

            switch (edge) {
              case 0: // Top
                p.x = Math.random() * canvas.width
                p.y = 0
                p.oldX = p.x
                p.oldY = p.y - 1 // Give it a slight downward velocity
                break
              case 1: // Right
                p.x = canvas.width
                p.y = Math.random() * canvas.height
                p.oldX = p.x + 1 // Give it a slight leftward velocity
                p.oldY = p.y
                break
              case 2: // Bottom
                p.x = Math.random() * canvas.width
                p.y = canvas.height
                p.oldX = p.x
                p.oldY = p.y + 1 // Give it a slight upward velocity
                break
              case 3: // Left
                p.x = 0
                p.y = Math.random() * canvas.height
                p.oldX = p.x - 1 // Give it a slight rightward velocity
                p.oldY = p.y
                break
            }
          } else {
            // Apply swirl force - combination of pull toward center and perpendicular force for rotation
            const pullFactor = Math.min(1, 100 / distanceToCenter) * pullStrength

            // Pull toward center
            p.x -= dxCenter * pullFactor
            p.y -= dyCenter * pullFactor

            // Add rotation (perpendicular force)
            p.x += (dyCenter * swirlStrength) / distanceToCenter
            p.y -= (dxCenter * swirlStrength) / distanceToCenter
          }
        }

        // Constrain to bounds
        if (p.x < p.radius) {
          p.x = p.radius
          p.oldX = p.x + vx * -0.5
        } else if (p.x > canvas.width - p.radius) {
          p.x = canvas.width - p.radius
          p.oldX = p.x + vx * -0.5
        }

        if (p.y < p.radius) {
          p.y = p.radius
          p.oldY = p.y + vy * -0.5
        } else if (p.y > canvas.height - p.radius) {
          p.y = canvas.height - p.radius
          p.oldY = p.y + vy * -0.5
        }
      })
    }

    // Handle collisions between particles
    const handleCollisions = () => {
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i]

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j]

          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = p1.radius + p2.radius

          if (distance < minDistance) {
            const angle = Math.atan2(dy, dx)
            const targetX = p1.x + Math.cos(angle) * minDistance
            const targetY = p1.y + Math.sin(angle) * minDistance

            const ax = (targetX - p2.x) * 0.05
            const ay = (targetY - p2.y) * 0.05

            p1.x -= ax
            p1.y -= ay
            p2.x += ax
            p2.y += ay
          }
        }
      }
    }

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between nearby particles
      ctx.beginPath()
      ctx.strokeStyle = "rgba(150, 150, 150, 0.05)"

      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i]

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j]

          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.lineWidth = (1 - distance / 150) * 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.current.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // Draw swirl center indicator when active
      /*if (isSwirlActive) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        ctx.beginPath()
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        ctx.stroke()
      } */
    }

    // Animation loop
    const animate = () => {
      updateParticles()
      handleCollisions()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })
    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isSwirlActive]) // Re-run effect when swirl state changes

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}
