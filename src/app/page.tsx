
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Workflow, RefreshCcw, Wifi } from 'lucide-react';

const servicesPreviews = [
  { icon: Database, label: 'Custom ERP & CRM' },
  { icon: Workflow, label: 'Workflow Automation' },
  { icon: RefreshCcw, label: 'Legacy Modernization' },
  { icon: Wifi, label: 'Physical-to-Digital Integration' },
];

export default function Home() {
  return (
    <div className="bg-background">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-cyan-500/15 animate-glow-pulse top-[-200px] left-[-200px]" />
        <div className="glow-orb w-[500px] h-[500px] bg-stone-500/10 animate-glow-pulse bottom-[-100px] right-[-150px]" style={{ animationDelay: '2s' }} />
        <div className="glow-orb w-[400px] h-[400px] bg-blue-700/10 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 container flex flex-col items-center text-center py-32">
          <div className="animate-float">
            <Image
              src="/huxleigh-icon.png"
              alt="Huxleigh"
              width={280}
              height={70}
              priority
              className="mb-14 drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            />
          </div>

          <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Engineering<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
              Operational
            </span><br />
            Infrastructure
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Huxleigh builds software products and deploys custom technical workflows for operationally complex industries.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-300"
            >
              <Link href="/HTBase">
                Explore HTBase
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-500/40 bg-stone-500/5 hover:bg-stone-500/10 hover:border-stone-400/50 text-stone-200 backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/services">
                Systems Consulting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Dual Pathway Split ── */}
      <section className="relative py-24 border-y border-white/10 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/8 animate-glow-pulse top-1/2 left-[-150px] -translate-y-1/2" />
        <div className="glow-orb w-[500px] h-[500px] bg-stone-500/8 animate-glow-pulse top-1/2 right-[-150px] -translate-y-1/2" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Two Tracks. One Studio.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10">

            {/* ── Products Track ── */}
            <div className="glass p-10 lg:border-r border-b lg:border-b-0 border-white/10 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/40" />
                <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase shrink-0">Software Products</p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/40" />
              </div>

              <div className="flex flex-col gap-4">
                {/* HTBase */}
                <Link
                  href="/HTBase"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <span className="text-cyan-400 font-headline font-black text-xs">HT</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline font-bold text-white text-sm">HTBase</h3>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      AI-assisted ERP for teams that need a platform that works the way they do.
                    </p>
                  </div>
                </Link>

                {/* Project Go */}
                <Link
                  href="/hardware/project-go"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                    <span className="text-red-400 font-headline font-black text-xs">GO</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline font-bold text-white text-sm">Project Go</h3>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Portable AI smart assistant built for professionals on the move.
                    </p>
                  </div>
                </Link>
              </div>

              <Button
                asChild
                className="mt-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_35px_rgba(34,211,238,0.35)] transition-all"
              >
                <Link href="/HTBase">
                  Explore HTBase
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ── Services Track ── */}
            <div className="glass p-10 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-500/40" />
                <p className="text-stone-400 text-xs font-semibold tracking-widest uppercase shrink-0">Technical Consulting</p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-500/40" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {servicesPreviews.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/3"
                  >
                    <Icon className="h-4 w-4 text-stone-400 shrink-0" />
                    <span className="text-xs text-muted-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                From custom ERP development to physical-to-digital integrations — we scope, build, and deploy operational systems end-to-end.
              </p>

              <Button
                asChild
                variant="outline"
                className="mt-auto border-stone-500/40 bg-stone-500/5 hover:bg-stone-500/10 hover:border-stone-400/50 text-stone-200 transition-all duration-300"
              >
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Studio Strip ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl border border-white/10 glass overflow-hidden">
            {[
              { label: 'Custom-Built', sub: 'Systems scoped to your operation — never generic, never off-the-shelf.' },
              { label: 'Deployed Infrastructure', sub: 'We don\'t hand off a codebase. We deploy working systems your team can operate.' },
              { label: 'Operationally Focused', sub: 'Every decision is made through the lens of real-world workflow efficiency.' },
            ].map(({ label, sub }) => (
              <div key={label} className="px-10 py-10 flex flex-col gap-3">
                <h3 className="font-headline font-bold text-white text-lg">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
