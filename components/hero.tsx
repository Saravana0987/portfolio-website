'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Download, Mail } from 'lucide-react'
import { AvatarIntro } from '@/components/avatar-intro'
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

const highlights = [
  { ...heroStats[0], className: '-left-1 top-14 sm:-left-5' },
  { ...heroStats[1], className: '-right-1 bottom-24 sm:-right-5' },
]

export function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -right-36 top-1/4 size-[34rem] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
            <span className="h-px w-9 bg-primary" />
            Full Stack Developer
            <span className="size-1 rounded-full bg-accent" />
            Andhra Pradesh, India
          </p>

          <h1 className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-[-0.06em] text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
            R. <span className="text-gradient">Saravana</span>
          </h1>

          <div className="mt-7 flex min-h-9 flex-wrap items-center gap-x-2 text-lg font-medium sm:text-xl">
            <span className="text-muted-foreground">I build as a</span>
            <span className="text-accent">{typed}</span>
            <span className="inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </div>

          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_28px_-8px_var(--primary)]"
            >
              Explore my work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={profile.resume}
              download
              className="flex items-center gap-2 rounded-md border border-border bg-background/50 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Download size={16} />
              Download resume
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail size={16} />
              Contact
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto flex aspect-[0.9] w-full max-w-[25rem] items-center justify-center sm:max-w-[29rem]"
        >
          <div className="absolute inset-8 rotate-6 rounded-[2rem] border border-primary/25 bg-primary/5" />
          <div className="absolute inset-5 -rotate-3 rounded-[2rem] border border-accent/20" />
          <div className="absolute inset-6 rounded-full bg-primary/25 blur-[90px]" />

          <div
            className="glow-primary relative h-full w-[88%] overflow-hidden border border-primary/50 bg-background"
            style={{
              clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)',
            }}
          >
            <Image
              src="/profile.png"
              alt="Portrait of R. Saravana"
              fill
              priority
              sizes="(max-width: 768px) 85vw, 460px"
              className="avatar-motion object-cover object-top grayscale-[0.25] contrast-110 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            <AvatarIntro />
          </div>

          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              className={`glass animate-float absolute z-10 rounded-xl px-4 py-3 shadow-xl ${highlight.className}`}
              style={{ animationDelay: `${index * 1.2}s` }}
            >
              <p className="font-heading text-xl font-bold text-primary">
                {highlight.value}
              </p>
              <p className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
                {highlight.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
