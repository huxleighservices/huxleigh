
import Image from 'next/image';
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
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Community',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Creativity',
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: 'Change',
  },
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
    {
        name: 'David Zimmerman',
        role: 'Founder & President',
    },
    {
        name: 'Patrick McCollum',
        role: 'Director of Client Relations',
    },
    {
        name: 'Austin Perry',
        role: 'Account Manager',
    }
];

const partners = [
    {
        name: 'Ken Harris',
        role: 'Liaison -- Stratavue',
    },
    {
        name: 'Gabe Crozier',
        role: 'Software Specialist -- Swishy Solutions LLC',
    }
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1622542390045-e812a83e59d1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNvbXB1dGVyJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Person working on a computer"
          fill
          className="object-cover"
          data-ai-hint="computer work"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container">
          <h1 className="font-headline text-4xl font-bold md:text-6xl text-white">
            Huxleigh Provides Powerful Resources for Powerful Ideas
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12">
          <div className="p-8 rounded-lg border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold">MISSION</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              To create and implement powerful solutions for powerful ideas
              that align with our values.
            </p>
          </div>
          <div className="p-8 rounded-lg border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold">VISION</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              To change how businesses solve problems in the pursuit of
              furthering community, creativity, and/or change.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-accent/80 py-8">
          <div className="container text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent-foreground">
              WE DO SOFTWARE.
            </h2>
          </div>
        </div>
        <div className="py-16 md:py-24">
          <div className="container space-y-12">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
              >
                <div className="flex justify-center md:justify-end">
                  <div className="p-4 bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold font-headline text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30 border-y">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-lg text-center border">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partners.map((partner) => (
                <div key={partner.name} className="p-6 rounded-lg text-center border">
                    <h3 className="text-xl font-bold">{partner.name}</h3>
                    <p className="text-primary font-semibold">{partner.role}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
