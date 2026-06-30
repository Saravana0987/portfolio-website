import { Brain, Cloud, Rocket, Users, type LucideIcon } from 'lucide-react'
import { aboutFeatures } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const icons: Record<string, LucideIcon> = { Brain, Rocket, Users, Cloud }

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Introduction" title="About Me" />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="glass h-full rounded-3xl p-8">
              <p className="text-pretty text-lg leading-relaxed text-foreground">
                Passionate Computer Science graduate with strong knowledge in{' '}
                <span className="text-primary">Full Stack Development</span>,
                Java, Python, React, Node.js, MySQL and AWS.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                I enjoy building scalable applications and solving real-world
                problems with clean, maintainable code. From crafting intuitive
                front-end experiences to architecting reliable back-end systems,
                I love turning ideas into polished products.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutFeatures.map((feature, i) => {
              const Icon = icons[feature.icon]
              return (
                <Reveal key={feature.title} direction="left" delay={i * 0.1}>
                  <div className="glass group h-full rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
