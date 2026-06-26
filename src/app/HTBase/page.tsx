
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Download,
  Mail,
  Phone,
  LayoutDashboard,
  Users,
  BarChart3,
  BrainCircuit,
  FolderOpen,
  CalendarDays,
  ListTodo,
  MessageSquare,
  TrendingUp,
  Zap,
  ArrowRight,
  FileSpreadsheet,
  Activity,
  Building2,
  TableProperties,
} from 'lucide-react';

const widgets = [
  {
    icon: <ListTodo className="h-6 w-6 text-cyan-400" />,
    name: 'Task Pipeline',
    desc: 'Kanban and list-view task boards with priority levels, due dates, and assignees.',
  },
  {
    icon: <Users className="h-6 w-6 text-violet-400" />,
    name: 'Team Overview',
    desc: "See every team member's status, active tasks, and recent activity in one glanceable view.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    name: 'Performance Analytics',
    desc: 'Live KPI tracking, custom metric charts, and goal progress — no spreadsheets required.',
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-emerald-400" />,
    name: 'AI Smart Assistant',
    desc: 'An always-on AI layer that surfaces suggestions, flags bottlenecks, and answers questions about your data.',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
    name: 'Deal & Pipeline Tracker',
    desc: 'Visualize your sales pipeline from prospect to close with stage-by-stage tracking.',
  },
  {
    icon: <CalendarDays className="h-6 w-6 text-pink-400" />,
    name: 'Schedule & Deadlines',
    desc: 'Calendar widget with milestone markers, deadline countdowns, and team schedule visibility.',
  },
  {
    icon: <FolderOpen className="h-6 w-6 text-amber-400" />,
    name: 'Resource Library',
    desc: 'Centralized file storage, shared links, and team assets — searchable and always accessible.',
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-teal-400" />,
    name: 'Communications',
    desc: 'In-platform messaging threads pinned to tasks, deals, or team members so context is never lost.',
  },
];

const baseFeatures = [
  {
    icon: <FileSpreadsheet className="h-8 w-8 text-cyan-400" />,
    title: 'Bridge Feature',
    desc: 'Easily plug your existing spreadsheets in using the bridge feature — no rebuilding from scratch.',
  },
  {
    icon: <Activity className="h-8 w-8 text-blue-400" />,
    title: 'Activity Indicators',
    desc: 'Utilize activity indicators to see the whole, moving picture across every person in your pipeline.',
  },
  {
    icon: <Building2 className="h-8 w-8 text-violet-400" />,
    title: 'Department Unity',
    desc: 'Bring Operations, Sales, Human Resources, and Finance together in one unified system like never before.',
  },
];

