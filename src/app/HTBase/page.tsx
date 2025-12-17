
'use client';

import { useState } from 'react';
import { Rocket, BookOpen, Users, Phone, Mail, PhoneCall, MessagesSquare, FileQuestion, BrainCircuit, Cpu, Wrench, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const businessFeatures = [
  {
    icon: <PhoneCall className="h-10 w-10 text-white" />,
    title: 'Hyper-Realistic AI Simulations',
    description: 'Engage in dynamic cold call and messaging simulations with an AI that deeply understands your business, providing an unparalleled training experience.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-white" />,
    title: 'Custom-Built Asset Creation',
    description: 'We transform your unique operational needs into tangible software assets. Our team architects and develops bespoke solutions to turn any concept into reality.',
  },
  {
    icon: <FileQuestion className="h-10 w-10 text-white" />,
    title: 'Intelligent Knowledge Base',
    description: 'Instantly access product information, competitor analysis, and sales scripts with an AI that learns and organizes your company\'s data.',
  },
  {
    icon: <LifeBuoy className="h-10 w-10 text-white" />,
    title: 'Premium Service & Support',
    description: 'Our dedicated team provides expert guidance and hands-on support throughout the integration process and beyond, ensuring your continued success.',
  },
];

const educationFeatures = [
    {
      icon: <PhoneCall className="h-10 w-10 text-white" />,
      title: 'Real-World Sales Simulations',
      description: 'Students practice sales techniques in hyper-realistic scenarios, preparing them for careers with an AI that mirrors real-world client interactions.',
    },
    {
      icon: <Wrench className="h-10 w-10 text-white" />,
      title: 'Custom Curriculum Integration',
      description: 'We partner with educators to develop bespoke AI workflows and scenarios, seamlessly integrating custom assets directly into your course to enrich the learning experience.',
    },
    {
      icon: <FileQuestion className="h-10 w-10 text-white" />,
      title: 'Applied ERP Skill Development',
      description: 'Design and deploy custom scenarios and assessments that reinforce key sales concepts and track student competency with ERP best practices.',
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-white" />,
      title: 'Dedicated Institutional Support',
      description: 'Our specialists provide comprehensive support to faculty and staff, ensuring smooth implementation and ongoing success within your academic program.',
    },
]

export default function TrainerPage() {
  const [mode, setMode] = useState<'business' | 'education'>('business');

  return (
    <div className="bg-background text-foreground">
      <section className="border-b py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-400 to-blue-600 animate-gradient-move opacity-80 blur-3xl"></div>
        <div className="container flex flex-col items-center justify-center relative z-10">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border flex flex-col items-center">
            <Image
              src="https://preview.redd.it/htbase-gradients-v0-65kk0u62cu7g1.png?width=1080&crop=smart&auto=webp&s=5a43fb34ccdf7532874f95fe72354d8384668dcc"
              alt="HTBase Logo"
              width={400}
              height={100}
              priority
            />
            <p className="mt-4 max-w-3xl mx-auto text-lg text-white">
              The smartest, most AI-infused ERP for modern sales teams.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 border-b">
        <div className="container flex items-center justify-center gap-4">
          <Label htmlFor="mode-switch" className={`font-semibold text-lg ${mode === 'business' ? 'text-primary' : 'text-muted-foreground'}`}>
            For Business
          </Label>
          <Switch
            id="mode-switch"
            checked={mode === 'education'}
            onCheckedChange={(checked) => setMode(checked ? 'education' : 'business')}
            aria-label="Toggle between Business and Education mode"
          />
          <Label htmlFor="mode-switch" className={`font-semibold text-lg ${mode === 'education' ? 'text-primary' : 'text-muted-foreground'}`}>
            For Education
          </Label>
        </div>
      </section>

      {mode === 'business' ? (
        <>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">A Smarter Way to Sell</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our AI is designed to feel less like a program and more like a partner in your sales process.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {businessFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center p-8 rounded-lg shadow-lg bg-gradient-to-br from-turquoise-500 to-cyan-500 border border-white/20 text-white"
                  >
                    <div className="mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
                    <p className="opacity-90 flex-1">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 glassmorphism border-y">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <BrainCircuit className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">An ERP That Thinks, Not Just Stores</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Our AI deeply learns your products, processes, and customers, creating an intelligent ERP that actively helps you close deals. This purpose-built approach is designed to:
                  </p>
                  <ul className="mt-6 space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <Rocket className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Boost sales velocity</strong> with AI-driven insights and automation that accelerate your sales cycle.
                      </span>
                    </li>
                     <li className="flex items-start gap-3">
                       <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Amplify team productivity</strong> by automating administrative tasks and allowing your team to focus on selling.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Enhance decision-making</strong> with predictive analytics and actionable intelligence delivered right in your workflow.
                      </span>
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sales team collaborating"
                    fill
                    className="object-cover"
                    data-ai-hint="sales team"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Empower Your Team?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                As a white-label product, HTBase seamlessly integrates with your existing systems. Contact us today to schedule a demo and learn how our software can be customized for your organization.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4 text-lg">
                    <Mail className="h-6 w-6 text-primary" />
                    <a
                      href="mailto:sales@huxleigh.com"
                      className="hover:text-primary"
                    >
                      sales@huxleigh.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-lg">
                    <Phone className="h-6 w-6 text-primary" />
                    <a href="tel:412-444-5041" className="hover:text-primary">
                      412-444-5041
                    </a>
                  </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">A Smarter Way to Learn Sales</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our AI-infused ERP provides an immersive learning experience, bridging the gap between theory and modern sales practice.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {educationFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center p-8 rounded-lg shadow-lg bg-gradient-to-br from-turquoise-500 to-cyan-500 border border-white/20 text-white"
                  >
                    <div className="mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
                    <p className="opacity-90 flex-1">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 glassmorphism border-y">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <BrainCircuit className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Educate with an ERP, Not Just a Textbook</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Our AI deeply understands your curriculum, creating an intelligent and interactive learning environment within a true-to-life ERP. This experiential approach is designed to:
                  </p>
                  <ul className="mt-6 space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <Rocket className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Accelerate career readiness</strong> with hands-on modules that prepare students for the modern sales world.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                       <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Free up instructor time</strong> by automating repetitive exercises and providing students with an always-available practice environment.
                      </span>
                    </li>
                     <li className="flex items-start gap-3">
                      <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                      <span>
                        <strong>Deepen comprehension</strong> by enabling students to apply theoretical knowledge in a safe, simulated enterprise environment.
                      </span>
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Students collaborating in a classroom"
                    fill
                    className="object-cover"
                    data-ai-hint="students classroom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Enhance Your Curriculum?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                HTBase seamlessly integrates with your existing learning management systems. Contact us today to schedule a demo and learn how our software can be customized for your institution.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4 text-lg">
                    <Mail className="h-6 w-6 text-primary" />
                    <a
                      href="mailto:sales@huxleigh.com"
                      className="hover:text-primary"
                    >
                      sales@huxleigh.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-lg">
                    <Phone className="h-6 w-6 text-primary" />
                    <a href="tel:412-444-5041" className="hover:text-primary">
                      412-444-5041
                    </a>
                  </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
