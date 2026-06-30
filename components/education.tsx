import { GraduationCap } from 'lucide-react'
import { education } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function Education() {
  return (
    <section id="education" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="My journey" title="Education" />

        <div className="relative pl-8 sm:pl-10">
          {/* vertical line */}
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent sm:left-3.5" />

          <div className="flex flex-col gap-8">
            {education.map((item, i) => (
              <Reveal key={item.degree} direction="left" delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background sm:-left-[1.9rem]">
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                          <GraduationCap size={20} />
                        </span>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.institution}
                          </p>
                        </div>
                      </div>
                      <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {item.score}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
