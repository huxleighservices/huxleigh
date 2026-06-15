
import {
  Users,
  Lightbulb,
  RefreshCw,
  Target,
  Eye,
  Rocket,
  Wrench,
  HeartHandshake,
} from 'lucide-react';

const values = [
  { icon: <Users className="h-10 w-10 text-primary" />, title: 'Community' },
  { icon: <Lightbulb className="h-10 w-10 text-primary" />, title: 'Creativity' },
  { icon: <RefreshCw className="h-10 w-10 text-primary" />, title: 'Change' },
];

const differentiators = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'AI-Assisted Idea Execution',
    description:
      'We create digital products for brands, stories, and ideas, elevating professional personality by executing concepts with the power of Artificial Intelligence.',
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    title: 'Service-Oriented Problem Solving',
    description:
      'Service is the root of all solutions. We are committed to an approach that involves deeply understanding each customer’s ideas, problems, and opportunities.',
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: 'Branded & White-Label Solutions',
    description:
      'We build, test, and shape software across different fronts to elevate ideas and businesses. We implement our own branded software and provide white-label solutions for customers looking to preserve their identities.',
  },
];

const team = [
  { name: 'David Zimmerman', role: 'Founder & President' },
  { name: 'Patrick McCollum', role: 'Director of Client Relations' },
  { name: 'Anthony Bogna', role: 'Director of Business Development' },
];

const partners = [
  { name: 'Ken Harris', role: 'Strategic Partner' },
  { name: 'Gabe Crozier', role: 'Software Specialist — Swishy Solutions LLC' },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-32 flex items-center justify-center text-center overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-cyan-500/15 animate-glow-pulse top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 container">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-4">Who We Are</p>
          <h1 className="font-headline text-4xl font-bold md:text-6xl text-white leading-tight">
            Powerful Resources<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              for Powerful Ideas
            </span>
          </h1>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold">MISSION</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              To create and implement powerful solutions for powerful ideas that align with our values.
            </p>
          </div>
          <div className="glass rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold">VISION</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              To change how businesses solve problems in the pursuit of furthering community, creativity, and/or change.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {values.map((value) => (
              <div key={value.title} className="glass rounded-2xl p-8 flex flex-col items-center hover:border-primary/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] transition-all duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Do Software */}
      <section className="relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/10 animate-glow-pulse top-1/2 right-0 -translate-y-1/2" />
        <div className="relative z-10">
          <div className="glass border-y border-white/10 py-8">
            <div className="container text-center">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                WE DO SOFTWARE.
              </h2>
            </div>
          </div>
          <div className="py-16 md:py-24">
            <div className="container space-y-12">
              {differentiators.map((item, i) => (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex justify-center md:justify-end">
                    <div className="p-4 bg-primary/10 rounded-full">
                      {item.icon}
                    </div>
                  </div>
                  <div className="md:col-span-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold font-headline text-foreground">{item.title}</h3>
                    <p className="mt-2 text-lg text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-blue-700/10 animate-glow-pulse bottom-0 left-1/4" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">The People</p>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="glass rounded-2xl p-6 text-center hover:border-white/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] transition-all duration-300">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Collaborators</p>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.name} className="glass rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] transition-all duration-300">
                <h3 className="text-xl font-bold">{partner.name}</h3>
                <p className="text-primary font-semibold mt-1">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
