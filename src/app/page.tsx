
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Share2,
  TrendingUp,
  Award,
  Users,
  MessageCircle,
  Newspaper,
  Rocket,
  ShieldCheck,
  DollarSign,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { blogPosts, successStories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[80vh] min-h-[600px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="People working together in a modern office"
            fill
            className="object-cover"
            data-ai-hint="collaboration office"
            priority
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="relative">
            <div className="circuit-board-animation" />
            <h1 className="font-headline text-4xl font-black tracking-tight uppercase md:text-6xl lg:text-7xl">
              Powerful AI Software for Powerful People
            </h1>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-bold animated-glow">
              <Link href="/marketing-products/delture">Explore Marketing Products</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/about">Our Vision</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
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
                className="flex transform flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3">
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

      <section className="bg-card py-16 md:py-24">
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
                    <div className="mt-1">{pillar.icon}</div>
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
            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg md:h-[450px]">
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
