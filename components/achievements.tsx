'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { achievements } from '@/lib/data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="font-heading text-4xl font-bold text-gradient sm:text-5xl">
      {count}
      {suffix}
    </span>
  )
}

export function Achievements() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-8 sm:p-12 lg:grid-cols-4">
          {achievements.map((item) => (
            <div key={item.label} className="text-center">
              <Counter value={item.value} suffix={item.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
