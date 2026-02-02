
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Users,
  MessageCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const productHighlights = [
  {
    logoSrc: 'https://delture.com/delture-logo-3.png',
    logoAlt: 'Delture Logo',
    description: 'The all-in-one AI-powered social media solution for student organizations.',
    href: '/marketing-products/delture',
    colorClass: 'hover:border-red-500/30 hover:shadow-red-500/10',
    buttonColorClass: 'bg-red-500 hover:bg-red-600 text-white',
    logoWidth: 140,
    logoHeight: 46
  },
  {
    logoSrc: 'https://stratavue.app/logo.png?v=2',
    logoAlt: 'Stratavue Logo',
    description: 'The premiere AI-assisted music marketing suite to orchestrate your success.',
    href: '/marketing-products/stratavue',
    colorClass: 'hover:border-violet-500/30 hover:shadow-violet-500/10',
    logoClassName: 'invert',
    buttonColorClass: 'bg-violet-600 hover:bg-violet-700 text-white',
    logoWidth: 140,
    logoHeight: 35
  },
  {
    logoSrc: 'https://preview.redd.it/mszt14me641g1.png?width=1080&crop=smart&auto=webp&s=767e946bd9165e98a8637eb5cb35ced596f2a4d5',
    logoAlt: 'HTBase Logo',
    description: 'AI-assisted sales training and onboarding software to elevate your team.',
    href: '/HTBase',
    colorClass: 'hover:border-cyan-500/30 hover:shadow-cyan-500/10',
    buttonColorClass: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    logoWidth: 140,
    logoHeight: 35
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
           <Image
              src="https://preview.redd.it/z9fhqu44z4hg1.png?width=1080&crop=smart&auto=webp&s=17d8afdcc43566a5f579bb8dd2ddf205f8ab4796"
              alt="Huxleigh AI Brain"
              width={200}
              height={200}
              className="mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              priority
            />
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
              Check us Out
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productHighlights.map((product) => (
              <Card
                key={product.href}
                className={cn("glassmorphism flex transform flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl", product.colorClass)}
              >
                <CardHeader className="items-center text-center">
                  <div className="h-20 flex items-center justify-center">
                     <Image
                        src={product.logoSrc}
                        alt={product.logoAlt}
                        width={product.logoWidth}
                        height={product.logoHeight}
                        className={cn("object-contain", (product as any).logoClassName)}
                      />
                  </div>
                   <CardDescription className="pt-4 h-24">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className={cn("w-full font-semibold", (product as any).buttonColorClass)}>
                    <Link href={product.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
