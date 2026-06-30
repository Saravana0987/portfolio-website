'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom'

const offset = 40

const buildVariants = (direction: Direction): Variants => {
  const hidden: Record<string, number> = { opacity: 0 }
  if (direction === 'up') hidden.y = offset
  if (direction === 'down') hidden.y = -offset
  if (direction === 'left') hidden.x = offset
  if (direction === 'right') hidden.x = -offset
  if (direction === 'zoom') hidden.scale = 0.92

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  }
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      variants={buildVariants(direction)}
    >
      {children}
    </motion.div>
  )
}
