import { BriefcaseBusiness, Check, MapPin } from 'lucide-react'
import { experience } from '@/lib/data'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function Experience() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Currently building"
          title="Experience"
          description="Applying engineering skills to real customer needs and AI-powered products."
        />

        <div className="mx-auto max-w-5xl">
          {experience.map((item) => (
            <Reveal key={`${item.company}-${item.role}`} direction="up">
              <article className="glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:border-primary/40 sm:p-9">
                <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-accent" />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <BriefcaseBusiness size={22} />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-primary">
                        {item.company}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={15} className="text-accent" />
                          {item.location}
                        </span>
                        <span>{item.period}</span>
                        <span>{item.employmentType}</span>
                      </div>
                    </div>
                  </div>

                  <span className="ml-16 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary md:ml-0">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                    {item.status}
                  </span>
                </div>

                <div className="relative mt-8 border-t border-border pt-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Role focus
                  </p>
                  <ul className="grid gap-3 md:grid-cols-3">
                    {item.focus.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
