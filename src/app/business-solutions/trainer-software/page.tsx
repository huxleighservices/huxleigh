
import { Screenshots } from './Screenshots';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, DollarSign } from 'lucide-react';
import Link from 'next/link';

const whitelabelBenefits = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Accelerated Onboarding',
    description: 'Get your sales team up to speed faster with a training tool that carries your brand, ensuring a cohesive and trusted learning environment from day one.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Reinforce Company Culture',
    description: 'A training platform that looks and feels like your own reinforces your company’s methods and values, boosting team morale and alignment.',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: 'Drive Sales Performance',
    description: 'Empower your team with consistent, high-quality training under a familiar brand, leading to increased confidence, better performance, and more closed deals.',
  },
];


export default function TrainerSoftwarePage() {
  return (
    <>
      <div className="container py-24 text-center">
        <div className="flex justify-center items-center gap-4 mb-8">
          <video
            src="https://packaged-media.redd.it/bthbsvrugwsf1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1759957200&s=1052bb59674b9d574eadc5cd647b345e7547ac6e"
            autoPlay
            loop
            muted
            playsInline
            className="h-24 w-24 mix-blend-screen"
          ></video>
          <h1 className="text-8xl font-bold font-headline">Huxleigh Trainer</h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We're changing the game when it comes to training your employees. AI
          gets it done quicker, better, and more streamlined than the world has
          ever seen. See for yourself.
        </p>
      </div>
      <Screenshots />

      <section id="partner" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Make It Your Own
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Take our powerful, ready-made AI training solution and integrate it seamlessly under your brand. We handle the technology, you grow your business and impress your clients.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whitelabelBenefits.map((benefit) => (
              <Card key={benefit.title} className="text-center bg-card">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Quote</Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
}
