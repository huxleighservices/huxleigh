
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
  ShieldCheck,
  Rocket,
  Puzzle,
  Settings2,
  Zap,
  CheckCircle2,
} from 'lucide-react';


const pillars = [
  {
    icon: <LayoutDashboard className="h-10 w-10 text-cyan-400" />,
    title: 'Organize',
    color: 'cyan',
    points: [
      'Fully custom widget dashboards per role',
      'Drag-and-drop layout builder',
      'Centralized data across all teams',
      'Smart filters and saved views',
    ],
  },
  {
    icon: <Users className="h-10 w-10 text-violet-400" />,
    title: 'Manage',
    color: 'violet',
    points: [
      'Real-time team performance tracking',
      'Task assignment and accountability',
      'AI-powered insight surfacing',
      'Cross-department visibility',
    ],
  },
  {
    icon: <Rocket className="h-10 w-10 text-blue-400" />,
    title: 'Implement',
    color: 'blue',
    points: [
      'White-label ready out of the box',
      'Onboarding in days, not months',
      'Seamless integration with existing tools',
      'Dedicated implementation support',
    ],
  },
];

const widgets = [
  {
    icon: <ListTodo className="h-6 w-6 text-cyan-400" />,
    name: 'Task Pipeline',
    desc: 'Kanban and list-view task boards with priority levels, due dates, and assignees — built for how your team actually works.',
  },
  {
    icon: <Users className="h-6 w-6 text-violet-400" />,
    name: 'Team Overview',
    desc: 'See every team member\'s status, active tasks, and recent activity in one glanceable widget.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    name: 'Performance Analytics',
    desc: 'Live KPI tracking, custom metric charts, and goal progress — no spreadsheets required.',
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-emerald-400" />,
    name: 'AI Smart Assistant',
    desc: 'An always-on AI layer that surfaces suggestions, flags bottlenecks, and answers questions about your own data.',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
    name: 'Deal & Pipeline Tracker',
    desc: 'Visualize your sales pipeline from prospect to close with stage-by-stage conversion tracking.',
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

const whyItems = [
  { icon: <Puzzle className="h-6 w-6 text-primary" />, text: 'Every widget is independently configurable — mix and match what your team needs.' },
  { icon: <Settings2 className="h-6 w-6 text-primary" />, text: 'Role-based dashboard templates so each user sees exactly what matters to them.' },
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: 'Enterprise-grade permissions ensure the right people see the right data.' },
  { icon: <Zap className="h-6 w-6 text-primary" />, text: 'AI runs quietly in the background, enriching data and flagging what needs attention.' },
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
            The Smart ERP Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
              How Teams Actually Work
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            HTBase replaces the chaos of disconnected tools with a single intelligent platform — fully customizable widget dashboards that let every team member see, manage, and act on exactly what they need.
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
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="py-24 border-y border-white/10 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 animate-glow-pulse top-0 left-0" />
        <div className="glow-orb w-[500px] h-[500px] bg-violet-700/10 animate-glow-pulse bottom-0 right-0" style={{ animationDelay: '2s' }} />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">The Core</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">
              Built on Three Pillars
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`glass rounded-2xl p-8 flex flex-col hover:border-${pillar.color}-500/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.07)] transition-all duration-400 group`}
              >
                <div className={`p-4 bg-${pillar.color}-500/10 rounded-2xl w-fit mb-6 group-hover:bg-${pillar.color}-500/15 transition-colors`}>
                  {pillar.icon}
                </div>
                <h3 className="font-headline text-2xl font-bold text-white mb-6">{pillar.title}</h3>
                <ul className="space-y-3 flex-1">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Widget Library ── */}
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
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Modular by Design</p>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">
              The Widget Library
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Pick the widgets your team needs. Place them where they make sense. HTBase handles the rest.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {widgets.map((widget, index) => (
              <motion.div
                key={widget.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 group"
              >
                <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/8 transition-colors">
                  {widget.icon}
                </div>
                <div>
                  <h4 className="font-headline font-bold text-white mb-2">{widget.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{widget.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why HTBase ── */}
      <section className="py-24 border-y border-white/10 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-blue-700/10 animate-glow-pulse top-1/2 right-0 -translate-y-1/2" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">The Difference</p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-6">
                An ERP That Fits You —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Not the Other Way Around
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Most ERPs force your team to adapt to rigid workflows. HTBase flips that model — giving your team a platform that bends to the way you actually operate, with AI quietly making everything smarter over time.
              </p>
              <ul className="space-y-5">
                {whyItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">{item.icon}</div>
                    <span className="text-muted-foreground leading-relaxed">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-500/20 transition-all duration-500"
            >
              <h3 className="font-headline text-xl font-bold text-white mb-6">Platform Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'White-Label Ready', sub: 'Full brand control' },
                  { label: 'Role-Based Views', sub: 'Right info, right person' },
                  { label: 'AI-Assisted', sub: 'Smart suggestions built-in' },
                  { label: 'Fast Onboarding', sub: 'Up in days, not months' },
                  { label: 'Custom Widgets', sub: 'Infinitely configurable' },
                  { label: 'Team-Scale', sub: 'From 5 to 500+' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-cyan-500/15 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Build Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Perfect Dashboard?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            As a white-label platform, HTBase can be fully customized to match your brand and workflow. Contact us to schedule a demo or download the quick fact sheet to share with your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
            <a href="mailto:sales@huxleigh.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              sales@huxleigh.com
            </a>
            <a href="tel:412-444-5041" className="flex items-center gap-3 hover:text-foreground transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              412-444-5041
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
