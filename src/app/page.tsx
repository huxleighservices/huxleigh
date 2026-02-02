
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Award,
  Users,
  MessageCircle,
  Newspaper,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const serviceHighlights = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'AI-Grounded Marketing Products',
    description:
      'Leverage our AI-powered marketing products to create data-driven strategies and deliver exceptional results that boost your bottom line.',
    href: '/marketing-products/delture',
  },
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: 'Company News',
    description:
      'Stay up-to-date with our latest advancements, partnerships, and company milestones.',
    href: '/company/news',
  },
];

const companyPillars = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Innovation',
    description:
      'We are committed to pushing the boundaries of AI and delivering cutting-edge solutions.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Partnership',
    description:
      'We work collaboratively with our clients to ensure their success is our success.',
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: 'Support',
    description:
      'Our dedicated team provides unparalleled support to guide you every step of the way.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-sky-800/70"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <div className="p-8 rounded-lg glassmorphism">
            <h1 className="font-headline text-4xl font-black tracking-tight uppercase md:text-6xl lg:text-7xl">
              Powerful AI Software <br /> for Powerful People
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-lg text-white/80">
              Huxleigh is an AI-first software conglomerate that offers B2C software applications and custom CRM solutions for businesses.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-foreground">
              Transforming Industries with Intelligent Technology
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide the tools and expertise to unlock the power of AI for
              your organization.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {serviceHighlights.map((service) => (
              <Card
                key={service.title}
                className="glassmorphism flex transform flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/10 hover:shadow-2xl hover:border-primary/30"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3 w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="pt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" asChild className="p-0 font-semibold">
                    <Link href={service.href}>
                      Learn More <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Your Strategic Partner in AI Innovation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At Huxleigh, we believe in building more than just software.
                We build partnerships that foster growth and drive success.
              </p>
              <div className="mt-8 space-y-6">
                {companyPillars.map((pillar) => (
                  <div key={pillar.title} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{pillar.title}</h3>
                      <p className="mt-1 text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg md:h-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1616333827064-52d363cf4bea?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI partnership"
                fill
                className="object-cover"
                data-ai-hint="teamwork collaboration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
