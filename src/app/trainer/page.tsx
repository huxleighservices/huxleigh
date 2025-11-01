
'use client';

import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, DollarSign, ToyBrick, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Accelerated Onboarding',
    description: 'Get your sales team up to speed faster with a training tool that carries your brand, ensuring a cohesive and trusted learning environment from day one.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Reinforce Company Culture',
    description: 'A training platform that looks and feels like your own reinforces your company\'s methods and values, boosting team morale and alignment.',
  },
  {
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    title: 'Drive Sales Performance',
    description: 'Empower your team with consistent, high-quality training under a familiar brand, leading to increased confidence, better performance, and more closed deals.',
  },
  {
    icon: <ToyBrick className="h-10 w-10 text-primary" />,
    title: 'Easy to Use',
    description: 'An intuitive interface and guided simulations mean less time training on the tool and more time training on what matters: selling.',
  },
];

export default function TrainerPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="bg-card py-16 md:py-24 text-center">
        <div className="container flex flex-col items-center">
          <Image
            src="https://i.redd.it/7sqws0etxnyf1.png"
            alt="Trainer Logo"
            width={500}
            height={100}
            className="h-auto mb-4"
            priority
          />
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            The ultimate tool to onboard, train, and elevate your sales team with the power of AI.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Empower Your Team?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Contact us today to schedule a demo and learn how Huxleigh Trainer can be customized for your organization.
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
