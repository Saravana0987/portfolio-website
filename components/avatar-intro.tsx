'use client'

import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const introduction =
  "Hi, I'm R. Saravana, a Forward Deployed Engineer Intern at Vilasat AI LLC and a full-stack developer from Andhra Pradesh, India. I build AI-powered solutions and web applications using Python, React, Node.js, and AWS. I've solved more than 500 problems on LeetCode and built projects including Chatter and YogaHub. Explore my portfolio to learn more about my projects, skills, certifications, and experience. If you'd like to work together, feel free to get in touch."

export function AvatarIntro() {
  const [supported, setSupported] = useState(false)
  const [muted, setMuted] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSupported('speechSynthesis' in window)

    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  function toggleMute() {
    if (!supported) {
      setError('Voice playback is not supported in this browser.')
      return
    }

    if (!muted) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      setMuted(true)
      return
    }

    const utterance = new SpeechSynthesisUtterance(introduction)
    utterance.lang = 'en-IN'
    utterance.onend = () => {
      setSpeaking(false)
      setMuted(true)
    }
    utterance.onerror = (event) => {
      if (event.error === 'canceled' || event.error === 'interrupted') {
        return
      }

      setSpeaking(false)
      setMuted(true)
      setError('Voice playback failed. Please try again.')
    }

    setError('')
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setMuted(false)
    setSpeaking(true)
  }

  return (
    <div className="absolute bottom-7 right-8 z-20 flex flex-col items-end gap-2">
      {error && (
        <p
          className="max-w-48 rounded-lg bg-background/90 px-3 py-2 text-xs text-foreground"
          role="status"
        >
          {error}
        </p>
      )}
      <div className="glass flex items-center gap-2 rounded-full p-1 sm:gap-3 sm:px-3 sm:py-2">
        <span
          className="hidden h-5 items-center gap-0.5 sm:flex"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className="w-1 rounded-full bg-primary motion-safe:animate-bounce"
              style={{
                height: `${8 + (bar % 2) * 6}px`,
                animationDelay: `${bar * 120}ms`,
              }}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={toggleMute}
          disabled={!supported}
          aria-label={muted ? 'Unmute introduction' : 'Mute introduction'}
          aria-pressed={!muted}
          title={!supported ? 'Voice playback is not supported in this browser' : undefined}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:size-auto sm:gap-2 sm:rounded-none sm:bg-transparent sm:px-1 sm:text-foreground sm:hover:bg-transparent sm:hover:text-primary"
        >
          {muted ? (
            <VolumeX size={16} aria-hidden="true" />
          ) : (
            <Volume2 size={16} aria-hidden="true" />
          )}
          <span className="hidden text-xs font-semibold uppercase tracking-wider sm:inline">
            {muted ? 'Unmute' : 'Mute'}
          </span>
        </button>
        <span className="sr-only" aria-live="polite">
          {speaking ? 'Introduction is playing' : 'Introduction is muted'}
        </span>
      </div>
    </div>
  )
}
