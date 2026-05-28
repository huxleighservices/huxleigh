
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesOfferings } from '@/lib/data';

const engagementSteps = [
  {
    step: '01',
    label: 'Discovery',
    desc: 'We map your current operational landscape — tools, data flows, integrations, and bottlenecks — to establish a clear technical scope before a single line of code is written.',
  },
  {
    step: '02',
    label: 'Scoping',
    desc: 'A detailed project plan with timeline, milestones, and deliverables. Fixed-scope or retainer — we align on structure before we build.',
  },
  {
    step: '03',
    label: 'Build',
    desc: 'Our engineering team develops your system iteratively with staged delivery and regular check-ins. You see progress, not just promises.',
  },
  {
    step: '04',
    label: 'Deploy',
    desc: 'We manage the full deployment — infrastructure provisioning, data migration, and user onboarding. The system goes live ready to operate.',
  },
  {
    step: '05',
    label: 'Support',
    desc: 'Post-launch monitoring, bug resolution, and ongoing iteration as your operation scales or evolves. We stay in it.',
  },
];

const capabilities = [
  'REST & GraphQL API development',
  'Database design and migration',
  'Cloud infrastructure setup (GCP, AWS, Firebase)',
  'Mobile & web application builds',
  'Hardware/firmware integration',
  'Business intelligence & reporting pipelines',
  'Authentication, permissions, and compliance',
  'Third-party SaaS integrations',
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="relative border-b border-white/10 py-24 md:py-36 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-stone-500/12 animate-glow-pulse top-[-150px] left-1/2 -translate-x-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/8 animate-glow-pulse bottom-[-50px] right-[-50px]" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 grid-overlay" />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-stone-400 font-semibold tracking-widest uppercase text-xs mb-4">Systems Consulting</p>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Custom Systems.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-stone-200 to-white">
                Built to Operate.
              </span>
            </h1>
            <p className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
              We scope, build, and deploy operational infrastructure for businesses that have outgrown generic software — or never found the right fit to begin with.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-stone-500/50 bg-stone-500/8 hover:bg-stone-500/15 hover:border-stone-400/60 text-stone-100 font-bold px-8 backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 hover:bg-white/8 hover:border-white/25 backdrop-blur-sm transition-all duration-300"
              >
                <a href="mailto:service@huxleigh.com">
                  service@huxleigh.com
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Focus Areas ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-stone-500/8 animate-glow-pulse top-1/2 left-[-100px] -translate-y-1/2" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-stone-400 font-semibold tracking-widest uppercase text-xs mb-3">What We Build</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">
              Focus Areas
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Operationally complex problems. Purpose-built solutions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {servicesOfferings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 flex flex-col gap-5 hover:border-stone-500/30 hover:shadow-[0_0_40px_rgba(120,113,108,0.08)] transition-all duration-400 group"
              >
                <div className="p-3 bg-stone-500/10 rounded-xl w-fit border border-stone-500/15 group-hover:bg-stone-500/15 transition-colors">
                  <offering.icon className="h-6 w-6 text-stone-300" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-white text-lg mb-2">{offering.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{offering.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {offering.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-stone-400 bg-stone-500/10 border border-stone-500/20 rounded-md px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Model ── */}
      <section className="py-24 border-y border-white/10 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-stone-500/8 animate-glow-pulse top-0 right-0" style={{ animationDelay: '1s' }} />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-stone-400 font-semibold tracking-widest uppercase text-xs mb-3">How We Work</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">
              Engagement Model
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto flex flex-col gap-0">
            {engagementSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-stone-500/15 border border-stone-500/25 flex items-center justify-center shrink-0 group-hover:bg-stone-500/25 transition-colors">
                    <span className="font-headline font-black text-xs text-stone-300">{step.step}</span>
                  </div>
                  {index < engagementSteps.length - 1 && (
                    <div className="w-px flex-1 bg-white/8 my-2" />
                  )}
                </div>
                <div className={`pb-10 ${index === engagementSteps.length - 1 ? 'pb-0' : ''}`}>
                  <h3 className="font-headline font-bold text-white text-lg leading-none mb-2 mt-2">{step.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/6 animate-glow-pulse bottom-0 left-0" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-stone-400 font-semibold tracking-widest uppercase text-xs mb-3">Technical Stack</p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
                Full-Stack Delivery.<br />
                <span className="text-muted-foreground font-semibold">End to End.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We handle the complete build — frontend, backend, infrastructure, and integration. No subcontracting, no handoffs to external teams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <ul className="space-y-3">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-stone-400 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-stone-500/10 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Scope<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-white">
              Your Project?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Every engagement starts with a discovery call. No commitment, no pitch deck — just a direct conversation about your operational problem and whether we're the right team to solve it.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-stone-500/50 bg-stone-500/8 hover:bg-stone-500/15 hover:border-stone-400/60 text-stone-100 font-bold px-10 backdrop-blur-sm transition-all duration-300"
          >
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