export default function HTBasePage() {
  return (
    <div className="bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="relative border-b border-white/10 py-24 md:py-36 text-center overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-cyan-500/20 animate-glow-pulse top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-blue-700/15 animate-glow-pulse bottom-[-100px] right-[-50px]" style={{ animationDelay: '2s' }} />
        <div className="glow-orb w-[300px] h-[300px] bg-violet-700/10 animate-glow-pulse bottom-0 left-0" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 grid-overlay" />

        <div className="container flex flex-col items-center relative z-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200 group"
          >
            <span className="text-xs text-stone-500 font-semibold tracking-widest uppercase">A</span>
            <span className="text-xs text-stone-300 font-semibold tracking-widest uppercase group-hover:text-white transition-colors">Huxleigh</span>
            <span className="text-xs text-stone-500 font-semibold tracking-widest uppercase">Product</span>
          </Link>

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            <Zap className="h-3 w-3" />
            Newest Release: Version Fuchsia
          </div>

          <div className="animate-float mb-10">
            <Image
              src="https://preview.redd.it/htbase-gradients-v0-65kk0u62cu7g1.png?width=1080&crop=smart&auto=webp&s=5a43fb34ccdf7532874f95fe72354d8384668dcc"
              alt="HTBase Logo"
              width={420}
              height={105}
              priority
              className="drop-shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            />
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl">
            From Assistant to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
              Full-Blown ERP
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Version Fuchsia takes HTBase to the next level — a complete enterprise resource planning platform built around your team, your departments, and the way you actually operate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-300"
            >
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
            >
              <Link href="https://drive.google.com/uc?export=download&id=1fhLWSh5Lyu4-Nx-pBEcAjD7AFVYKc6Qi" target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download Fact Sheet
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Currently serving agencies in:{' '}
            <span className="text-white font-semibold">Globe Life Liberty National Division</span>
          </p>
        </div>
      </section>

      {/* ── BASE: Card & Hybrid Views ── */}
      <section className="py-24 border-b border-white/10 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 animate-glow-pulse top-0 right-0" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Our Signature, Custom System</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
              Meet BASE
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Each person in your pipeline gets their own card. Every department. Every status. It all comes together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Card View */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-headline text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <LayoutDashboard className="h-5 w-5 text-cyan-400" />
                </div>
                Card View
              </h3>
              <p className="text-muted-foreground mb-6">
                Need a closer look? Open any record and see a full breakdown across every department — Operations, Sales, Human Resources, and Finance — all on one card.
              </p>
              <div className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400">E</div>
                    <div>
                      <div className="font-semibold text-white">Ellie</div>
                      <div className="text-xs text-muted-foreground">4405551196</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-400 font-semibold">Deal</div>
                </div>
                <div className="space-y-1">
                  {[
                    { dept: 'OPERATIONS', status: 'Closed Won', color: 'text-orange-400', bar: 'bg-orange-500/60' },
                    { dept: 'SALES', status: 'Active', color: 'text-emerald-400', bar: 'bg-emerald-500/60' },
                    { dept: 'HUMAN RESOURCES', status: 'Complete', color: 'text-blue-400', bar: 'bg-blue-500/60' },
                    { dept: 'FINANCE', status: 'Active', color: 'text-emerald-400', bar: 'bg-emerald-500/60' },
                  ].map((row) => (
                    <div key={row.dept}>
                      <div className={`h-px w-full ${row.bar} mb-2`} />
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-muted-foreground font-semibold tracking-wider">{row.dept}</span>
                        <span className={`text-xs font-semibold ${row.color}`}>{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hybrid View */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-headline text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TableProperties className="h-5 w-5 text-blue-400" />
                </div>
                Hybrid View
              </h3>
              <p className="text-muted-foreground mb-6">
                See everything all at once using our signature hybrid view — a living spreadsheet where every record, every department, and every status is visible together.
              </p>
              <div className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/20 transition-all duration-300 overflow-x-auto">
                <div className="min-w-[360px]">
                  <div className="grid grid-cols-5 gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider pb-2 border-b border-white/10">
                    <div>Records</div>
                    <div className="text-orange-400 text-center">Ops</div>
                    <div className="text-red-400 text-center">Sales</div>
                    <div className="text-blue-400 text-center">HR</div>
                    <div className="text-emerald-400 text-center">Finance</div>
                  </div>
                  {[
                    { name: 'Brian', ops: false, hr: false, fin: false },
                    { name: 'Eileen', ops: true, hr: false, fin: true },
                    { name: 'Ellie', ops: true, hr: true, fin: true },
                    { name: 'Gary', ops: false, hr: false, fin: false },
                    { name: 'Mariah', ops: false, hr: true, fin: false },
                    { name: 'Pete', ops: false, hr: false, fin: false },
                  ].map((row) => (
                    <div key={row.name} className="grid grid-cols-5 gap-2 py-2 border-b border-white/5 items-center last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">{row.name[0]}</div>
                        <span className="text-xs text-white">{row.name}</span>
                      </div>
                      <div className="flex justify-center">{row.ops ? <div className="w-2 h-2 rounded-full bg-orange-400" /> : <span className="text-muted-foreground text-xs">—</span>}</div>
                      <div className="flex justify-center"><div className="px-1.5 py-0.5 rounded text-xs bg-red-900/40 text-red-400 font-medium">Deal</div></div>
                      <div className="flex justify-center">{row.hr ? <div className="w-2 h-2 rounded-full bg-blue-400" /> : <span className="text-muted-foreground text-xs">—</span>}</div>
                      <div className="flex justify-center">{row.fin ? <div className="w-2 h-2 rounded-full bg-emerald-400" /> : <span className="text-muted-foreground text-xs">—</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* BASE sub-features */}
          <div className="grid md:grid-cols-3 gap-6">
            {baseFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.07)] transition-all duration-300"
              >
                <div className="p-3 bg-white/5 rounded-xl w-fit mb-4">{feat.icon}</div>
                <h4 className="font-headline font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Widget Marketplace ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/8 animate-glow-pulse top-1/2 left-[-100px] -translate-y-1/2" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">The Next Phase of Widgets</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">
              The Widget Marketplace
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Get what you need on the Widget Marketplace.{' '}
              <span className="text-white font-semibold">No, it does not cost extra.</span>
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {widgets.map((widget, index) => (
              <motion.div
                key={widget.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/8 transition-colors">
                    {widget.icon}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20">
                    Essentials
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-white mb-2">{widget.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{widget.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <h4 className="font-headline font-bold text-white mb-2">Essentials Collection</h4>
              <p className="text-muted-foreground text-sm">The pillars of running your business. Nicely packaged and ready right out of the box.</p>
            </div>
            <div className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-4">
              <div>
                <h4 className="font-headline font-bold text-white mb-2">Request a Widget</h4>
                <p className="text-muted-foreground text-sm">Our team loves building. Let's see what we can make to fit your needs.</p>
              </div>
              <Button asChild size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold w-fit">
                <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-3 w-3" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-cyan-500/15 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Let's Talk</p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
                The Most Fun 15 Minutes<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  You've Had in a While
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                There's so much to share about the new HTBase. Call or text David anytime to set up a feature video call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-300"
                >
                  <Link href="/contact">Schedule a Demo</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
                >
                  <Link href="https://drive.google.com/uc?export=download&id=1fhLWSh5Lyu4-Nx-pBEcAjD7AFVYKc6Qi" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Fact Sheet
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-500/20 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-500/40 shrink-0">
                  <Image src="/David TR photo.png" alt="David Zimmerman" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-white">David Zimmerman</h3>
                  <p className="text-sm text-cyan-400">Developer & Founder | HTBase</p>
                </div>
              </div>
              <div className="space-y-4">
                <a href="tel:4124445041" className="flex items-center gap-4 group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Call or text anytime</div>
                    <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">(412) 444-5041</div>
                  </div>
                </a>
                <a href="mailto:sales@huxleigh.com" className="flex items-center gap-4 group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email us</div>
                    <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">sales@huxleigh.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
