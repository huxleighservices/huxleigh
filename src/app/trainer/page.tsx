
'use client';

import { Rocket, ShieldCheck, DollarSign, Phone, Mail, PhoneCall, MessagesSquare, FileQuestion, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const newFeatures = [
  {
    icon: <PhoneCall className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Cold Call Simulations',
    description: 'Practice your pitch and handle objections with a responsive AI that realistically simulates potential clients, providing a safe and effective training ground.',
  },
  {
    icon: <MessagesSquare className="h-10 w-10 text-primary" />,
    title: 'Dynamic Messaging Scenarios',
    description: 'Engage in realistic messaging simulations with AI-driven replies. Hone your communication skills across different platforms and client personas.',
  },
  {
    icon: <FileQuestion className="h-10 w-10 text-primary" />,
    title: 'Intuitive & Customizable Quizzes',
    description: 'Create and deploy fully customized quizzes to test knowledge and reinforce key training concepts. Track progress and identify areas for improvement.',
  },
]

export default function TrainerPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-400 to-blue-600 animate-gradient-move opacity-80 blur-3xl"></div>
        <div className="container flex flex-col items-center justify-center relative z-10">
          <div className="glassmorphism p-8 md:p-12 rounded-2xl border flex flex-col items-center">
            <Image
              src="https://preview.redd.it/mszt14me641g1.png?width=1080&crop=smart&auto=webp&s=767e946bd9165e98a8637eb5cb35ced596f2a4d5"
              alt="HTBase Logo"
              width={400}
              height={100}
              priority
              className="drop-shadow-lg"
            />
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              The ultimate tool to onboard, train, and elevate your sales team with the power of AI.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">A Smarter Way to Train</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI is designed to feel less like a program and more like a partner.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {newFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 glassmorphism rounded-lg shadow-lg border"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
                <p className="text-muted-foreground flex-1">{feature.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Train an AI, Not Just an Employee</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our AI deeply learns your company's products and services, creating a highly intelligent training partner. This purpose-built approach is designed to:
              </p>
              <ul className="mt-6 space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                  <span>
                    <strong>Cut significant costs</strong> by reducing the need for extensive one-on-one coaching and role-play sessions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                   <ShieldCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                  <span>
                    <strong>Minimize extra labor</strong> by providing a consistent, always-on training resource for your sales and service teams.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                  <span>
                    <strong>Slash training time</strong> with accelerated, adaptive learning paths that get your team ready faster than ever before.
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
    </div>
  );
}
