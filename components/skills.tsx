import {
  Cloud,
  Database,
  Layout,
  Server,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { skillGroups } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const icons: Record<string, LucideIcon> = {
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
}

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What I work with"
          title="Skills & Technologies"
          description="A versatile toolkit spanning the full stack — from pixel-perfect interfaces to scalable cloud infrastructure."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <Reveal key={group.category} direction="up" delay={i * 0.08}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                  <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
