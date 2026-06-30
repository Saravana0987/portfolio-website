'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, Code2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { submitContact, type ContactState } from '@/app/actions'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const initialState: ContactState = { status: 'idle', message: '' }

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: GithubIcon, label: 'GitHub', value: 'Saravana0987', href: profile.github },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'r-saravana',
    href: profile.linkedin,
  },
  { icon: Code2, label: 'LeetCode', value: 'View profile', href: profile.leetcode },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send size={16} />
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  )
}

export function Contact() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <section id="contact" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's Work Together"
          description="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="glass flex h-full flex-col gap-5 rounded-3xl p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                {profile.location}
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Feel free to reach out through any of the channels below. I&apos;m
                open to freelance work, collaborations and full-time
                opportunities.
              </p>
              <ul className="mt-2 flex flex-col gap-3">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-border bg-muted p-3 transition-colors hover:border-primary/50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <item.icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-foreground">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="left">
            <form
              ref={formRef}
              action={formAction}
              className="glass flex h-full flex-col gap-4 rounded-3xl p-8"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="min-h-32 flex-1 resize-none rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {state.status !== 'idle' && (
                <p
                  className={`flex items-center gap-2 text-sm ${
                    state.status === 'success' ? 'text-accent' : 'text-destructive'
                  }`}
                  role="status"
                >
                  {state.status === 'success' && <CheckCircle2 size={16} />}
                  {state.message}
                </p>
              )}

              <SubmitButton />
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
