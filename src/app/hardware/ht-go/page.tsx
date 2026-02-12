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

export default function HtGoPage() {
  return (
    <div className="bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900 text-white">
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="bg-black/25 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="https://preview.redd.it/f16kfi6nmydg1.png?width=1080&crop=smart&auto=webp&s=bdfe55960a1fb027ab317408176e62c59dd0e3a6"
              alt="HT-Go Logo"
              width={300}
              height={75}
              priority
              className="drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]"
            />
            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-wide uppercase drop-shadow-lg">
              The Device that Knows
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container flex justify-center">
            <Image
              src="https://preview.redd.it/ht-go-flyer-v0-5yin7bvlh4jg1.png?width=1080&crop=smart&auto=webp&s=e93de15a43b15eadaf10a8136692b3f40699227c"
              alt="HT-Go Flyer"
              width={1080}
              height={1350}
              className="rounded-lg shadow-2xl max-w-full h-auto md:max-w-2xl"
            />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
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
                className="flex flex-col items-center text-center p-8 rounded-2xl shadow-2xl bg-black/25 backdrop-blur-lg border border-white/10"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold font-headline mb-3">
                  {feature.title}
                </h3>
                <p className="opacity-90 flex-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
