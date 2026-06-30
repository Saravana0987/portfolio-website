'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Code2, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/data'

const socials = [
  { icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: profile.leetcode, label: 'LeetCode' },
]

export function Footer() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Made with
          <Heart size={14} className="fill-destructive text-destructive" />
          by <span className="font-medium text-foreground">{profile.name}</span>
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
      </div>

      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="glow-primary fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  )
}
