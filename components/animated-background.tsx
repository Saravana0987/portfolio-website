'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000 }

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.min(
        90,
        Math.floor((canvas.width * canvas.height) / 18000),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(96, 165, 250, 0.6)'
        ctx.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // mouse interaction
        const md = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y)
        if (md < 160) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.22 * (1 - md / 160)})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    setup()
    draw()
    window.addEventListener('resize', setup)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseout', handleLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setup)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseout', handleLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* glowing blobs */}
      <div className="animate-blob absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="animate-blob absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-3xl [animation-delay:3s]" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl [animation-delay:6s]" />
      {/* particle canvas */}
      <canvas ref={canvasRef} className="h-full w-full opacity-70" aria-hidden="true" />
    </div>
  )
}
