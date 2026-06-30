'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Code2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { heroStats, profile, roles } from '@/lib/data'

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 110

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400)
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return text
}

const socials = [
  { icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: profile.leetcode, label: 'LeetCode' },
]

const floatingCards = [
  { ...heroStats[0], className: '-left-4 top-6 sm:-left-8' },
  { ...heroStats[1], className: '-right-4 top-1/4 sm:-right-10' },
  { ...heroStats[2], className: 'bottom-10 -left-2 sm:-left-10' },
  { ...heroStats[3], className: '-right-2 bottom-4 sm:-right-8' },
]

export function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-24 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <span aria-hidden="true">👋</span> Hello, I&apos;m
          </p>
          <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <span className="text-gradient">R. Saravana</span>
          </h1>

          <div className="mt-4 flex h-9 items-center text-xl font-medium text-foreground sm:text-2xl">
            <span className="text-muted-foreground">I&apos;m a&nbsp;</span>
            <span className="text-accent">{typed}</span>
            <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-accent" />
          </div>

          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={profile.resume}
              download
              className="flex items-center gap-2 rounded-lg border border-border bg-muted px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center lg:max-w-md"
        >
          {/* glowing rotating border */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent opacity-70 blur-2xl" />
          <div className="absolute inset-8 animate-spin rounded-full border-2 border-dashed border-primary/40 [animation-duration:18s]" />
          <div className="relative aspect-square w-[70%] overflow-hidden rounded-full border-2 border-border glow-primary">
            <Image
              src="/profile.png"
              alt="Portrait of R. Saravana"
              fill
              priority
              sizes="(max-width: 768px) 70vw, 320px"
              className="object-cover"
            />
          </div>

          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`animate-float absolute glass rounded-2xl px-4 py-3 text-center shadow-xl ${card.className}`}
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <p className="font-heading text-xl font-bold text-gradient">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
