
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BrainCircuit, Combine, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-red-400" />,
    title: 'AI-Enabled Smart Assistant',
    description:
      'The smartest, most AI-enabled smart assistant designed specifically for professionals on-the-go.',
  },
  {
    icon: <Combine className="h-10 w-10 text-red-400" />,
    title: 'Software & Hardware Synergy',
    description:
      'Leverages our powerful HTBase software through a sleek smartphone hardware extension for a seamless experience.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-red-400" />,
    title: 'Built for Mobility',
    description:
      'A compact and powerful device that knows what you need, when you need it, wherever your job takes you.',
  },
];

export default function ProjectGoPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4">
        <div className="glow-orb w-[600px] h-[600px] bg-red-600/20 animate-glow-pulse top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-violet-800/15 animate-glow-pulse bottom-0 right-0" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 glass rounded-3xl p-10 md:p-16 border border-white/10 hover:border-red-500/30 transition-all duration-500 shadow-[0_0_80px_rgba(239,68,68,0.05)] max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <div className="animate-float">
              <Image
                src="https://preview.redd.it/f16kfi6nmydg1.png?width=1080&crop=smart&auto=webp&s=bdfe55960a1fb027ab317408176e62c59dd0e3a6"
                alt="Project Go Logo"
                width={300}
                height={75}
                priority
                className="drop-shadow-[0_5px_30px_rgba(239,68,68,0.3)]"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-wide uppercase text-white drop-shadow-lg">
              The Device that Knows
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Portable AI built for professionals who never stop moving.
            </p>
          </div>
        </div>
      </section>

      {/* Flyer */}
      <section className="py-16 relative overflow-hidden">
        <div className="glow-orb w-[300px] h-[300px] bg-red-600/10 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative z-10 flex justify-center">
          <Image
            src="https://preview.redd.it/ht-go-flyer-v0-5yin7bvlh4jg1.png?width=1080&crop=smart&auto=webp&s=e93de15a43b15eadaf10a8136692b3f40699227c"
            alt="Project Go Flyer"
            width={1080}
            height={1350}
            className="rounded-2xl shadow-[0_0_80px_rgba(239,68,68,0.1)] border border-white/10 max-w-full h-auto md:max-w-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-violet-700/10 animate-glow-pulse bottom-0 left-0" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold uppercase tracking-widest text-red-400 animate-pulse font-headline">
              Coming Soon
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 flex flex-col items-center text-center hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.08)] transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-red-500/10 rounded-full">{feature.icon}</div>
                <h3 className="text-2xl font-bold font-headline mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground flex-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
